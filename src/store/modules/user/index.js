import * as getters from './getters'
import actions from './actions'

export default {
    namespaced: true,
    state: {
        // 登录用户
        user: {},
        // 登录用户歌单
        userPlaylist: []
    },
    getters,
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setUserPlaylist(state, playlist) {
            state.userPlaylist = playlist
        }
    },
    actions
}
