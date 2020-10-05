<template>
    <div class="play">
        <div class="tabs-wrap">
            <div @click="clearAll" class="n-button">
                <Icon class="icon middle" color="white" type="play-round" />
                <span class="middle">清除全部 ({{ playlist.length }})</span>
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
        <SongTable :songs="playlist" class="table" stripe :hideColumns="hideColumns" @remove-song="removeSong" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from '@/store/helper/music'
import SongTable from '../components/song-table'

export default {
    name: 'play',
    props: {},
    data() {
        return {
            //
            inputFocus: false,
            searchValue: '',
            hideColumns: []
        }
    },
    computed: {
        ...mapState(['playlist'])
    },
    methods: {
        onInputFocus() {
            this.inputFocus = true
        },
        onInputBlur() {
            this.inputFocus = false
        },
        getInputCls() {
            return this.inputFocus ? '' : 'inactive'
        },
        removeSong(song) {
            console.log(song)
            this.removeSong(song)
        },
        clearAll() {
            this.clearPlaylist()
        },
        ...mapActions(['clearPlaylist', 'removeSong'])
    },
    created() {},
    mounted() {},
    components: { SongTable }
}
</script>

<style lang="scss" scoped>
.play {
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
                    ::v-deep .el-input__inner {
                        background: transparent !important;
                    }
                }
            }
        }
    }
}
</style>
