<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="heading-display mb-4">Danh Mục Ghi Chú</h1>
        <p class="text-lg text-stone-600 max-w-2xl mx-auto italic">
          "やがてあなたは忘れてしまうでしょう。"
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-stone-600">Đang tải danh mục...</p>
      </div>

      <div v-else-if="allTags.length > 0">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="tag in allTags"
            :key="tag"
            class="card-blog cursor-pointer"
            @click="toggleTag(tag)"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-stone-900">{{ tag }}</h3>
                  <p class="text-sm text-stone-500">{{ getPostsByTag(tag).length }} ghi chú</p>
                </div>
              </div>
              <svg
                class="w-5 h-5 text-stone-400 transform transition-transform duration-200"
                :class="{ 'rotate-180': expandedTags.includes(tag) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div v-if="expandedTags.includes(tag)" class="space-y-3 animate-fade-in-up">
              <div
                v-for="post in getPostsByTag(tag)"
                :key="post.id"
                class="flex items-start space-x-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <div class="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <router-link
                    :to="{
                      name: 'post',
                      params: { slug: post.slug },
                      query: { pn: post.postNumber ?? 1 },
                    }"
                    class="block hover:text-amber-700 transition-colors"
                  >
                    <h4 class="font-medium text-stone-900 line-clamp-1 mb-1">{{ post.title }}</h4>
                    <p class="text-xs text-stone-500">{{ formatDate(post.date) }}</p>
                  </router-link>
                </div>
              </div>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="post in getPostsByTag(tag).slice(0, 3)"
                :key="post.id"
                class="flex items-center space-x-3"
              >
                <div class="w-2 h-2 bg-amber-600 rounded-full"></div>
                <router-link
                  :to="{ name: 'post', params: { slug: post.slug } }"
                  class="text-sm text-stone-600 hover:text-amber-700 transition-colors line-clamp-1"
                >
                  {{ post.title }}
                </router-link>
              </div>
              <div v-if="getPostsByTag(tag).length > 3" class="text-xs text-stone-400 pl-5">
                +{{ getPostsByTag(tag).length - 3 }} ghi chú khác
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <div
          class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-stone-900 mb-2">Chưa có danh mục nào</h3>
        <p class="text-stone-600 italic">Các danh mục sẽ xuất hiện khi có ghi chú được tạo</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlog } from '@/composables/useBlog'

const { posts, loading, allTags, fetchPosts, getPostsByTag, formatDate } = useBlog()
const expandedTags = ref<string[]>([])

const toggleTag = (tag: string) => {
  const index = expandedTags.value.indexOf(tag)
  if (index > -1) {
    expandedTags.value.splice(index, 1)
  } else {
    expandedTags.value.push(tag)
  }
}

onMounted(() => {
  if (posts.value.length === 0) {
    fetchPosts()
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
