<template>
  <Bar :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { computed } from 'vue'
import { type Difficulty, type SelectedAnswer } from '@/stores/quiz.types'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  selectedAnswers: SelectedAnswer[]
}>()

const chartData = computed(() => {
  const difficultyMap = props.selectedAnswers.reduce(
    (acc, answer) => {
      acc[answer.difficulty] = acc[answer.difficulty] || { correct: 0, incorrect: 0 }
      if (answer.isCorrect) {
        acc[answer.difficulty].correct++
      } else {
        acc[answer.difficulty].incorrect++
      }
      return acc
    },
    {} as Record<Difficulty, { correct: number; incorrect: number }>
  )

  return {
    labels: ['easy', 'medium', 'hard'] as Difficulty[],
    datasets: [
      {
        label: 'Correct Answers',
        backgroundColor: '#10B981',
        data: [
          difficultyMap.easy?.correct || 0,
          difficultyMap.medium?.correct || 0,
          difficultyMap.hard?.correct || 0
        ]
      },
      {
        label: 'Missed Answers',
        backgroundColor: '#EF4444',
        data: [
          difficultyMap.easy?.incorrect || 0,
          difficultyMap.medium?.incorrect || 0,
          difficultyMap.hard?.incorrect || 0
        ]
      }
    ]
  }
})
</script>
