import { createRouter, createWebHistory } from 'vue-router'
import { useQuizStore, GameStatus } from '@/stores/quiz'
import StartScreen from '@/views/StartScreen.vue'
import InProgressScreen from '@/views/InProgressScreen.vue'
import CompletedScreen from '@/views/CompletedScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/in-progress', name: 'InProgressScreen', component: InProgressScreen },
    { path: '/completed', name: 'CompletedScreen', component: CompletedScreen },
    { path: '/', name: 'StartScreen', component: StartScreen },
  ]
})

router.beforeEach((to, _, next) => {
  const quizStore = useQuizStore()

  // Redirect the user if he enters InProgressScreen without starting a game
  if (to.name === 'InProgressScreen' && quizStore.gameStatus !== GameStatus.InProgress) {
    next({ name: 'StartScreen' })
  } else {
    next()
  }
})

export default router
