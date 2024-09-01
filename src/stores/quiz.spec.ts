import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { GameStatus, useQuizStore } from './quiz'
import type { SelectedAnswer } from '@/stores/quiz.types'
import { mockedQuestions } from '@/mocks/questions'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('Quiz Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with the correct default state', () => {
    const store = useQuizStore()
    expect(store.gameStatus).toBe(GameStatus.NotStarted)
    expect(store.currentQuestionIndex).toBe(0)
    expect(store.questions).toEqual([])
    expect(store.selectedAnswers).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
    expect(store.amountToFetch).toBe(10)
    expect(store.difficulty).toBe('all')
  })

  it('starts the quiz correctly', async () => {
    const store = useQuizStore()
    await store.startQuiz()
    expect(store.gameStatus).toBe(GameStatus.InProgress)
    expect(store.currentQuestionIndex).toBe(0)
  })

  it('completes the quiz correctly', () => {
    const store = useQuizStore()
    store.completeQuiz()
    expect(store.gameStatus).toBe(GameStatus.Completed)
  })

  it('updates selected answers correctly', () => {
    const store = useQuizStore()
    const answer: SelectedAnswer = {
      questionIndex: 0,
      isCorrect: true,
      answer: 'A',
      difficulty: 'easy'
    }
    store.updateSelectedAnswers(answer)
    expect(store.selectedAnswers).toContainEqual(answer)
  })

  it('finishes the quiz after all questions were answered', () => {
    const store = useQuizStore()
    store.questions = [mockedQuestions[0], mockedQuestions[1]]
    store.updateSelectedAnswers({
      questionIndex: 0,
      isCorrect: true,
      answer: 'A',
      difficulty: 'easy'
    })
    store.updateSelectedAnswers({
      questionIndex: 1,
      isCorrect: true,
      answer: 'A',
      difficulty: 'easy'
    })
    store.nextQuestion()
    expect(store.gameStatus).toBe(GameStatus.Completed)
  })

  it('sets the game status to reviewing', () => {
    const store = useQuizStore()
    store.reviewAnswers()
    expect(store.gameStatus).toBe(GameStatus.Reviewing)
  })

  it('loops back to the first unanswered question after reaching the last question', () => {
    const store = useQuizStore()
    store.questions = mockedQuestions
    store.updateSelectedAnswers({
      questionIndex: 0,
      isCorrect: true,
      answer: 'A',
      difficulty: 'easy'
    })
    store.updateSelectedAnswers({
      questionIndex: 2,
      isCorrect: false,
      answer: 'B',
      difficulty: 'medium'
    })
    store.updateSelectedAnswers({
      questionIndex: 3,
      isCorrect: false,
      answer: 'B',
      difficulty: 'medium'
    })
    store.nextQuestion()
    expect(store.currentQuestionIndex).toBe(1)
  })

  it('restarts the quiz correctly', () => {
    const store = useQuizStore()
    store.restartQuiz()
    expect(store.gameStatus).toBe(GameStatus.NotStarted)
    expect(store.currentQuestionIndex).toBe(0)
    expect(store.questions).toEqual([])
    expect(store.selectedAnswers).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })
})
