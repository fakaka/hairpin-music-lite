import Vue from 'vue'
import Vuex from 'vuex'
import globalModule from './modules/global'
import musicModule from './modules/music'
import userModule from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        music: musicModule,
        user: userModule,
        global: globalModule
    }
})
