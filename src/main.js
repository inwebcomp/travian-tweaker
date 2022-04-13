import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import {createPinia} from "pinia"
import {useAppStore} from "@/stores/app"

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')