<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { shuffleArray } from '@/helpers/shuffleArray'
import { useQuizStore } from '@/stores/quiz'

interface Props {
  questionNumber: number
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}

const props = defineProps<Props>()

const quiz = useQuizStore()
const selectedAnswer = ref<string | null>(null)
const allOptions = computed(() => shuffleArray([...props.incorrectAnswers, props.correctAnswer]))

const handleOptionClick = (option: string) => {
  selectedAnswer.value = option

  quiz.updateSelectedAnswers({
    answer: option,
    isCorrect: option === props.correctAnswer,
    questionIndex: props.questionNumber - 1
  })
}

const buttonText = computed(() => {
  console.log('selected answer', selectedAnswer.value)
  if (quiz.selectedAnswers.length === quiz.questions.length) {
    return 'Finish'
  }
  if (selectedAnswer.value) {
    return 'Next'
  }
  return 'Skip'
})

onUpdated(() => {
  const preselectedAnswer = quiz.selectedAnswers.find(
    (answer) => answer.questionIndex === props.questionNumber - 1
  )

  if (preselectedAnswer) {
    selectedAnswer.value = preselectedAnswer?.answer || null
  } else {
    selectedAnswer.value = null
  }
})
</script>

<template>
  <div class="p-6 max-w-xl mx-auto my-4">
    <p class="text-lg font-bold text-primary mb-2">Question {{ questionNumber }}</p>
    <header v-html="question" class="text-xl font-semibold mb-4 text-text"></header>
    <ul class="space-y-2 mb-6">
      <li v-for="option in allOptions" :key="option" @click="handleOptionClick(option)">
        <button
          class="w-full text-left bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
          :class="{ 'bg-teal-700 hover:bg-teal-700': selectedAnswer === option }"
          v-html="option"
        />
      </li>
    </ul>
    <BaseButton @click="quiz.nextQuestion()" variant="primary" size="medium" class="w-full mt-4">
      {{ buttonText }}
    </BaseButton>
  </div>
</template>
