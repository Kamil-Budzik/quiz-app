<script setup lang="ts">
import { useQuizStore, GameStatus } from '@/stores/quiz'

const quiz = useQuizStore()
</script>
<template>
  <div>
    in progress
    {{quiz.questions}}
  </div>
</template>
