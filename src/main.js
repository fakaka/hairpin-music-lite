import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

const app = createApp(App)

// import { EMPTY_IMG } from './utils/common'

// import VueLazyload from 'vue-lazyload'
// https://element-plus.gitee.io/zh-CN/guide/quickstart.html#按需导入
// import ElementPlus from 'element-plus'

// import 'element-plus/dist/index.css'
import './assets/styles/element-overwrite.scss'
import './assets/styles/reset.css'
import './assets/styles/app.scss'

import { toRem } from './utils/rem'

// Vue.prototype.$toRem = toRem
app.config.globalProperties.$toRem = toRem

const requireComponent = import.meta.globEager('./base/*.vue')
for (const [key, value] of Object.entries(requireComponent)) {
    const fileName = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    let component = value.default
    app.component(component.name || fileName, markRaw(component))
}

app.use(store).use(router).mount('#app')
