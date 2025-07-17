<template>
  <header class="sticky top-0 z-50 glass border-b border-stone-200/60">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="group flex items-center space-x-3">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </div>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                Blog Book
              </h1>
              <p class="text-xs text-stone-500 -mt-1 italic">
                Khong co gi ca
              </p>
            </div>
          </router-link>
        </div>

        <nav class="hidden md:flex items-center space-x-1">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'active': $route.name === 'home' }"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Trang chính
          </router-link>
          <router-link
            to="/tags"
            class="nav-link"
            :class="{ 'active': $route.name === 'tags' }"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            Danh mục
          </router-link>
          <router-link
            to="/about"
            class="nav-link"
            :class="{ 'active': $route.name === 'about' }"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Giới thiệu
          </router-link>
        </nav>

        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-stone-200/60 py-3 space-y-1"
      >
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
          :class="{ 'bg-amber-50 text-amber-700': $route.name === 'home' }"
        >
          <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Trang chính
        </router-link>
        <router-link
          to="/tags"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
          :class="{ 'bg-amber-50 text-amber-700': $route.name === 'tags' }"
        >
          <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          Danh mục
        </router-link>
        <router-link
          to="/about"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
          :class="{ 'bg-amber-50 text-amber-700': $route.name === 'about' }"
        >
          <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          Giới thiệu
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script> 