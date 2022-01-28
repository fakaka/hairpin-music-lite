import { defineStore, createPinia } from 'pinia'

import globalModule from './modules/global'
import musicModule from './modules/music'
import userModule from './modules/user'

export const useGlobalStore = defineStore('global', globalModule)
export const useMusicStore = defineStore('music', musicModule)
export const useUserStore = defineStore('user', userModule)

export default createPinia()
