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
import { mapGetters } from '@/store/helper/user'

export default {
    name: 'music-aside',
    props: {},
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['isLogin', 'menuPlaylist'])
    },
    methods: {},
    async created() {},
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
    background-color: var(--menu-bgcolor);

    .menu-warp {
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        .menu-block {
            margin: 8px 0;

            .menu-block-title {
                font-size: 12px;
                color: var(--font-color-grey2);
                padding-left: 16px;
                margin-bottom: 8px;
            }

            .menu-list {
                .menu-item {
                    @include text-ellipsis;
                    padding: 8px 18px;
                    cursor: pointer;

                    &:hover {
                        background: var(--menu-item-hover-bg);
                        color: $main-color;
                    }

                    &-active {
                        color: $main-color;
                        background: var(--menu-item-active-bg);
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
        padding: 8px 0;

        .menu-list {
            .menu-item {
                @include text-ellipsis;
                padding: 8px 18px;
                cursor: pointer;
                font-size: 13px;

                &:hover {
                    background: var(--menu-item-hover-bg);
                    color: $main-color;
                }

                &-active {
                    color: $main-color;
                    background: var(--menu-item-active-bg);

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
