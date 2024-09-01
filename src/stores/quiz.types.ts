export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ApiQuestion {
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: Difficulty
}

export interface Question extends ApiQuestion {
  correctAnswer: string
  incorrectAnswers: string[]
}

export interface ApiResponse {
  response_code: number
  results: Question[]
}

export interface SelectedAnswer {
  questionIndex: number
  answer: string
  isCorrect: boolean
  difficulty: Difficulty
}
