<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz'
import QuizCard from '@/components/QuizCard.vue'
import QuizPagination from '@/components/QuizPagination.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'

const quiz = useQuizStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div v-if="quiz.loading" class="flex justify-center items-center h-full">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
    </div>

    <section
      v-else
      class="flex flex-col justify-between w-full max-w-screen-lg bg-white rounded-lg p-8 space-y-6"
      style="width: 80vw; min-height: 80vh"
    >
      <BaseProgressBar
        :total-questions="quiz.questions.length"
        :answered-questions="quiz.selectedAnswers.length"
        class="mx-auto"
      />
      <div class="flex flex-col items-center space-y-6 w-full max-w-[800px] mx-auto">
        <QuizPagination class="w-full" />
        <QuizCard
          class="w-full"
          v-bind="quiz.currentQuestion"
          :question-index="quiz.currentQuestionIndex"
        />
      </div>
    </section>
  </div>
</template>
