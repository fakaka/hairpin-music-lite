<template>
    <div id="app">
        <el-config-provider size="small">
            <music-header></music-header>
            <div class="main">
                <music-aside></music-aside>
                <div class="content">
                    <router-view />
                </div>
                <music-playing></music-playing>
            </div>
            <music-footer></music-footer>
        </el-config-provider>
    </div>
</template>

<script>
import MusicHeader from './layout/header.vue'
import MusicAside from './layout/aside.vue'
import MusicPlaying from './layout/playing.vue'
import MusicFooter from './layout/footer.vue'

export default {
    name: 'app',
    components: {
        MusicHeader,
        MusicAside,
        MusicPlaying,
        MusicFooter
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;

    height: 100%;
    width: 100%;
    // color: $main-color;
    display: flex;
    flex-direction: column;
    background-color: var(--body-bgcolor);

    .main {
        flex-grow: 1;
        display: flex;
        height: calc(100% - 110px);

        .content {
            flex-grow: 1;
        }
    }
}
</style>
