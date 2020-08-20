import { shallowEqual, delDuplicateObj } from '../../../utils/common'

export default {
    setCurrentSong(state, song) {
        state.currentSong = song
    },
    setCurrentTime(state, time) {
        state.currentTime = time
    },
    setPlayingState(state, playing) {
        state.playing = playing
    },
    setPlayMode(state, mode) {
        state.playMode = mode
    },
    setPlayerShow(state, show) {
        state.isPlayerShow = show
    },
    setPlaylistPromptShow(state, show) {
        state.isPlaylistPromptShow = show
    },
    setPlaylist(state, playlist) {
        const { playlist: oldPlaylist } = state
        state.playlist = playlist
        // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
        if (!shallowEqual(oldPlaylist, playlist, 'id')) {
            state.isPlaylistPromptShow = true
            setTimeout(() => {
                state.isPlaylistPromptShow = false
            }, 2000)
        }
    },
    addPlaylist(state, playlist) {
        const { playlist: oldPlaylist } = state
        state.playlist = oldPlaylist.concat(delDuplicateObj(oldPlaylist, playlist, 'id'))
        // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
        if (!shallowEqual(oldPlaylist, playlist, 'id')) {
            state.isPlaylistPromptShow = true
            setTimeout(() => {
                state.isPlaylistPromptShow = false
            }, 2000)
        }
    }
}
