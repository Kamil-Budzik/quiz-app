import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API_URL = 'https://opentdb.com/api.php?amount=10'

export enum GameStatus {
  NotStarted,
  InProgress,
  Completed,
  Reviewing,
  GameOver
}

export type Difficulty = 'easy' | 'medium' | 'hard'

interface ApiQuestion {
  category: 'string'
  question: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: Difficulty
}

export interface Question extends ApiQuestion {
  correctAnswer: string
  incorrectAnswers: string[]
}

interface ApiResponse {
  response_code: number
  results: Question[]
}

export interface SelectedAnswer {
  questionIndex: number
  answer: string
  isCorrect: boolean
  difficulty: Difficulty
}

export const useQuizStore = defineStore('quiz', () => {
  const router = useRouter()

  const gameStatus: Ref<GameStatus> = ref(GameStatus.NotStarted)
  const currentQuestionIndex = ref(0)
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
  const questions = ref<Question[]>([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)
  const selectedAnswers = ref<SelectedAnswer[]>([])

  const updateSelectedAnswers = (answer: SelectedAnswer) => {
    selectedAnswers.value = [
      ...selectedAnswers.value.filter((a) => a.questionIndex !== answer.questionIndex),
      answer
    ]
  }

  const startQuiz = async () => {
    await fetchQuestions()

    gameStatus.value = GameStatus.InProgress
    currentQuestionIndex.value = 0

    void router.push({ name: 'InProgressScreen' })
  }

  const completeQuiz = () => {
    gameStatus.value = GameStatus.Completed

    void router.push({ name: 'CompletedScreen' })
  }

  const reviewAnswers = () => {
    gameStatus.value = GameStatus.Reviewing
  }

  const nextQuestion = () => {
    if (selectedAnswers.value.length === questions.value.length) {
      gameStatus.value = GameStatus.GameOver
      return completeQuiz()
    }

    // Find the next unanswered question starting from the current index
    let nextIndex = currentQuestionIndex.value + 1
    while (nextIndex !== currentQuestionIndex.value) {
      // Wrap around to the start if we reach the end
      if (nextIndex >= questions.value.length) {
        nextIndex = 0
      }

      // Check if the question at nextIndex has been answered
      const isAnswered = selectedAnswers.value.some((answer) => answer.questionIndex === nextIndex)
      if (!isAnswered) {
        currentQuestionIndex.value = nextIndex
        return
      }

      nextIndex++
    }

    // If we somehow exit the loop without finding an unanswered question, fallback to the first unanswered question
    const firstUnansweredIndex = questions.value.findIndex(
      (_, index) => !selectedAnswers.value.some((answer) => answer.questionIndex === index)
    )

    if (firstUnansweredIndex !== -1) {
      currentQuestionIndex.value = firstUnansweredIndex
    }
  }

  const setCurrentQuestion = (index: number) => (currentQuestionIndex.value = index)

  // TODO: Think about creating a layer of abstraction for other requests
  const fetchQuestions = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await axios.get<ApiResponse>(API_URL)
      questions.value = res.data.results.map((q: ApiQuestion) => ({
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers,
        ...q
      }))
    } catch (err: unknown) {
      console.debug('Error in fetchQuestions', error)
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message || 'API Error'
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        // Fallback for unknown error types
        error.value = 'An unknown error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  const restartQuiz = () => {
    gameStatus.value = GameStatus.NotStarted
    currentQuestionIndex.value = 0
    questions.value = []
    loading.value = false
    error.value = null
    selectedAnswers.value = []
  }

  return {
    gameStatus,
    currentQuestion,
    loading,
    currentQuestionIndex,
    questions,
    error,
    selectedAnswers,
    updateSelectedAnswers,
    startQuiz,
    completeQuiz,
    reviewAnswers,
    nextQuestion,
    fetchQuestions,
    setCurrentQuestion,
    restartQuiz
  }
})
