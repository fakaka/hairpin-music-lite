import { shallowEqual, delDuplicateObj } from '../../../utils/common'
import storage from 'good-storage'
import { Object } from 'core-js'

export default {
    setCurrentSong(state, song) {
        state.currentSong = song
        if (song.name) {
            document.title = '▶ ' + song.name
        }
        storage.set('song', song)
    },
    setCurrentTime(state, time) {
        state.currentTime = time
    },
    setPlayingState(state, playing) {
        state.playing = playing
        let oldTitle = document.title
        if (playing) {
            document.title = oldTitle.replace('❚❚', '▶')
        } else {
            document.title = oldTitle.replace('▶', '❚❚')
        }
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
        if (playlist.length != 0 && !shallowEqual(oldPlaylist, playlist, 'id')) {
            storage.set('playlist', playlist)
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
            storage.set('playlist', playlist)
            state.isPlaylistPromptShow = true
            setTimeout(() => {
                state.isPlaylistPromptShow = false
            }, 2000)
        }
    },
    removeSong(state, song) {
        const { playlist } = state
        let newPlaylist = Object.assign([], playlist)
        for (let i = 0; i < newPlaylist.length; i++) {
            if (song.id == newPlaylist[i].id) {
                newPlaylist.splice(i, 1)
                break
            }
        }
        state.playlist = newPlaylist
    }
}
