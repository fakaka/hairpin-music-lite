import { createStore } from 'vuex'

import globalModule from './modules/global'
import musicModule from './modules/music'
import userModule from './modules/user'

export default createStore({
    modules: {
        music: musicModule,
        user: userModule,
        global: globalModule
    }
})
