import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { fetchApi } from '@/helpers/fetchApi'
import type { ApiQuestion, ApiResponse, Question, SelectedAnswer } from '@/stores/quiz.types'

export enum GameStatus {
  NotStarted,
  InProgress,
  Completed,
  Reviewing,
  GameOver
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

  const amountToFetch = ref(10)
  const difficulty = ref('all')

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

      const isAnswered = selectedAnswers.value.some((answer) => answer.questionIndex === nextIndex)
      if (!isAnswered) {
        currentQuestionIndex.value = nextIndex
        return
      }

      nextIndex++
    }

    const firstUnansweredIndex = questions.value.findIndex(
      (_, index) => !selectedAnswers.value.some((answer) => answer.questionIndex === index)
    )

    if (firstUnansweredIndex !== -1) {
      console.error('No unanswered questions found, falling back to the first unanswered question')
      currentQuestionIndex.value = firstUnansweredIndex
    }
  }

  const setCurrentQuestion = (index: number) => (currentQuestionIndex.value = index)

  const fetchQuestions = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetchApi<ApiResponse>({
        params: {
          amount: amountToFetch.value,
          difficulty: difficulty.value === 'all' ? undefined : difficulty.value
        }
      })
      questions.value = res.data.results.map((q: ApiQuestion) => ({
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers,
        ...q
      }))
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const reviewAnswers = () => {
    gameStatus.value = GameStatus.Reviewing
  }

  const completeQuiz = () => {
    gameStatus.value = GameStatus.Completed

    void router.push({ name: 'CompletedScreen' })
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
    amountToFetch,
    currentQuestion,
    loading,
    currentQuestionIndex,
    questions,
    error,
    selectedAnswers,
    difficulty,
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
