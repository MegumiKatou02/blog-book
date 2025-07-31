<template>
  <div class="min-h-screen">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-stone-600">Đang mở trang nhật ký...</p>
      </div>
    </div>

    <div v-else-if="!post" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-stone-900 mb-2">Không tìm thấy ghi chú</h1>
        <p class="text-stone-600 mb-6">Trang nhật ký này không tồn tại hoặc đã bị xóa</p>
        <router-link to="/" class="btn-primary"> Quay về trang chính </router-link>
      </div>
    </div>

    <article v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <router-link
          to="/"
          class="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại
        </router-link>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
          {{ post.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-6">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V13a2 2 0 012-2z"
              />
            </svg>
            <time :datetime="post.date.toISOString()">
              {{ formatDate(post.date) }}
            </time>
          </div>

          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ post.readTime }} phút đọc</span>
          </div>

          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>{{ formatDateRelative(post.date) }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="card-blog mb-8">
        <div class="prose prose-lg max-w-none" v-html="post.content"></div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '@/composables/useBlog'

const route = useRoute()
const { posts, loading, fetchPosts, getPostBySlug, formatDate, formatDateRelative } = useBlog()

const post = computed(() => {
  if (!route.params.slug || posts.value.length === 0) return null
  return getPostBySlug(route.params.slug as string, route.query.pn as string)
})

watch(
  () => route.params.slug,
  () => {
    if (posts.value.length === 0) {
      fetchPosts()
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (posts.value.length === 0) {
    fetchPosts()
  }
})
</script>

<style scoped>
.prose {
  @apply leading-relaxed;
  color: var(--color-text-light);
  font-size: 1.1rem;
  font-family: 'Lora', serif;
}

.prose h1 {
  @apply text-3xl font-bold mt-8 mb-4;
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
}

.prose h2 {
  @apply text-2xl font-bold mt-6 mb-3;
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
}

.prose h3 {
  @apply text-xl font-bold mt-5 mb-2;
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
}

.prose h4 {
  @apply text-lg font-semibold mt-4 mb-2;
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
}

.prose p {
  @apply mb-4;
  line-height: 1.8;
}

.prose ul {
  @apply list-disc list-inside mb-4 space-y-1;
}

.prose ol {
  @apply list-decimal list-inside mb-4 space-y-1;
}

.prose blockquote {
  @apply border-l-4 pl-4 italic my-4;
  border-color: var(--color-accent);
  background: rgba(212, 165, 116, 0.05);
}

.prose code {
  @apply px-2 py-1 rounded text-sm font-mono;
  background: rgba(139, 90, 43, 0.1);
  color: var(--color-primary);
}

.prose pre {
  @apply p-4 rounded-lg overflow-x-auto mb-4;
  background: var(--color-text);
  color: var(--color-background);
}

.prose pre code {
  @apply bg-transparent p-0;
  color: var(--color-background);
}

.prose a {
  color: var(--color-primary);
  @apply underline transition-colors;
}

.prose a:hover {
  color: var(--color-secondary);
}

.prose img {
  @apply max-w-full h-auto rounded-lg shadow-sm;
}

.prose table {
  @apply w-full border-collapse mb-4;
  border: 1px solid var(--color-border);
}

.prose th,
.prose td {
  @apply px-4 py-2;
  border: 1px solid var(--color-border);
}

.prose th {
  background: var(--color-background);
  @apply font-semibold;
  color: var(--color-text);
}
</style>
