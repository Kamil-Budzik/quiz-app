import './assets/main.css'
import './assets/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import BaseButton from '@/components/BaseButton.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.component('BaseButton', BaseButton)

app.mount('#app')
