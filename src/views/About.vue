<template>
    <div class="about">
        <h1>This is an about page</h1>
        版本 {{ version }}
    </div>
</template>
<script>
import config from '../../package.json'

export default {
    name: 'about',
    props: {},
    data() {
        return {
            version: config.version
        }
    },
    computed: {},
    methods: {},
    created() {},
    mounted() {},
    components: {}
}
</script>
