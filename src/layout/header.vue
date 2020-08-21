<template>
    <div class="header">
        <div class="left">
            <img alt="Vue logo" src="../assets/logo-2.png" />
        </div>
        <div class="center">
            <span class="title" title="鹿鸣yoyo">
                <i>YOYO</i>
            </span>
            <div class="routes"></div>
        </div>
        <div class="right">
            <theme-chooser />
            <div class="setting-wrap" @click="toSetting">
                <Icon type="setting" :backdrop="true" />
            </div>
        </div>
    </div>
</template>

<script>
import ThemeChooser from '../components/theme-chooser'
export default {
    name: 'music-header',
    data() {
        return {}
    },
    methods: {
        toSetting() {
            this.$router.push('/setting')
        }
    },
    components: {
        ThemeChooser
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    height: 50px;
    background-color: var(--header-bgcolor);
    justify-content: space-between;
    align-items: center;
    padding-right: 18px;

    .left {
        height: 100%;
        padding: 0 12px;

        img {
            height: 100%;
        }
    }

    .center {
        flex-grow: 1;
        .title {
            // margin-left: 120px;
        }
    }

    .right {
        display: flex;
        align-items: center;

        .setting-wrap {
            margin: 0 16px;
            @include flex-center();
        }
    }
}
</style>
