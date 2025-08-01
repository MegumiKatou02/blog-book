<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlog } from '@/composables/useBlog'
import BlogCard from '@/components/BlogCard.vue'

const { posts, loading, error, allTags, fetchPosts } = useBlog()

const selectedTag = ref('')
const searchQuery = ref('')
const dateFilter = ref('')
const dateFilterType = ref('exact') // 'exact', 'month', 'year'

const filteredPosts = computed(() => {
  let filtered = posts.value

  // Filter by tag
  if (selectedTag.value) {
    filtered = filtered.filter((post) => post.tags.includes(selectedTag.value))
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Filter by date
  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value)

    filtered = filtered.filter((post) => {
      const postDate = post.date

      switch (dateFilterType.value) {
        case 'exact':
          return (
            postDate.getDate() === filterDate.getDate() &&
            postDate.getMonth() === filterDate.getMonth() &&
            postDate.getFullYear() === filterDate.getFullYear()
          )
        case 'month':
          return (
            postDate.getMonth() === filterDate.getMonth() &&
            postDate.getFullYear() === filterDate.getFullYear()
          )
        case 'year':
          return postDate.getFullYear() === filterDate.getFullYear()
        default:
          return true
      }
    })
  }

  return filtered
})

const clearFilters = () => {
  selectedTag.value = ''
  searchQuery.value = ''
  dateFilter.value = ''
  dateFilterType.value = 'exact'
}

const availableYears = computed(() => {
  const years = new Set<number>()
  posts.value.forEach((post) => {
    years.add(post.date.getFullYear())
  })
  return Array.from(years).sort((a, b) => b - a)
})

const getFilterDescription = () => {
  if (!dateFilter.value) return ''

  const filterDate = new Date(dateFilter.value)
  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ]

  switch (dateFilterType.value) {
    case 'exact':
      return `ngày ${filterDate.getDate()}/${filterDate.getMonth() + 1}/${filterDate.getFullYear()}`
    case 'month':
      return `${monthNames[filterDate.getMonth()]} ${filterDate.getFullYear()}`
    case 'year':
      return `năm ${filterDate.getFullYear()}`
    default:
      return ''
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-16 lg:py-24">
      <!-- Background decorations -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-64 h-64 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div
          class="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/6 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="animate-fade-in-up">
            <h1 class="heading-display mb-6">Blog Book</h1>
            <p class="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed italic">
              "もしかしたら、この場所にいれば、少しは鬱っぽさが和らぐかもしれない。"
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-6 animate-fade-in-up">
            <div class="glass px-6 py-4 rounded-xl">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <div class="text-xl font-bold text-stone-800">{{ posts.length }}</div>
                  <div class="text-sm text-stone-500 font-medium">Ghi chú</div>
                </div>
              </div>
            </div>

            <div class="glass px-6 py-4 rounded-xl">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center"
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
                <div class="text-left">
                  <div class="text-xl font-bold text-stone-800">{{ allTags.length }}</div>
                  <div class="text-sm text-stone-500 font-medium">Danh mục</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-stone-600">Đang mở nhật ký...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-stone-900 mb-2">Có lỗi xảy ra</h3>
        <p class="text-stone-600 mb-6">{{ error }}</p>
        <button @click="fetchPosts" class="btn-primary">Thử lại</button>
      </div>

      <!-- Posts Section -->
      <div v-else-if="posts.length > 0">
        <!-- Filter Section -->
        <div class="flex flex-col lg:items-left justify-between mb-10 gap-6">
          <div class="animate-fade-in-up">
            <h2 class="heading-section mb-2">Những ghi chú gần đây</h2>
            <p class="text-stone-600">
              {{ filteredPosts.length }} ghi chú
              <span v-if="selectedTag" class="text-amber-700 font-medium">
                trong "{{ selectedTag }}"
              </span>
              <span v-if="dateFilter" class="text-amber-700 font-medium">
                {{ selectedTag ? 'và' : 'trong' }} {{ getFilterDescription() }}
              </span>
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 animate-fade-in-up">
            <!-- Tag Filter -->
            <div class="relative">
              <select v-model="selectedTag" class="form-select min-w-[140px]">
                <option value="">Tất cả danh mục</option>
                <option v-for="tag in allTags" :key="tag" :value="tag">
                  {{ tag }}
                </option>
              </select>
            </div>

            <!-- Date Filter Type -->
            <div class="relative">
              <select v-model="dateFilterType" class="form-select min-w-[120px]">
                <option value="exact">Ngày cụ thể</option>
                <option value="month">Theo tháng</option>
                <option value="year">Theo năm</option>
              </select>
            </div>

            <!-- Date Filter -->
            <div class="relative">
              <input
                v-model="dateFilter"
                :type="
                  dateFilterType === 'year'
                    ? 'number'
                    : dateFilterType === 'month'
                      ? 'month'
                      : 'date'
                "
                :min="dateFilterType === 'year' ? Math.min(...availableYears) : undefined"
                :max="dateFilterType === 'year' ? Math.max(...availableYears) : undefined"
                class="form-input min-w-[140px]"
                :placeholder="
                  dateFilterType === 'exact'
                    ? 'Chọn ngày...'
                    : dateFilterType === 'month'
                      ? 'Chọn tháng...'
                      : 'Chọn năm...'
                "
              />
            </div>

            <!-- Search -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm trong ghi chú..."
                class="form-input min-w-[180px] pl-10"
              />
              <svg
                class="w-4 h-4 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Clear Filters Button -->
            <button
              v-if="selectedTag || searchQuery || dateFilter"
              @click="clearFilters"
              title="Xóa tất cả bộ lọc"
            >
              <svg
                class="w-[24px] h-[24px] mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Date Filters -->
        <div class="mb-8 animate-fade-in-up">
          <div class="flex flex-wrap gap-2">
            <span class="text-sm text-stone-500 font-medium mr-2">Lọc nhanh:</span>
            <button
              v-for="year in availableYears.slice(0, 5)"
              :key="year"
              @click="
                () => {
                  dateFilter = year.toString()
                  dateFilterType = 'year'
                }
              "
              class="px-3 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
            >
              {{ year }}
            </button>
            <button
              @click="
                () => {
                  dateFilter = new Date().toISOString().split('T')[0].slice(0, 7)
                  dateFilterType = 'month'
                }
              "
              class="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition-colors"
            >
              Tháng này
            </button>
            <button
              @click="
                () => {
                  dateFilter = new Date().getFullYear().toString()
                  dateFilterType = 'year'
                }
              "
              class="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition-colors"
            >
              Năm nay
            </button>
          </div>
        </div>

        <!-- Posts Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            class="animate-fade-in-up"
          />
        </div>

        <!-- No results -->
        <div v-if="filteredPosts.length === 0" class="text-center py-20">
          <div
            class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-stone-900 mb-2">Không tìm thấy ghi chú nào</h3>
          <p class="text-stone-600 mb-6">Thử thay đổi từ khóa tìm kiếm, danh mục hoặc ngày tháng</p>
          <button @click="clearFilters" class="btn-secondary">Xoá bộ lọc</button>
        </div>
      </div>

      <!-- Empty State -->
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-stone-900 mb-2">Nhật ký trống</h3>
        <p class="text-stone-600 italic">Chưa có ghi chú nào được viết...</p>
      </div>
    </main>
  </div>
</template>
