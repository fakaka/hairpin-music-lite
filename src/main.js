import { createApp, defineAsyncComponent } from 'vue'
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

const components = import.meta.glob('./base/*.vue') // 异步方式

for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    app.component(name, defineAsyncComponent(value))
}

app.use(ElementPlus).use(store).use(router).mount('#app')
