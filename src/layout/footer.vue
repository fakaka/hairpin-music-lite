<template>
    <div class="music-footer">
        <player></player>
    </div>
</template>

<script>
import Player from '../components/mini-player'
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
    components: { Player }
}
</script>

<style lang="scss" scoped>
.music-footer {
    height: 60px;
    background: $main-color;
}
</style>
