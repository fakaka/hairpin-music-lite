// 歌单详情页面
<template>
    <div class="playlist-detail" v-if="playlist.id">
        <div class="tabs-wrap">
            <div class="button-group">
                <div @click="playAll" class="n-button">
                    <Icon class="icon middle" color="white" type="play-round" />
                    <span class="middle">播放全部 ({{ songs.length }})</span>
                </div>
                <div @click="addAll" class="n-button plus-button">
                    <i class="el-icon-plus" />
                </div>
            </div>
            <div @click="openLocal" class="n-button">
                <span class="middle">本地打开</span>
            </div>

            <el-input
                :class="getInputCls()"
                @blur="onInputBlur"
                @focus="onInputFocus"
                class="input"
                placeholder="搜索歌单音乐"
                prefix-icon="el-icon-search"
                v-model="searchValue"
            ></el-input>
        </div>
        <div class="empty" v-if="searchValue && !filteredSongs.length">
            未能找到和 <span class="keyword">“{{ searchValue }}”</span> 相关的任何音乐
        </div>
        <SongTable
            :highlightText="searchValue"
            :songs="filteredSongs"
            :renderNameDesc="renderNameDesc"
            class="table"
            stripe
        />
    </div>
</template>

<script lang="jsx">
import { mapActions, mapMutations } from '@/store/helper/music.js'
import SongTable from '../components/song-table.vue'
import { createSong, scrollInto } from '../utils/music'
import { getListDetail, getSongDetail } from '../api/song'

const MAX = 500
export default {
    async created() {},
    data() {
        return {
            tabs: ['歌曲列表', '评论'],
            playlist: {},
            songs: [],
            searchValue: '',
            inputFocus: false
        }
    },
    methods: {
        async init() {
            const { playlist } = await getListDetail({ id: this.id })
            this.playlist = playlist
            this.genSonglist(playlist)
        },
        async genSonglist(playlist) {
            const trackIds = playlist.trackIds.map(({ id }) => id)
            if (trackIds.length == 0) {
                this.songs = []
                return
            }
            const songDetails = await getSongDetail(trackIds.slice(0, MAX))
            const songs = songDetails.songs.map(({ id, name, alia, al, ar, mv, dt }) => {
                let privilege = songDetails.privileges.find((p) => id == p.id)
                return createSong({
                    id,
                    name,
                    alias: alia,
                    artists: ar,
                    duration: dt,
                    mvId: mv,
                    albumName: al.name,
                    img: al.picUrl,
                    noCopyright: privilege.st == -200
                })
            })
            this.songs = songs
        },
        playAll() {
            this.startSong(this.songs[0])
            this.setPlaylist(this.songs)
        },
        addAll() {
            this.addPlaylist(this.songs)
        },
        openLocal() {
            let pid = this.playlist.id
            window.open('music://./share/163?playlistId=' + pid)
        },
        onInputFocus() {
            this.inputFocus = true
        },
        onInputBlur() {
            this.inputFocus = false
        },
        getInputCls() {
            return this.inputFocus ? '' : 'inactive'
        },
        scrollToHeader() {
            let domTab = document.querySelector('.tabs-wrap')
            if (domTab) {
                scrollInto(document.querySelector('.tabs-wrap'))
            }
        },
        renderNameDesc(scope) {
            const { alias } = scope.row
            if (alias && alias.length > 0) {
                // return <span title={alias[0]} class="name-desc">{alias[0]}</span>
                return <span class="name-desc">{alias[0]}</span>
            }
        },
        ...mapMutations(['setPlaylist', 'addPlaylist']),
        ...mapActions(['startSong'])
    },
    computed: {
        id() {
            return Number(this.$route.params.id)
        },
        filteredSongs() {
            return this.songs.filter(({ name, artistsText, albumName }) =>
                `${name}${artistsText}${albumName}`.toLowerCase().includes(this.searchValue.toLowerCase())
            )
        }
    },
    watch: {
        id: {
            handler() {
                this.searchValue = ''
                this.init()
                this.scrollToHeader()
            },
            immediate: true
        }
    },
    components: {
        // DetailHeader,
        SongTable
    }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
    width: 100%;
    height: 100%;
    overflow: auto;

    .tabs-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 24px;
        padding-top: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border);

        .n-button {
            font-size: 13px;
            display: inline-block;
            padding: 4px 12px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            vertical-align: bottom;
            background: linear-gradient(to right, #4074c7, #2c5dbd, #2f5daf);
            color: #fff;
            border: none;

            .icon {
                margin-right: 4px;
            }

            &:hover {
                // background: var(--button-hover-bgcolor);
                background: #4074c7;
            }

            .middle {
                vertical-align: middle;
            }
        }

        .plus-button {
            line-height: 18px;
            background: $theme-color;
        }

        .button-group {
            display: inline-block;

            .n-button {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                // height: 28px;
            }

            .n-button + .n-button {
                border-radius: 0;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
        .button-group + .n-button {
            margin-left: 4px;
        }

        .input {
            width: 125px;
            margin-left: auto;

            &:not(:hover) {
                &.inactive {
                    :deep(.el-input__inner) {
                        background: transparent !important;
                    }
                }
            }
        }
    }

    .name-desc {
        display: block;
        margin-top: 5px;
        color: var(--font-color-grey-shallow);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .empty {
        @include flex-center;
        height: 200px;

        .keyword {
            color: $theme-color;
        }
    }

    .comments {
        padding: 16px 32px;
    }
}
</style>
