// 歌单详情页面
<template>
    <div class="playlist-detail" v-if="playlist.id">
        <!-- <DetailHeader ref="header" :playlist="playlist" :songs="songs" /> -->
        <div class="tabs-wrap">
            <div>
                <el-button @click="playAll" class="button">
                    <Icon class="icon middle" color="white" type="play-round" />
                    <span class="middle">播放全部 ({{ songs.length }})</span>
                </el-button>
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

<script>
// import DetailHeader from './header'
import SongTable from '../components/song-table'
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
            
        },
        onInputFocus() {
            this.inputFocus = true
        },
        onInputBlur() {
            this.inputFocus = false
        },
        getInputCls() {
            return !this.inputFocus ? 'inactive' : ''
        },
        scrollToHeader() {
            const { header } = this.$refs
            if (header) {
                scrollInto(header.$el)
            }
        },
        renderNameDesc(scope) {
            const { alias } = scope.row
            if (alias && alias.length > 0) {
                // return <span title={alias[0]} class="name-desc">{alias[0]}</span>
                return <span class="name-desc">{alias[0]}</span>
            }
        }
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
    overflow: auto;
    height: 100%;

    .tabs-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 24px;
        border-bottom: 1px solid var(--border);

        .input {
            width: 125px;

            &:not(:hover) {
                &.inactive {
                    ::v-deep .el-input__inner {
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
        // @include flex-center;
        height: 200px;

        .keyword {
            color: blue;
        }
    }

    .comments {
        padding: 16px 32px;
    }
}
</style>
