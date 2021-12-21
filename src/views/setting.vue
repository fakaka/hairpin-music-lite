<template>
    <div class="setting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="关于" name="about">
                <p>网页播放器</p>
                版本 {{ version }}
                <p>
                    {{ new Date().toLocaleString() }}
                </p>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import config from '../../package.json'

export default {
    name: 'setting',
    props: {},
    data() {
        return {
            activeName: 'about',
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

<style lang="scss" scoped>
.setting {
    padding: 0 16px;
}
</style>
