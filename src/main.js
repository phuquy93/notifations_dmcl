import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import store from './store'
import router from './router'

import MyPagination from "@/components/Pagination"
Vue.component('MyPagination', MyPagination)
require("@/style/main.scss")

import '@/permission'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
