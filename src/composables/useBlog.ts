/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: Date
  tags: string[]
  slug: string
  readTime: number
  pinned?: boolean
  postNumber?: number
}

export interface BlogMeta {
  title: string
  tags: string[]
  date?: string
  layout?: string
  pinned?: boolean
}

marked.setOptions({
  breaks: true,
  gfm: true,
})

const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content }
  }

  const [, frontmatter, body] = match
  const data: any = {}

  const lines = frontmatter.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) continue

    const key = trimmed.substring(0, colonIndex).trim()
    const value: any = trimmed.substring(colonIndex + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item: string) => item.trim().replace(/['"]/g, ''))
        .filter((item: string) => item.length > 0)
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }

  return { data, content: body }
}

export function useBlog() {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const createExcerpt = (content: string, maxLength = 150): string => {
    const plainText = content.replace(/[#*`\[\]]/g, '').trim()
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength).trim() + '...'
  }

  const parseFilename = (filename: string) => {
    const match = filename.match(/(\d{2})-(\d{2})-(\d{4})-(\d+)-(.+)\.md$/)
    if (!match) return null

    const [, day, month, year, postNumber, slug] = match
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

    return { date, slug, postNumber: parseInt(postNumber) }
  }

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const filenames: string[] = await fetch(`${import.meta.env.BASE_URL}posts/index.json`).then(
        (res) => res.json(),
      )

      const fetchedPosts: BlogPost[] = []

      for (const filename of filenames) {
        try {
          const response = await fetch(`${import.meta.env.BASE_URL}posts/${filename}`)
          if (!response.ok) {
            console.warn(`Failed to fetch ${filename}: ${response.status}`)
            continue
          }

          const rawContent = await response.text()
          const { data, content } = parseFrontmatter(rawContent)
          const meta = data as BlogMeta

          const parsed = parseFilename(filename)
          if (!parsed) {
            console.warn(`Failed to parse filename: ${filename}`)
            continue
          }

          const htmlContent = await marked(content)
          const excerpt = createExcerpt(content)
          const readTime = calculateReadTime(content)

          fetchedPosts.push({
            id: filename.replace('.md', ''),
            title: meta.title || 'Untitled',
            content: htmlContent,
            excerpt,
            date: parsed.date,
            tags: meta.tags || [],
            slug: parsed.slug,
            readTime,
            pinned: meta.pinned || false,
            postNumber: parsed.postNumber,
          })
        } catch (err) {
          console.error(`Error processing ${filename}:`, err)
        }
      }

      posts.value = fetchedPosts.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1

        const dateCompare = b.date.getTime() - a.date.getTime()
        if (dateCompare !== 0) return dateCompare

        if (a.postNumber === undefined && b.postNumber === undefined) return 0
        if (a.postNumber === undefined) return 1
        if (b.postNumber === undefined) return -1
        return b.postNumber - a.postNumber
      })

      console.log(`Successfully loaded ${posts.value.length} posts`)
    } catch (err) {
      error.value = 'Không thể tải bài viết'
      console.error('Error fetching posts:', err)
    } finally {
      loading.value = false
    }
  }

  const getPostBySlug = (slug: string, postNumber: string) => {
    return posts.value.find(
      (post) => post.slug === slug && Number.parseInt(postNumber) === post.postNumber,
    )
  }

  const getPostsByTag = (tag: string) => {
    return posts.value.filter((post) => post.tags.includes(tag))
  }

  const allTags = computed(() => {
    const tags = new Set<string>()
    posts.value.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: vi })
  }

  const formatDateRelative = (date: Date) => {
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hôm nay'
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`
    return `${Math.floor(diffDays / 365)} năm trước`
  }

  return {
    posts,
    loading,
    error,
    allTags,
    fetchPosts,
    getPostBySlug,
    getPostsByTag,
    formatDate,
    formatDateRelative,
  }
}
