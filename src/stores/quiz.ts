import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API_URL = "https://opentdb.com/api.php?amount=10"

export enum GameStatus {
  NotStarted,
  InProgress,
  Completed,
  Reviewing,
  GameOver
}

interface ApiQuestion {
  category: "string"
  question: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: "easy" | "medium" | "hard"
}

interface Question extends ApiQuestion {
  correctAnswer: string
  incorrectAnswers: string[]
}

interface ApiResponse {
  response_code: number
  results: Question[]
}

export const useQuizStore = defineStore('quiz', () => {
  const router = useRouter()

  const gameStatus: Ref<GameStatus> = ref(GameStatus.NotStarted)
  const currentQuestionIndex = ref(0)
  const questions = ref<Question[]>([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)
  const score = ref(0)

  const startQuiz = () => {
    fetchQuestions()

    gameStatus.value = GameStatus.InProgress
    currentQuestionIndex.value = 0
    score.value = 0

    router.push({ name: 'InProgressScreen' })
  }

  const completeQuiz = () => {
    gameStatus.value = GameStatus.Completed

    router.push({ name: 'InProgressScreen' })
  }

  const reviewAnswers = () => {
    gameStatus.value = GameStatus.Reviewing
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      completeQuiz()
    }
  }

  const answerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      score.value++
    }
    nextQuestion()
  }

  // TODO: Think about creating a layer of abstraction for other requests
  const fetchQuestions = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await axios.get<ApiResponse>(API_URL)
      const mappedQuestions = res.data.results.map((q: ApiQuestion) => ({
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers,
        ...q
      }))
      questions.value = mappedQuestions
      console.log('questions', questions.value)
    } catch (err: unknown) {
      console.debug('Error in fetchQuestions', error)
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message || 'API Error';
      } else if (err instanceof Error) {
        error.value = err.message;
      } else {
        // Fallback for unknown error types
        error.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false
    }

  }

  return {
    gameStatus,
    loading,
    currentQuestionIndex,
    questions,
    score,
    startQuiz,
    completeQuiz,
    reviewAnswers,
    nextQuestion,
    answerQuestion
  }
})
