<script setup lang="ts">
import { RouterView } from 'vue-router'
import BlogHeader from '@/components/BlogHeader.vue'
</script>

<template>
  <div id="app">
    <BlogHeader />
    <RouterView />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
