<template>
    <div>
        play
        <SongTable :songs="playlist" class="table" stripe />
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
        }
    },
    computed: {
        ...mapState(['playlist'])
    },
    methods: {},
    created() {},
    mounted() {},
    components: { SongTable }
}
</script>

<style lang="scss" scoped>
</style>
