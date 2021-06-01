import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

const app = createApp(App)
// import { EMPTY_IMG } from './utils/common'

// import VueLazyload from 'vue-lazyload'

import ElementPlus from 'element-plus'

import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/element-overwrite.scss'
import './assets/styles/reset.css'
import './assets/styles/app.scss'

// Vue.use(ElementUI, { size: 'mini' })
// Vue.use(VueLazyload, {
//     loading: EMPTY_IMG,
//     error: EMPTY_IMG
// })
// import { toRem } from './utils/rem'

// Vue.prototype.$toRem = toRem

const requireComponent = require.context('./base', true, /[a-z0-9]+\.(jsx?|vue)$/i)
// 批量注册base组件
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = componentConfig.default.name
    if (componentName) {
        app.component(componentName, componentConfig.default || componentConfig)
    }
})

app.use(ElementPlus).use(store).use(router).mount('#app')
