import 'bootstrap'
import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mitt from 'mitt'
import VueClipboard from 'vue3-clipboard'
import App from './App.vue'
import router from './router'



const emitter = mitt()
const app = createApp(App)
app.provide('emitter', emitter)
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
