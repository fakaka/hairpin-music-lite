import { getSongImg } from '../../../utils/music'

export default {
    // 整合歌曲信息 并且开始播放
    async startSong({ commit, state }, rawSong) {
        // 浅拷贝一份 改变引用
        // 1.不污染元数据
        // 2.单曲循环为了触发watch
        const song = Object.assign({}, rawSong)
        if (!song.img) {
            console.error('!song.img----------?????')
            if (song.albumId) {
                song.img = await getSongImg(song.id, song.albumId)
            }
        }
        commit('setCurrentSong', song)
        commit('setPlayingState', true)
    },
    clearCurrentSong({ commit }) {
        commit('setCurrentSong', {})
        commit('setPlayingState', false)
        commit('setCurrentTime', 0)
    },
    removeSong({ commit }, song) {
        commit('removeSong', song)
    },
    clearPlaylist({ commit, dispatch }) {
        commit('setPlaylist', [])
        dispatch('clearCurrentSong')
    },
    addToPlaylist({ commit, state }, song) {
        const { playlist } = state
        const copy = playlist.slice()
        if (!copy.find(({ id }) => id === song.id)) {
            copy.unshift(song)
            commit('setPlaylist', copy)
        }
    }
}
