import storage from 'good-storage'
import * as getters from './getters'
import actions from './actions'

import { playModeMap } from '../../../utils/config'

export default {
    state: () => {
        return {
            // 当前播放歌曲
            currentSong: storage.get('song', {}),
            // 当前播放时长
            currentTime: 0,
            // 播放状态
            playing: false,
            // 播放模式
            playMode: playModeMap.sequence.code,
            // 播放提示显示
            isPlaylistPromptShow: false,
            // 歌曲详情页显示
            isPlayerShow: false,
            // 播放列表数据
            playlist: storage.get('playlist', [])
        }
    },
    getters,
    actions
}
