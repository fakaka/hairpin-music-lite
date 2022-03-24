import { isDef } from '@/utils/music'
import { playModeMap } from '@/utils/config'

export default {
    currentIndex(state) {
        const { currentSong, playlist } = state
        return playlist.findIndex(({ id }) => id === currentSong.id)
    },
    nextSong(state) {
        const { playlist, playMode } = state
        const nextStratMap = {
            [playModeMap.sequence.code]: getSequenceNextIndex,
            [playModeMap.loop.code]: getLoopNextIndex,
            [playModeMap.random.code]: getRandomNextIndex
        }
        const getNextStrat = nextStratMap[playMode]
        const index = getNextStrat()

        return playlist[index]

        // 顺序
        function getSequenceNextIndex() {
            let nextIndex = currentIndex(state) + 1
            if (nextIndex > playlist.length - 1) {
                nextIndex = 0
            }
            return nextIndex
        }

        // 随机
        function getRandomNextIndex() {
            return getRandomIndex(playlist, currentIndex(state))
        }

        // 单曲
        function getLoopNextIndex() {
            return currentIndex(state)
        }
    },
    prevSong(state, getters) {
        const { playlist, playMode } = state
        const prevStratMap = {
            [playModeMap.sequence.code]: genSequencePrevIndex,
            [playModeMap.loop.code]: getLoopPrevIndex,
            [playModeMap.random.code]: getRandomPrevIndex
        }
        const getPrevStrat = prevStratMap[playMode]
        const index = getPrevStrat()

        return playlist[index]

        function genSequencePrevIndex() {
            let prevIndex = currentIndex(state) - 1
            if (prevIndex < 0) {
                prevIndex = playlist.length - 1
            }
            return prevIndex
        }

        function getLoopPrevIndex() {
            return currentIndex(state)
        }

        function getRandomPrevIndex() {
            return getRandomIndex(playlist, getters.currentIndex)
        }
    },
    // 当前是否有歌曲在播放
    hasCurrentSong(state) {
        return isDef(state.currentSong.id)
    }
}

function getRandomIndex(playlist, currentIndex) {
    // 防止无限循环
    if (playlist.length === 1) {
        return currentIndex
    }
    let index = Math.round(Math.random() * (playlist.length - 1))
    if (index === currentIndex) {
        index = getRandomIndex(playlist, currentIndex)
    }
    return index
}
