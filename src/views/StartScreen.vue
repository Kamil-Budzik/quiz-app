<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'
import BaseButton from '@/components/BaseButton.vue'

const quiz = useQuizStore()

const startQuiz = () => {
  quiz.startQuiz()
}
</script>

<template>
  <div class="bg-white rounded-lg p-8 max-w-md w-full text-center">
    <h1 class="text-3xl font-bold text-primary mb-4">Welcome to the Quiz App</h1>
    <p class="text-text mb-6">
      Test your knowledge with our exciting quizzes. Are you ready to begin?
    </p>
    <BaseButton @click="startQuiz">Start Quiz</BaseButton>
  </div>
</template>
