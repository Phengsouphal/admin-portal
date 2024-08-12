import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locales'

import ArcoVue from '@arco-design/web-vue'
import './assets/styles/main.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import '@arco-design/web-vue/dist/arco.less'
import App from './App.vue'
import router from './router'
import './assets/styles/nprogress.scss'
import 'aos/dist/aos.css'
import '~/imports/chart'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(i18n)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
