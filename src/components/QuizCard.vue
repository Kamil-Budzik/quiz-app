<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Question } from '@/stores/quiz'
import { shuffleArray } from '@/helpers/shuffleArray'

interface Props {
  question: Question
  questionNumber: number
}

const props = defineProps<Props>()
const { question, correctAnswer, incorrectAnswers } = toRefs(props.question)

const allOptions = computed(() => shuffleArray([...incorrectAnswers.value, correctAnswer.value]))
</script>

<template>
  <li>
    <p>Question {{ questionNumber }}</p>
    <header>{{ question }}</header>
    <ul>
      <li v-for="option in allOptions" :key="option">
        {{ option }}
      </li>
    </ul>
  </li>
</template>
