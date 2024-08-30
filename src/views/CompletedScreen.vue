<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'

const quiz = useQuizStore()
const router = useRouter()

const correctAnswersCount = computed(() => {
  return quiz.selectedAnswers.filter((answer) => answer.isCorrect).length
})
const totalQuestions = computed(() => quiz.questions.length)
const correctPercentage = computed(() => {
  return Math.round((correctAnswersCount.value / totalQuestions.value) * 100)
})
const hasAnsweredAnyQuestions = computed(() => quiz.selectedAnswers.length)

const handleRestart = () => {
  quiz.restartQuiz()
  void router.push({ name: 'StartScreen' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white rounded-lg p-6 max-w-md w-full text-center">
      <h1 class="text-2xl font-bold text-teal-600 mb-4">
        {{ hasAnsweredAnyQuestions ? 'Quiz Completed!' : 'No Answers Recorded' }}
      </h1>

      <template v-if="hasAnsweredAnyQuestions">
        <p class="text-lg mb-4">
          You answered <span class="font-bold">{{ correctAnswersCount }}</span> out of
          <span class="font-bold">{{ totalQuestions }}</span> questions correctly.
        </p>
        <p class="text-lg mb-8">
          Your score: <span class="text-teal-600 font-bold">{{ correctPercentage }}%</span>
        </p>
      </template>

      <template v-else>
        <p class="text-lg mb-8 text-gray-500">
          It seems you haven't answered any questions yet. Please take the quiz to see your results.
        </p>
      </template>

      <button
        class="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
        @click="handleRestart"
      >
        Try again
      </button>
    </div>
  </div>
</template>
