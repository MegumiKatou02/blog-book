<template>
  <article class="card-blog animate-fade-in-up">
    <div class="flex items-start justify-between mb-5">
      <div class="flex-1">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-1">
              <h2 class="text-xl font-bold text-stone-900 line-clamp-2">
                {{ post.title }}
              </h2>
              <div v-if="post.pinned" class="flex-shrink-0 p-1 bg-amber-100 rounded-full" title="Bài viết ghim">
                <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z"/>
                </svg>
              </div>
            </div>
            <div class="flex items-center space-x-3 text-meta">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V13a2 2 0 012-2z"/>
                </svg>
                <time :datetime="post.date.toISOString()">
                  {{ formatDate(post.date) }}
                </time>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ post.readTime }} phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="flex-1 mb-6">
      <div v-html="post.content" class="prose prose-stone max-w-none"></div>
    </div> -->

    <div class="flex items-center justify-between pt-4 border-t border-stone-100">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
        <span 
          v-if="post.tags.length > 3"
          class="text-xs text-stone-400 font-medium"
        >
          +{{ post.tags.length - 3 }} thêm
        </span>
      </div>
      
      <router-link
        :to="{ name: 'post', params: { slug: post.slug } }"
        class="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors duration-200"
      >
        <span class="mr-2">Đọc tiếp</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/composables/useBlog'
import { useBlog } from '@/composables/useBlog'

interface Props {
  post: BlogPost
}

defineProps<Props>()

const { formatDate } = useBlog()
</script>

<style scoped>
.card-blog {
  position: relative;
  overflow: hidden;
}

.card-blog::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #7c3aed, #f59e0b);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-blog:hover::before {
  opacity: 1;
}
</style> 