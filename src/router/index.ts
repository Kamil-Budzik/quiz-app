import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/views/StartScreen.vue'
import InProgressScreen from '@/views/InProgressScreen.vue'
import CompletedScreen from '@/views/CompletedScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: StartScreen },
    { path: '/in-progress', component: InProgressScreen },
    { path: '/completed', component: CompletedScreen }
  ]
})

export default router
