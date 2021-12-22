<template>
    <div class="playing">
        <div class="cover">
            <img :src="currentSong.img" alt="cover" v-if="currentSong.img" />
            <img v-else src="../assets/logo.png" alt="cover" />
        </div>
        <div class="desc" v-show="currentSong.id">
            <div class="name-wrap">
                <p class="name">{{ currentSong.name }}</p>
            </div>
            <div class="artist-wrap">
                <span class="label">歌手：</span>
                <span class="value">{{ currentSong.artistsText }}</span>
            </div>
        </div>
        <div class="lrc-container">
            <div v-if="nolyric" class="nolyric">还没有歌词哦~</div>
            <LyricScroller
                :data="lyric"
                :options="{ disableTouch: true }"
                @init="onInitScroller"
                class="lyric-wrap"
                ref="scroller"
                v-else
            >
                <div>
                    <div
                        v-for="(l, index) in lyricWithTranslation"
                        :key="index"
                        :class="getActiveCls(index)"
                        class="lyric-item"
                        ref="lyric"
                    >
                        <p :key="contentIndex" class="lyric-text" v-for="(content, contentIndex) in l.contents">
                            {{ content }}
                        </p>
                    </div>
                </div>
            </LyricScroller>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from '@/store/helper/music'
import LyricScroller from '../components/lyric-scroller.vue'
import { getLyric } from '../api/song'
import lyricParser from '../utils/lrcparser'
import { isDef, isUndef } from '../utils/common'

export default {
    name: 'playing',
    props: {},
    data() {
        return {
            nolyric: false,
            lyric: []
        }
    },
    computed: {
        activeLyricIndex() {
            return this.lyricWithTranslation
                ? this.lyricWithTranslation.findIndex((l, index) => {
                      const nextLyric = this.lyricWithTranslation[index + 1]
                      return this.currentTime >= l.time && (nextLyric ? this.currentTime < nextLyric.time : true)
                  })
                : -1
        },
        lyricWithTranslation() {
            let ret = []
            // 空内容的去除
            const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content))
            // content统一转换数组形式
            if (lyricFiltered.length) {
                lyricFiltered.forEach((l) => {
                    const { time, content } = l
                    const lyricItem = { time, content, contents: [content] }
                    const sameTimeTLyric = this.tlyric.find(({ time: tLyricTime }) => tLyricTime === time)
                    if (sameTimeTLyric) {
                        const { content: tLyricContent } = sameTimeTLyric
                        if (content) {
                            lyricItem.contents.push(tLyricContent)
                        }
                    }
                    ret.push(lyricItem)
                })
            } else {
                ret = lyricFiltered.map(({ time, content }) => ({
                    time,
                    content,
                    contents: [content]
                }))
            }
            return ret
        },
        ...mapState(['currentSong', 'currentTime'])
    },
    watch: {
        currentSong(newSong, oldSong) {
            if (!newSong.id) {
                this.lyric = []
                return
            }
            if (newSong.id === oldSong.id) {
                return
            }
            this.updateLyric()
        },
        activeLyricIndex(newIndex, oldIndex) {
            this.scrollToActiveLyric()
        }
    },
    methods: {
        onInitScroller() {
            // const onScrollStart = (type) => {
            //     this.clearTimer(type)
            //     this.lyricScrolling[type] = true
            // }
            // const onScrollEnd = (type) => {
            //     // 滚动结束后两秒 歌词开始自动滚动
            //     this.clearTimer(type)
            //     this.lyricTimer[type] = setTimeout(() => {
            //         this.lyricScrolling[type] = false
            //     }, AUTO_SCROLL_RECOVER_TIME)
            // }
            // scoller.on('scrollStart', onScrollStart.bind(null, SCROLL_TYPE))
            // scoller.on('mousewheelStart', onScrollStart.bind(null, WHEEL_TYPE))
            // scoller.on('scrollEnd', onScrollEnd.bind(null, SCROLL_TYPE))
            // scoller.on('mousewheelEnd', onScrollEnd.bind(null, WHEEL_TYPE))
        },
        scrollToActiveLyric() {
            if (this.activeLyricIndex !== -1) {
                const { scroller, lyric } = this.$refs
                if (lyric && lyric[this.activeLyricIndex]) {
                    scroller.getScroller().scrollToElement(lyric[this.activeLyricIndex], 300, 0, true)
                }
            }
        },
        getActiveCls(index) {
            return this.activeLyricIndex === index ? 'active' : ''
        },
        async updateLyric() {
            const result = await getLyric(this.currentSong.id)
            this.nolyric = isUndef(result.lrc) || !result.lrc.lyric
            if (!this.nolyric) {
                const { lyric, tlyric } = lyricParser(result)
                this.lyric = lyric
                this.tlyric = tlyric
            }
        }
    },
    created() {},
    mounted() {
        if (this.currentSong.id) {
            this.updateLyric()
        }
    },
    components: { LyricScroller }
}
</script>

<style lang="scss" scoped>
.playing {
    padding: 12px;
    width: 350px;
    text-align: center;
    background-color: var(--menu-bgcolor);

    .cover {
        img {
            width: 160px;
            border-radius: 2px;
        }
    }
    .desc {
        font-size: 14px;

        .name-wrap {
            line-height: 30px;
            @include text-ellipsis();
        }
    }

    .lrc-container {
        position: relative;
        height: calc(100% - 220px);

        .lyric-wrap {
            height: 100%;
            margin-top: 16px;
            mask-image: linear-gradient(
                180deg,
                hsla(0, 0%, 100%, 0) 0,
                hsla(0, 0%, 100%, 0.6) 5%,
                #fff 25%,
                #fff 75%,
                hsla(0, 0%, 100%, 0.6) 95%,
                hsla(0, 0%, 100%, 0)
            );

            .lyric-item {
                margin-bottom: 16px;
                font-size: 12px;

                &.active {
                    font-size: 12px;
                    color: $theme-color;
                    font-weight: 700;
                }

                .lyric-text {
                    margin-bottom: 8px;
                }
            }
        }

        .nolyric {
            font-size: 14px;
            @include abs-center();
        }
    }
}
</style>
