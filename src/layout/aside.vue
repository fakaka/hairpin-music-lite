<template>
    <div class="music-aside">
        <user-info></user-info>
        <router-link to="/about">排行榜</router-link>
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
                        <!-- <Icon :size="16" :type="item.meta.icon" class="iconfont" /> -->
                        <span class="menu-title">{{ item.meta.title }}</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import UserInfo from '../components/user'
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
        color: #000;

        .menu-block {
            margin-bottom: 16px;

            .menu-block-title {
                // font-size: $font-size-sm;
                // color: var(--font-color-grey2);
                padding-left: 16px;
                margin-bottom: 8px;
            }

            .menu-list {
                .menu-item {
                    // @include text-ellipsis;
                    padding: 8px 18px;
                    cursor: pointer;

                    &:hover {
                        // background: var(--menu-item-hover-bg);
                        color: $main-color;
                    }

                    &-active {
                        color: $main-color;
                        // background: var(--menu-item-active-bg);

                        i {
                            color: $main-color;
                        }
                    }

                    .iconfont {
                        // font-size: $font-size-medium-sm;
                    }

                    .menu-title {
                        // font-size: $font-size-medium-sm;
                        margin-left: 8px;
                    }
                }
            }
        }
    }
}
</style>
