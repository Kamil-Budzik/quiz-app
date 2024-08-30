<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  answeredQuestions: number
  totalQuestions: number
}
const props = defineProps<Props>()

const progressPercentage = computed(() => {
  return Math.round((props.answeredQuestions / props.totalQuestions) * 100)
})
</script>
<template>
  <div class="relative w-full h-2 bg-gray-300 rounded-full mb-6">
    <div
      class="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-300"
      :style="{ width: `${progressPercentage}%` }"
    ></div>
  </div>
</template>
