<template>
    <div class="header">
        <div class="left">
            <img alt="YOYO logo" src="../assets/logo-2.png" @click="goHome" />
            <span class="title" title="鹿鸣yoyo">
                <i>YOYO</i>
            </span>
        </div>
        <div class="center">
            <div class="routes">
                <Icon class="icon" :backdrop="true" type="back" @click="back" />
                <Icon :backdrop="true" type="forward" @click="forward" />
            </div>
            <div class="welcome">
                <!-- 聆听好时光 -->
                <span>余生有你，满心欢喜 - 七夕特别版</span>
            </div>
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
        goHome() {
            this.$router.push('/home')
        },
        back() {
            this.$router.back()
        },
        forward() {
            this.$router.forward()
        },
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
        display: flex;
        align-items: center;
        padding: 0 12px;
        width: 250px;

        img {
            height: 50px;
        }
        .title {
            margin-left: 12px;
        }
    }

    .center {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: center;

        .routes {
            display: flex;
            align-items: center;

            .icon {
                margin-right: 16px;
            }
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
