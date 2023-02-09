import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

import './assets/main.css'
import '@/assets/index.css'
import '@/assets/errors.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

//directiva
import ClickOutside from '@/directivas/clickOutside.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.directive('click-outside',ClickOutside)

app.mount('#app')

