<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'

const quiz = useQuizStore()
const scrollContainer = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -100, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 100, behavior: 'smooth' })
  }
}

const isAnswered = (index: number) => {
  return quiz.selectedAnswers.some((answer) => answer.questionIndex === index)
}

watch(
  () => quiz.currentQuestionIndex,
  () => {
    if (scrollContainer.value) {
      const button = scrollContainer.value.children[quiz.currentQuestionIndex] as HTMLElement
      button.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
)

const getButtonClasses = (index: number) => {
  if (index === quiz.currentQuestionIndex) {
    return 'bg-primary text-white'
  } else if (isAnswered(index)) {
    return 'bg-green-600 text-white'
  } else {
    return 'bg-gray-300 text-gray-700'
  }
}
</script>

<template>
  <div class="relative w-full overflow-hidden py-2 flex items-center justify-center">
    <div
      class="flex space-x-2 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-8 w-11/12 justify-center"
      ref="scrollContainer"
    >
      <button
        v-for="(item, index) in quiz.questions"
        :key="index"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full shrink-0',
          getButtonClasses(index)
        ]"
        @click="quiz.setCurrentQuestion(index)"
      >
        {{ index + 1 }}
      </button>
    </div>
    <!-- Arrows for navigation -->
    <button
      class="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-gray-700 shadow-md rounded-full hover:bg-gray-100 z-10"
      @click="scrollLeft"
    >
      &lt;
    </button>
    <button
      class="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-gray-700 shadow-md rounded-full hover:bg-gray-100 z-10"
      @click="scrollRight"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
