<template>
    <div class="music-footer">
        <music-player></music-player>
    </div>
</template>

<script>
import MusicPlayer from '../components/music-player'
export default {
    name: 'music-footer',
    props: {},
    data() {
        return {
            //
        }
    },
    computed: {},
    methods: {},
    created() {},
    mounted() {},
    components: { MusicPlayer }
}
</script>

<style lang="scss" scoped>
.music-footer {
    height: 60px;
    background: $main-color;
}
</style>
