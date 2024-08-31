<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz'

const quiz = useQuizStore()

const isAnswered = (index: number) => {
  return quiz.selectedAnswers.some((answer) => answer.questionIndex === index)
}

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
  <div class="relative w-full py-2 flex items-center justify-center">
    <div
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 px-4 w-full max-w-xl"
    >
      <button
        v-for="(item, index) in quiz.questions"
        :key="index"
        :class="[
          'w-full h-8 flex items-center justify-center rounded-full',
          getButtonClasses(index)
        ]"
        @click="quiz.setCurrentQuestion(index)"
      >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>
