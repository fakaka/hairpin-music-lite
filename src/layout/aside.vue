<template>
    <div class="music-aside">
        <user-info></user-info>
        <div class="menu-warp-fixed">
            <ul class="menu-list">
                <router-link to="/play" active-class="menu-item-active" class="menu-item" tag="li">
                    <Icon :size="16" type="music" class="iconfont" />
                    <span class="menu-title">播放列表</span>
                </router-link>
                <router-link to="/playlist/3778678" active-class="menu-item-active" class="menu-item" tag="li">
                    <Icon :size="16" type="rank" class="iconfont" />
                    <span class="menu-title">热歌榜</span>
                </router-link>
            </ul>
            <!-- <router-link to="/about" active-class="menu-item-active" class="menu-item">排行榜</router-link> -->
        </div>
        <div class="menu-warp" v-if="menuPlaylist.length > 0">
            <div :key="index" class="menu-block" v-for="(menu, index) in menuPlaylist">
                <p class="menu-block-title" v-if="menu.title">{{ menu.title }}</p>
                <ul class="menu-list">
                    <router-link
                        :key="item.id"
                        :to="item.path"
                        active-class="menu-item-active"
                        class="menu-item"
                        tag="li"
                        v-for="item in menu.children"
                    >
                        <Icon :size="16" :type="item.meta.icon" class="iconfont" />
                        <span class="menu-title">{{ item.meta.title }}</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import UserInfo from '../components/user-info'
import { getUserPlaylist } from '../api/user'

export default {
    name: 'music-aside',
    props: {},
    data() {
        return {
            uid: 54034393,
            menuPlaylist: []
        }
    },
    computed: {},
    methods: {},
    async created() {
        const { playlist: userPlaylist } = await getUserPlaylist(this.uid)
        const retMenus = []
        const userCreateList = []
        const userCollectList = []

        userPlaylist.forEach((playlist) => {
            const { userId } = playlist
            if (this.uid === userId) {
                userCreateList.push(playlist)
            } else {
                userCollectList.push(playlist)
            }
        })

        const genPlaylistChildren = (playlist) =>
            playlist.map(({ id, name }) => ({
                id: id,
                path: `/playlist/${id}`,
                meta: {
                    title: name,
                    icon: 'playlist-menu'
                }
            }))

        if (userCreateList.length) {
            retMenus.push({
                type: 'playlist',
                title: '创建的歌单',
                children: genPlaylistChildren(userCreateList)
            })
        }

        if (userCollectList.length) {
            retMenus.push({
                type: 'playlist',
                title: '收藏的歌单',
                children: genPlaylistChildren(userCollectList)
            })
        }

        this.menuPlaylist = retMenus
    },
    mounted() {},
    components: {
        UserInfo
    }
}
</script>

<style lang="scss" scoped>
.music-aside {
    display: flex;
    flex-direction: column;
    width: 250px;

    .menu-warp {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: #4a4a4a;

        .menu-block {
            margin: 8px 0;

            .menu-block-title {
                font-size: 12px;
                color: #808080;
                padding-left: 16px;
                margin-bottom: 8px;
            }

            .menu-list {
                .menu-item {
                    @include text-ellipsis;
                    padding: 8px 18px;
                    cursor: pointer;

                    &:hover {
                        background: #e7e7e7;
                        color: $main-color;
                    }

                    &-active {
                        color: $main-color;
                        background: #e7e7e7;
                        box-shadow: inset 4px 0 rgba(33, 113, 218, 0.75);

                        i {
                            color: $main-color;
                        }
                    }

                    .iconfont {
                        font-size: 13px;
                    }

                    .menu-title {
                        font-size: 13px;
                        margin-left: 8px;
                    }
                }
            }
        }
    }

    .menu-warp-fixed {
        border-bottom: 1px solid #ececec;
        padding: 8px 0;

        .menu-list {
            .menu-item {
                @include text-ellipsis;
                padding: 8px 18px;
                cursor: pointer;
                font-size: 13px;

                &:hover {
                    background: #e7e7e7;
                    color: $main-color;
                }

                &-active {
                    color: $main-color;
                    background: #e7e7e7;

                    i {
                        color: $main-color;
                    }
                }

                .menu-title {
                    margin-left: 8px;
                }
            }
        }
    }
}
</style>
