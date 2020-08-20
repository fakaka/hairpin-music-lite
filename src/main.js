import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { EMPTY_IMG } from './utils/common'

import VueLazyload from 'vue-lazyload'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/reset.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.use(VueLazyload, {
    loading: EMPTY_IMG,
    error: EMPTY_IMG
})

const requireComponent = require.context('./base', true, /[a-z0-9]+\.(jsx?|vue)$/i)
// 批量注册base组件
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = componentConfig.default.name
    if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
    }
})

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
