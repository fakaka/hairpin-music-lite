<template>
    <div class="header">
        <div class="left">
            <img alt="Vue logo" src="../assets/logo.png" />
        </div>
        <div class="center">
            header
        </div>
        <div class="right">
            <el-button type="text" icon="el-icon-close"> </el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {}
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    height: 50px;
    background: $main-color;

    .left {
        img {
            height: 100%;
        }
    }

    .center {
        flex-grow: 1;
    }
}
</style>
