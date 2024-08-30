<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'

const quiz = useQuizStore()

const startQuiz = () => {
  quiz.startQuiz()
}
</script>

<template>
  <div v-if="quiz.gameStatus === GameStatus.NotStarted">
    <h1>Welcome to the Quiz App</h1>
    <Button @click="startQuiz" class="start-btn">Start Quiz</Button>
  </div>
</template>
