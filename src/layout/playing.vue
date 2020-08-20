<template>
    <div class="playing">
        <div class="cover">
            <img :src="currentSong.img" alt="" />
        </div>
        <div class="desc">
            <div class="name-wrap">
                <p class="name">{{ currentSong.name }}</p>
                <span @click="onGoMv" class="mv-tag" v-if="currentSong.mvId">MV</span>
            </div>
            <div class="artist-wrap">
                <span class="label">歌手：</span>
                <span class="value">{{ currentSong.artistsText }}</span>
            </div>
        </div>
        <div class="lrc-container">
            <div v-if="nolyric">还没有歌词哦~</div>
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
import LyricScroller from '../components/lyric-scroller'
export default {
    name: 'playing',
    props: {},
    data() {
        return {
            //
            currentSong: {
                id: 544070223,
                name: '探清水河',
                img: 'https://p1.music.126.net/MeRZ3CHrAv5eac_N_LDB2g==/109951163973460928.jpg',
                artists: [
                    {
                        id: 1138004,
                        name: '晓月老板',
                        tns: [],
                        alias: []
                    }
                ],
                duration: 304166,
                albumName: '探清水河',
                url: 'https://music.163.com/song/media/outer/url?id=544070223.mp3',
                artistsText: '晓月老板',
                durationSecond: 304.166,
                mvId: 0,
                alias: [],
                noCopyright: false
            },
            nolyric: false,
            lyric: [],
            lyricWithTranslation: [
                {
                    time: 0,
                    content: ' 作曲 : 周有才',
                    contents: [' 作曲 : 周有才']
                },
                {
                    time: 1,
                    content: ' 作词 : 周有才',
                    contents: [' 作词 : 周有才']
                },
                {
                    time: 29,
                    content: ' 这是一首简单的歌',
                    contents: [' 这是一首简单的歌']
                },
                {
                    time: 36,
                    content: ' 没有什么独特',
                    contents: [' 没有什么独特']
                },
                {
                    time: 42,
                    content: ' 试着代入我的心事',
                    contents: [' 试着代入我的心事']
                },
                {
                    time: 47,
                    content: ' 它那么幼稚',
                    contents: [' 它那么幼稚']
                },
                {
                    time: 51,
                    content: ' 像个顽皮的孩子',
                    contents: [' 像个顽皮的孩子']
                },
                {
                    time: 57,
                    content: ' 多么可笑的心事',
                    contents: [' 多么可笑的心事']
                },
                {
                    time: 63,
                    content: ' 只剩我还在坚持',
                    contents: [' 只剩我还在坚持']
                },
                {
                    time: 70,
                    content: ' 谁能看透我的眼睛',
                    contents: [' 谁能看透我的眼睛']
                },
                {
                    time: 76,
                    content: ' 让我能够不再失明',
                    contents: [' 让我能够不再失明']
                },
                {
                    time: 83,
                    content: ' 我要记住你的样子',
                    contents: [' 我要记住你的样子']
                },
                {
                    time: 90,
                    content: ' 像鱼记住水的拥抱',
                    contents: [' 像鱼记住水的拥抱']
                },
                {
                    time: 97,
                    content: ' 像云在天空中停靠',
                    contents: [' 像云在天空中停靠']
                },
                {
                    time: 102,
                    content: ' 夜晚的来到',
                    contents: [' 夜晚的来到']
                },
                {
                    time: 105,
                    content: ' 也不会忘了阳光的温暖',
                    contents: [' 也不会忘了阳光的温暖']
                },
                {
                    time: 111,
                    content: ' 我要忘了你的样子',
                    contents: [' 我要忘了你的样子']
                },
                {
                    time: 118,
                    content: ' 像鱼忘了海的味道',
                    contents: [' 像鱼忘了海的味道']
                },
                {
                    time: 124,
                    content: ' 放下所有梦和烦恼',
                    contents: [' 放下所有梦和烦恼']
                },
                {
                    time: 131,
                    content: ' 却放不下回忆的乞讨',
                    contents: [' 却放不下回忆的乞讨']
                },
                {
                    time: 167,
                    content: ' 多么可笑的心事',
                    contents: [' 多么可笑的心事']
                },
                {
                    time: 172,
                    content: ' 只剩我还在坚持',
                    contents: [' 只剩我还在坚持']
                },
                {
                    time: 179,
                    content: ' 谁能看透我的眼睛',
                    contents: [' 谁能看透我的眼睛']
                },
                {
                    time: 186,
                    content: ' 让我能够不再失明',
                    contents: [' 让我能够不再失明']
                },
                {
                    time: 193,
                    content: ' 记住你的样子',
                    contents: [' 记住你的样子']
                },
                {
                    time: 200,
                    content: ' 像鱼记住水的拥抱',
                    contents: [' 像鱼记住水的拥抱']
                },
                {
                    time: 207,
                    content: ' 像云在天空中停靠',
                    contents: [' 像云在天空中停靠']
                },
                {
                    time: 212,
                    content: ' 夜晚的来到',
                    contents: [' 夜晚的来到']
                },
                {
                    time: 215,
                    content: ' 也不会忘了阳光的温暖',
                    contents: [' 也不会忘了阳光的温暖']
                },
                {
                    time: 220,
                    content: ' 我要忘了你的样子',
                    contents: [' 我要忘了你的样子']
                },
                {
                    time: 227,
                    content: ' 像鱼忘了海的味道',
                    contents: [' 像鱼忘了海的味道']
                },
                {
                    time: 234,
                    content: ' 放下所有梦和烦恼',
                    contents: [' 放下所有梦和烦恼']
                },
                {
                    time: 241,
                    content: ' 却放不下回忆的乞讨',
                    contents: [' 却放不下回忆的乞讨']
                },
                {
                    time: 247,
                    content: ' 只剩自己就好',
                    contents: [' 只剩自己就好']
                }
            ]
        }
    },
    computed: {},
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
        getActiveCls(index) {
            return this.activeLyricIndex === index ? 'active' : ''
        }
    },
    created() {},
    mounted() {},
    components: { LyricScroller }
}
</script>

<style lang="scss" scoped>
.playing {
    padding: 12px;
    width: 350px;
    text-align: center;

    .cover {
        img {
            width: 160px;
            border-radius: 2px;
        }
    }
    .desc {
        font-size: 14px;
    }

    .lrc-container {
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
                    color: var(--font-color-white);
                    // font-weight: $font-weight-bold;
                }

                .lyric-text {
                    margin-bottom: 8px;
                }
            }
        }
    }
}
</style>
