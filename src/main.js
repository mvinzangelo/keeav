// We will likly avoid adding content in this file

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import mitt from 'mitt'

const emitter = mitt()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
