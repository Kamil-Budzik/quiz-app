<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="wrapper">
    <div class="quiz-container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
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
