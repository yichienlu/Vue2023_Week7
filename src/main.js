import { createApp } from 'vue' // 來自套件
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue' // 來自src資料夾
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'

import 'bootstrap'
import './assets/all.scss'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
// Activate the locale
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')

const app = createApp(App)

// 元件
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
// 插件
app.use(CKEditor)
app.use(createPinia()) 
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
