<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-200 text-black p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <RouterView />
    </div>
  </main>
</template>
