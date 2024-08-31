<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { shuffleArray } from '@/helpers/shuffleArray'
import { type Difficulty, useQuizStore } from '@/stores/quiz'

interface Props {
  questionIndex: number
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
  difficulty: Difficulty
}

const props = defineProps<Props>()

const quiz = useQuizStore()
const selectedAnswer = ref<string | null>(null)
const allOptions = computed(() => shuffleArray([...props.incorrectAnswers, props.correctAnswer]))
const isLastQuestion = computed(() => quiz.selectedAnswers.length === quiz.questions.length)

const handleOptionClick = (option: string) => {
  selectedAnswer.value = option

  quiz.updateSelectedAnswers({
    answer: option,
    isCorrect: option === props.correctAnswer,
    questionIndex: props.questionIndex,
    difficulty: props.difficulty
  })
}

const buttonText = computed(() => {
  if (quiz.selectedAnswers.length === quiz.questions.length || isLastQuestion.value) {
    return 'Finish'
  }
  if (selectedAnswer.value) {
    return 'Next'
  }
  return 'Skip'
})

onUpdated(() => {
  const preselectedAnswer = quiz.selectedAnswers.find(
    (answer) => answer.questionIndex === props.questionIndex
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
    <p class="text-lg font-bold text-primary mb-2">Question {{ questionIndex + 1 }}</p>
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
    <BaseButton
      @click="quiz.nextQuestion()"
      variant="primary"
      size="medium"
      class="w-full mt-4"
      :disabled="isLastQuestion && !selectedAnswer"
    >
      {{ buttonText }}
    </BaseButton>
  </div>
</template>
