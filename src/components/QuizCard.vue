<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { shuffleArray } from '@/helpers/shuffleArray'
import { useQuizStore } from '@/stores/quiz'
import { type Difficulty } from '@/stores/quiz.types'

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

  quiz.nextQuestion()
}

const buttonText = computed(() => {
  if (quiz.selectedAnswers.length === quiz.questions.length || isLastQuestion.value) {
    return 'Finish'
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
  <div class="quiz-card-container p-6 mx-auto bg-white rounded-lg text-center">
    <p class="text-lg font-bold text-teal-600 mb-4">Question {{ questionIndex + 1 }}</p>
    <header v-html="question" class="text-xl md:text-2xl font-semibold mb-6 text-gray-900"></header>
    <div class="quiz-options-container py-4">
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 mb-8 text-left">
        <li v-for="option in allOptions" :key="option" @click="handleOptionClick(option)">
          <button
            class="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out min-h-[3rem]"
            :class="{ 'bg-teal-700 hover:bg-teal-700': selectedAnswer === option }"
            v-html="option"
          />
        </li>
      </ul>
      <BaseButton
        @click="quiz.nextQuestion()"
        size="medium"
        class="w-full max-w-md mt-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-90"
        :disabled="isLastQuestion && !selectedAnswer"
      >
        {{ buttonText }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.quiz-card-container {
  max-width: 100%;
  min-height: 400px;
}

.quiz-options-container {
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .quiz-card-container {
    max-width: 80%;
    min-height: 500px;
  }
}

@media (min-width: 1024px) {
  .quiz-card-container {
    max-width: 100%;
    min-height: 600px;
  }

  .quiz-options-container {
    max-width: 100%;
  }
}
</style>
