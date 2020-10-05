<script>
import ElTable from 'element-ui/lib/table'
import HighlightText from './HighlightText'
import { mapMutations, mapActions, mapState } from '@/store/helper/music'
import { pad, genImgUrl, formatTime } from '../utils/music'

export default {
    props: {
        hideColumns: {
            type: Array,
            default: () => ['operate']
        },
        songs: {
            type: Array,
            default: () => []
        },
        highlightText: {
            type: String,
            default: ''
        },
        // 名字下面渲染的额外内容
        renderNameDesc: {
            type: Function
        }
    },
    data() {
        const commonHighLightSlotScopes = {
            default: (scope) => {
                const text = scope.row[scope.column.property]
                return <HighlightText class="song-table-name" text={text} highlightText={this.highlightText} />
            }
        }
        return {
            columns: [
                {
                    prop: 'index',
                    label: '',
                    width: '50',
                    scopedSlots: {
                        default: (scope) => {
                            return (
                                <div class="index-wrap">
                                    {this.isActiveSong(scope.row) ? (
                                        <Icon class="horn" type="horn" color="theme" />
                                    ) : (
                                        // 补上左边的0
                                        <span>{pad(scope.$index + 1)}</span>
                                    )}
                                </div>
                            )
                        }
                    }
                },
                {
                    prop: 'img',
                    label: ' ',
                    width: '100',
                    scopedSlots: {
                        default: (scope) => {
                            return (
                                <div class="img-wrap">
                                    <img v-lazy={genImgUrl(scope.row.img, 120)} />
                                    <div class="play-icon-wrap">
                                        <Icon class="play-icon" type="play" />
                                    </div>
                                </div>
                            )
                        }
                    }
                },
                {
                    prop: 'name',
                    label: '音乐标题',
                    minWidth: '160',
                    className: 'title-td',
                    scopedSlots: {
                        default: (scope) => {
                            const {
                                row: { name, noCopyright }
                            } = scope

                            return (
                                <div>
                                    <div class="song-table-name-cell">
                                        <HighlightText
                                            class={['song-table-name', noCopyright ? 'nocopyright' : '']}
                                            text={name}
                                            highlightText={this.highlightText}
                                        />
                                    </div>

                                    {this.renderNameDesc ? this.renderNameDesc(scope) : null}
                                </div>
                            )
                        }
                    }
                },
                {
                    prop: 'artistsText',
                    label: '歌手',
                    scopedSlots: commonHighLightSlotScopes
                },
                {
                    prop: 'albumName',
                    label: '专辑',
                    scopedSlots: commonHighLightSlotScopes
                },
                {
                    prop: 'durationSecond',
                    label: '时长',
                    width: '100',
                    scopedSlots: {
                        default: (scope) => {
                            return <span>{formatTime(scope.row.durationSecond)}</span>
                        }
                    }
                },
                {
                    prop: 'operate',
                    label: '操作',
                    width: '100',
                    scopedSlots: {
                        default: () => {
                            return <span class="operate">删除</span>
                        }
                    }
                }
            ]
        }
    },
    methods: {
        onRowClick(song) {
            this.startSong(song)
            this.setPlaylist(this.songs)
        },
        isActiveSong(song) {
            return song.id === this.currentSong.id
        },
        tableCellClassName(args) {
            const { row, columnIndex } = args
            const cellClassNameProp = this.$attrs.cellClassName

            let retCls = []
            // 执行外部传入的方法
            if (cellClassNameProp) {
                const propRet = cellClassNameProp(args)
                if (propRet) {
                    retCls.push(propRet)
                }
            }
            if (this.isActiveSong(row) && columnIndex === this.showColumns.findIndex(({ prop }) => prop === 'name')) {
                retCls.push('song-active')
            }
            return retCls.join(' ')
        },
        removeSong(row, column) {
            if (column && column.label == '操作') {
                this.$emit('remove-song', row)
            }
        },
        ...mapMutations(['setPlaylist']),
        ...mapActions(['startSong'])
    },
    computed: {
        showColumns() {
            const hideColumns = this.hideColumns.slice()
            const reference = this.songs[0]
            const { img } = reference
            if (!img) {
                hideColumns.push('img')
            }
            return this.columns.filter((column) => {
                return !hideColumns.find((hideColumn) => hideColumn === column.prop)
            })
        },
        ...mapState(['currentSong'])
    },
    render() {
        const elTableProps = ElTable.props
        // 从$attrs里提取作为prop的值
        const { props, attrs } = genPropsAndAttrs(this.$attrs, elTableProps)
        const tableAttrs = {
            attrs,
            on: {
                ...this.$listeners,
                ['row-click']: this.removeSong,
                ['row-dblclick']: this.onRowClick
            },
            props: {
                ...props,
                cellClassName: this.tableCellClassName,
                headerCellClassName: 'title-th',
                data: this.songs
            }
        }
        return this.songs.length ? (
            <el-table class="song-table" {...tableAttrs}>
                {this.showColumns.map((column, index) => {
                    const { scopedSlots, ...columnProps } = column
                    return <el-table-column key={index} props={columnProps} scopedSlots={scopedSlots}></el-table-column>
                })}
            </el-table>
        ) : !this.highlightText ? (
            <div class="list-empty">快去收藏你喜欢的音乐吧</div>
        ) : null
    }
}

function genPropsAndAttrs(rawAttrs, componentProps) {
    const props = {}
    const attrs = {}
    Object.keys(rawAttrs).forEach((key) => {
        const value = rawAttrs[key]
        if (componentProps.hasOwnProperty(key)) {
            props[key] = value
        } else {
            attrs[key] = value
        }
    })
    return { props, attrs }
}
</script>

<style lang="scss">
.el-table .cell {
    white-space: nowrap;
}
.song-table {
    .title-th {
        color: var(--font-color-grey2);
        font-weight: normal;
    }

    .title-td {
        color: var(--font-color-white);
    }

    .padding-space {
        padding-left: 24px;
    }

    .song-active {
        color: $theme-color;
    }

    .index-wrap {
        text-align: center;
        color: var(--font-color-grey-shallow);
    }

    .img-wrap {
        position: relative;
        @include img-wrap(50px);

        img {
            border-radius: 4px;
        }

        &:hover .play-icon-wrap {
            @include abs-center;
            @include flex-center();
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);

            .play-icon {
                color: $theme-color;
            }
        }
    }

    .song-table-name-cell {
        @include text-ellipsis;
        display: flex;
        align-items: center;
        flex: 0 0 24px;

        .song-table-name {
            overflow: hidden;
            @include text-ellipsis;

            &.nocopyright {
                color: #bebebe;
            }
        }
    }

    .operate {
        cursor: pointer;

        &:hover {
            color: $theme-color;
        }
    }
}
.list-empty {
    text-align: center;
    margin-top: 50px;
    font-size: 13px;
}
</style>
