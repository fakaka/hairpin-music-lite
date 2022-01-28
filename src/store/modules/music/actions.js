import storage from 'good-storage'
import { getSongImg } from '../../../utils/music'
import { notify as notifySong } from '@/utils/notify'
import { shallowEqual, delDuplicateObj } from '../../../utils/common'

export default {
    setCurrentSong(song) {
        this.currentSong = song
        if (song.name) {
            document.title = '▶ ' + song.name
        }
        storage.set('song', song)
    },
    setCurrentTime(time) {
        this.currentTime = time
    },
    setPlayingState(playing) {
        this.playing = playing
        let oldTitle = document.title
        if (playing) {
            document.title = oldTitle.replace('❚❚', '▶')
        } else {
            document.title = oldTitle.replace('▶', '❚❚')
        }
    },
    setPlayMode(mode) {
        this.playMode = mode
    },
    setPlayerShow(show) {
        this.isPlayerShow = show
    },
    setPlaylistPromptShow(state, show) {
        this.isPlaylistPromptShow = show
    },
    setPlaylist(playlist) {
        const { playlist: oldPlaylist } = this
        this.playlist = playlist
        // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
        if (playlist.length != 0 && !shallowEqual(oldPlaylist, playlist, 'id')) {
            storage.set('playlist', playlist)
            this.isPlaylistPromptShow = true
            setTimeout(() => {
                this.isPlaylistPromptShow = false
            }, 2000)
        }
    },
    addPlaylist(playlist) {
        const { playlist: oldPlaylist } = this
        this.playlist = oldPlaylist.concat(delDuplicateObj(oldPlaylist, playlist, 'id'))
        // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
        if (!shallowEqual(oldPlaylist, playlist, 'id')) {
            storage.set('playlist', playlist)
            this.isPlaylistPromptShow = true
            setTimeout(() => {
                this.isPlaylistPromptShow = false
            }, 2000)
        }
    },
    removeSong(song) {
        const { playlist } = this
        let newPlaylist = Object.assign([], playlist)
        for (let i = 0; i < newPlaylist.length; i++) {
            if (song.id == newPlaylist[i].id) {
                newPlaylist.splice(i, 1)
                break
            }
        }
        this.playlist = newPlaylist
    },
    // 整合歌曲信息 并且开始播放
    async startSong(rawSong) {
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
        this.setCurrentSong(song)
        this.setPlayingState(true)
        notifySong(song)
    },
    clearCurrentSong() {
        this.setCurrentSong({})
        this.setPlayingState(false)
        this.setCurrentTime(0)
    },
    removeSong(song) {
        this.removeSong(song)
    },
    clearPlaylist() {
        this.setPlaylist()  
        this.clearCurrentSong()
    },
    addToPlaylist(song) {
        const { playlist } = this
        const copy = playlist.slice()
        if (!copy.find(({ id }) => id === song.id)) {
            copy.unshift(song)
            this.setPlaylist(copy)
        }
    }
}
