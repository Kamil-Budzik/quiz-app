<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'
import ProgressSpinner from 'primevue/progressspinner'
import QuizCard from '@/components/QuizCard.vue'
import QuizPagination from '@/components/QuizPagination.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'

const quiz = useQuizStore()
</script>
<template>
  <div>
    <ProgressSpinner
      v-if="quiz.loading"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Loading"
    />

    <section v-else>
      <BaseProgressBar
        :total-questions="quiz.questions.length"
        :answered-questions="quiz.selectedAnswers.length"
      />
      <QuizPagination />

      <QuizCard v-bind="quiz.currentQuestion" :question-number="quiz.currentQuestionIndex + 1" />
    </section>

    <ul></ul>
  </div>
</template>
