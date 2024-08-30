<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'
import ProgressSpinner from 'primevue/progressspinner'
import QuizCard from '@/components/QuizCard.vue'

const quiz = useQuizStore()

console.log(quiz.loading)
</script>
<template>
  <div>
    <ProgressSpinner v-if="quiz.loading" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Loading" />

    <ul v-else>
      <QuizCard :question="quiz.questions[quiz.currentQuestionIndex]"
        :question-number="quiz.currentQuestionIndex + 1" />
    </ul>
  </div>
</template>
