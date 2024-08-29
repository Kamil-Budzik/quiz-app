<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'

const quiz = useQuizStore()

const startQuiz = () => {
  quiz.startQuiz()
}
</script>

<template>
    <main class="home-page">
    <div class="quiz-container">
      <div v-if="quiz.loading">
        <!-- Loading Indicator -->
        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
      </div>

      <div v-else>
        <!-- Display content based on the game state -->
        <div v-if="quiz.gameStatus === GameStatus.NotStarted">
          <h1>Welcome to the Quiz App</h1>
          <Button @click="startQuiz" class="start-btn">Start Quiz</Button>
        </div>

        <div v-else-if="quiz.gameStatus === GameStatus.InProgress">
          <h1>Quiz In Progress</h1>
          {{JSON.stringify(quiz.questions)}}
          <!-- You can add your quiz questions and other components here -->
        </div>

        <div v-else-if="quiz.gameStatus === GameStatus.Completed">
          <h1>Quiz Completed!</h1>
          <p>Your score: {{ quiz.score }}</p>
          <!-- Add any other completion-related content here -->
        </div>

        <div v-else-if="quiz.gameStatus === GameStatus.Reviewing">
          <h1>Review Your Answers</h1>
          <!-- Add content for reviewing answers -->
        </div>

        <!-- Optional: Fallback for unknown states -->
        <div v-else>
          <h1>Something went wrong...</h1>
        </div>
      </div>
    </div>
  </main></template>

<style scoped lang="scss">
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: black;
}

.quiz-container {
  text-align: center;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
