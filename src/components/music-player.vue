// 底部播放栏组件
<template>
    <div class="music-player" id="music-player">
        <!-- 歌曲内容 -->
        <div class="song">
            <template v-if="hasCurrentSong">
                <div @click="togglePlayerShow" class="img-wrap">
                    <img v-lazy="currentSong.img" class="blur" />
                    <!-- <div class="player-control">
                        <Icon :size="24" :type="playControlIcon" color="white" />
                    </div> -->
                </div>
                <div class="content">
                    <div class="top">
                        <p class="name">{{ currentSong.name }}</p>
                        <p class="split">-</p>
                        <p class="artists">{{ currentSong.artistsText }}</p>
                    </div>
                    <div class="time">
                        <span class="played-time">{{ formatTime(currentTime) }}</span>
                        <span class="split">/</span>
                        <span class="total-time">{{ formatTime(currentSong.duration / 1000) }}</span>
                    </div>
                </div>
            </template>
        </div>
        <!-- 控制台 -->
        <div class="control">
            <Icon :size="24" @click="prev" class="icon" type="prev" />
            <el-popover :value="isPlayErrorPromptShow" placement="top" trigger="manual" width="160">
                <p>请点击开始播放。</p>
                <div @click="togglePlaying" class="play-icon" slot="reference">
                    <Icon :size="24" :type="playIcon" />
                </div>
            </el-popover>

            <Icon :size="24" @click="next" class="icon" type="next" />
        </div>

        <div class="mode">
            <!-- <Share :shareUrl="shareUrl" class="mode-item" v-show="hasCurrentSong" /> -->

            <!-- 模式 -->
            <el-tooltip placement="top" :content="playModeText" effect="light">
                <Icon :size="20" :type="modeIcon" @click="onChangePlayMode" class="mode-item" />
            </el-tooltip>
            <!-- 音量 -->
            <div class="volume-item">
                <!-- <Volume :volume="volume" @volumeChange="onVolumeChange" /> -->
                <Icon :size="20" :type="getIconType()" @click="toggleSilence" class="icon" />
                <el-slider :disabled="isSilence" v-model="volume" @change="onVolumeChange"></el-slider>
            </div>
            <!-- github -->
            <Icon :size="20" @click="goGitHub" class="mode-item" type="github" />
        </div>
        <div class="progress-bar-wrap">
            <ProgressBar :disabled="!hasCurrentSong" :percent="playedPercent" @percentChange="onProgressChange" />
        </div>
        <audio
            :src="currentSong.url"
            @canplay="ready"
            @ended="end"
            @timeupdate="updateTime"
            @error="error"
            ref="audio"
        ></audio>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapGetters, mapActions } from '@/store/helper/music'
import Storage from 'good-storage'
// import Share from '@/components/share'
import { isDef, pad } from '../utils/music'
import { playModeMap, VOLUME_KEY } from '../utils/config'

const DEFAULT_VOLUME = 75
export default {
    name: 'music-player',
    data() {
        return {
            isPlayErrorPromptShow: false,
            songReady: false,
            volume: Storage.get(VOLUME_KEY, DEFAULT_VOLUME),
            lastVolume: 0,
            isSilence: false
        }
    },
    created() {},
    mounted() {
        this.audio.volume = this.volume / 100
    },
    methods: {
        formatTime(interval) {
            interval = interval | 0
            const minute = pad((interval / 60) | 0)
            const second = pad(interval % 60)
            return `${minute}:${second}`
        },
        togglePlaying() {
            if (this.currentSong.id) {
                this.setPlayingState(!this.playing)
            }
        },
        ready() {
            this.songReady = true
        },
        async play() {
            if (!this.songReady) {
                return
            }
            try {
                await this.audio.play()
                if (this.isPlayErrorPromptShow) {
                    this.isPlayErrorPromptShow = false
                }
            } catch (error) {
                // 提示用户手动播放
                this.isPlayErrorPromptShow = true
                this.setPlayingState(false)
            }
        },
        pause() {
            this.audio.pause()
        },
        updateTime(e) {
            const time = e.target.currentTime
            this.setCurrentTime(time)
        },
        error(err) {
            this.$message('播放失败，可能无版权，准备播放下一首')
            this.songReady = true
            this.next()
        },
        prev() {
            if (this.songReady) {
                this.startSong(this.prevSong)
            }
        },
        next() {
            if (this.songReady) {
                this.startSong(this.nextSong)
            }
        },
        end() {
            this.next()
        },
        onProgressChange(percent) {
            this.audio.currentTime = this.currentSong.durationSecond * percent
            this.setPlayingState(true)
        },
        getIconType() {
            return this.isSilence ? 'silence' : 'horn'
        },
        toggleSilence() {
            if (this.isSilence) {
                this.volume = this.lastVolume
            } else {
                this.lastVolume = this.volume
                this.volume = 0
            }
            this.isSilence = !this.isSilence
        },
        onVolumeChange(volume) {
            this.audio.volume = volume / 100
            Storage.set(VOLUME_KEY, volume)
        },
        onChangePlayMode() {
            const modeKeys = Object.keys(playModeMap)
            const currentModeIndex = modeKeys.findIndex((key) => playModeMap[key].code === this.playMode)
            const nextIndex = (currentModeIndex + 1) % modeKeys.length
            const nextModeKey = modeKeys[nextIndex]
            const nextMode = playModeMap[nextModeKey]
            this.setPlayMode(nextMode.code)
        },
        togglePlayerShow() {
            this.setPlayerShow(!this.isPlayerShow)
        },
        goGitHub() {
            window.open('https://github.com/fakaka/hairpin-music-lite')
        },
        ...mapMutations(['setCurrentTime', 'setPlayingState', 'setPlayMode', 'setPlaylistShow', 'setPlayerShow']),
        ...mapActions(['startSong'])
    },
    watch: {
        currentSong(newSong, oldSong) {
            // 清空了歌曲
            if (!newSong.id) {
                this.audio.pause()
                this.audio.currentTime = 0
                return
            }
            // 单曲循环
            if (oldSong && newSong.id === oldSong.id) {
                this.setCurrentTime(0)
                this.audio.currentTime = 0
                this.play()
                return
            }
            this.songReady = false
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.play()
            }, 1000)
        },
        playing(newPlaying) {
            this.$nextTick(() => {
                newPlaying ? this.play() : this.pause()
            })
        }
    },
    computed: {
        hasCurrentSong() {
            return isDef(this.currentSong.id)
        },
        playIcon() {
            return this.playing ? 'pause' : 'play'
        },
        currentMode() {
            return playModeMap[this.playMode]
        },
        modeIcon() {
            return this.currentMode.icon
        },
        playModeText() {
            return this.currentMode.name
        },
        audio() {
            return this.$refs.audio
        },
        // 播放的进度百分比
        playedPercent() {
            const { durationSecond } = this.currentSong
            return Math.min(this.currentTime / durationSecond, 1) || 0
        },
        playControlIcon() {
            return this.isPlayerShow ? 'shrink' : 'open'
        },
        shareUrl() {
            /**
             * /share/163/musicId=123
             * /share/qq/playlistId=123
             *
             */
            return `${window.location.origin}/share/163?musicId=${this.currentSong.id}`
        },
        ...mapState([
            'currentSong',
            'currentTime',
            'playing',
            'playMode'
            //     'isPlaylistPromptShow',
            //     'isPlayerShow'
        ]),
        ...mapGetters(['prevSong', 'nextSong'])
    }
    // components: { Share }
}
</script>

<style lang="scss" scoped>
.music-player {
    position: relative;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 8px 16px;
    padding-right: 24px;
    background: var(--body-bgcolor);

    .song {
        display: flex;
        flex: 4;
        overflow: hidden;

        .img-wrap {
            position: relative;
            margin-right: 8px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            @include img-wrap(40px);

            img {
                transition-duration: 0.3s;
            }

            // .player-control {
            //     @include abs-center;
            //     transition-duration: 0.3s;
            //     display: none;
            // }

            // &:hover {
            //     img {
            //         filter: blur(2px);
            //     }

            //     .player-control {
            //         display: block;
            //     }
            // }
        }

        .content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .top {
                display: flex;
                align-items: flex-end;
                white-space: nowrap;

                .name {
                    color: var(--font-color-white);
                    @include text-ellipsis;
                }

                .split {
                    font-size: 12px;
                    margin: 0 4px;
                }

                .artists {
                    font-size: 12px;
                    @include text-ellipsis;
                }
            }

            .time {
                font-size: 12px;
                color: var(--font-color-grey);

                .split {
                    margin: 0 4px;
                }
            }
        }
    }

    .control {
        position: absolute;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        @include flex-center();

        .play-icon {
            @include flex-center();
            position: relative;
            width: 45px;
            height: 45px;
            margin: 0 16px;
            border-radius: 50%;
            background: $theme-color;
            cursor: pointer;

            i {
                color: #fff;
            }
            .icon-play {
                transform: translateX(1px);
            }
        }

        .icon {
            color: $theme-color;
        }
    }

    .mode {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 6;

        .mode-item {
            display: block;
            margin-right: 16px;
            width: 22px;
        }

        .volume-item {
            width: 160px;
            margin-right: 22px;
            display: flex;
            align-items: center;

            .el-slider {
                margin-left: 12px;
                width: 130px;

                ::v-deep .el-slider__runway {
                    height: 4px;
                    background-color: var(--progress-bgcolor);

                    .el-slider__bar {
                        height: 4px;
                    }

                    .el-slider__button-wrapper {
                        height: 32px;
                        width: 32px;
                        top: -14px;

                        .el-slider__button {
                            width: 12px;
                            height: 12px;
                            border-color: #409eff;
                            background-color: #409eff;
                        }
                    }
                }
            }
        }
    }

    .progress-bar-wrap {
        position: absolute;
        left: 0;
        right: 0;
        top: -14px;
    }
}

.icon {
    color: var(--font-color);
    cursor: pointer;
}

.el-popover {
    min-width: 90px;
    padding: 10px;
}
</style>
