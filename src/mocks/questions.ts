import type { Question } from '@/stores/quiz.types'

export const mockedQuestions: Question[] = [
  {
    correctAnswer: 'Paris',
    incorrectAnswers: ['London', 'Berlin', 'Rome'],
    question: 'What is the capital of France?',
    incorrect_answers: ['London', 'Berlin', 'Rome'],
    correct_answer: 'Paris',
    difficulty: 'easy',
    category: 'Geography'
  },
  {
    correctAnswer: 'Pacific Ocean',
    incorrectAnswers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    question: 'Which ocean is the largest?',
    incorrect_answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    correct_answer: 'Pacific Ocean',
    difficulty: 'medium',
    category: 'Geography'
  },
  {
    correctAnswer: 'Leonardo da Vinci',
    incorrectAnswers: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
    question: 'Who painted the Mona Lisa?',
    incorrect_answers: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
    correct_answer: 'Leonardo da Vinci',
    difficulty: 'medium',
    category: 'Art'
  },
  {
    correctAnswer: 'Mercury',
    incorrectAnswers: ['Venus', 'Earth', 'Mars'],
    question: 'Which planet is closest to the Sun?',
    incorrect_answers: ['Venus', 'Earth', 'Mars'],
    correct_answer: 'Mercury',
    difficulty: 'easy',
    category: 'Science'
  }
]
