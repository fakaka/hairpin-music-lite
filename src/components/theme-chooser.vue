<template>
    <div class="theme">
        <el-popover placement="top" v-model="visible" width="200">
            <div class="themes">
                <div
                    :key="index"
                    @click="chooseTheme(themeKey)"
                    class="theme-item"
                    v-for="(themeValue, themeKey, index) in themeMap"
                >
                    <div :style="themeValue.style" class="theme-icon"></div>
                    <p :class="{ active: currentTheme == themeKey }">{{ themeValue.title }}</p>
                </div>
            </div>
            <Icon :backdrop="true" slot="reference" type="skin" />
        </el-popover>
    </div>
</template>

<script type="text/ecmascript-6">
import storage from 'good-storage'
// import variables from '@/style/themes/variables'
// import variablesWhite from '@/style/themes/variables-white'
// import variablesRed from '@/style/themes/variables-red'

const THEME_KEY = '__theme__'
const themes = {
    white: 'white',
    dark: 'dark',
    red: 'red',
    auto: 'auto'
}
export default {
    created() {
        this.themeMap = {
            [themes.dark]: {
                title: '深色',
                // file: variables,
                style: {
                    backgroundColor: '#202020'
                }
            },
            [themes.white]: {
                title: '浅色',
                // file: variablesWhite,
                style: {
                    backgroundColor: '#F6F6F6',
                    border: '1px solid #EBEAEA'
                }
            },
            // [themes.red]: {
            //     title: '红色',
            //     file: variablesRed,
            //     style: {
            //         backgroundColor: '#D33A31'
            //     }
            // },
            [themes.auto]: {
                title: '自动',
                style: {
                    backgroundImage: 'linear-gradient(to bottom right, rgb(246, 246, 246) 49%, rgb(32, 32, 32) 0)'
                }
            }
        }
        // 默认浅色
        this.chooseTheme(storage.get(THEME_KEY, themes.white))
    },
    data() {
        return {
            visible: false,
            currentTheme: '',
            listeners: {}
        }
    },
    methods: {
        chooseTheme(themeKey) {
            storage.set(THEME_KEY, themeKey)
            this.currentTheme = themeKey
            if (themeKey == themes.auto) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.changeTheme(themes.dark)
                }
                if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    this.changeTheme(themes.dark)
                }
                this.handlerListener(true)
                return
            }
            this.handlerListener(false)
            this.changeTheme(themeKey)
        },
        changeTheme(themeKey) {
            const theme = this.themeMap[themeKey].file
            // Object.keys(theme).forEach((key) => {
            //     const value = theme[key]
            //     document.documentElement.style.setProperty(key, value)
            // })
        },
        handlerListener(mode) {
            let listeners = {
                darkListener: (mediaQueryList) => {
                    if (mediaQueryList.matches) {
                        console.log('您切换到深色模式了！')
                        this.changeTheme(themes.dark)
                    }
                },
                lightListener: (mediaQueryList) => {
                    if (mediaQueryList.matches) {
                        console.log('您切换到浅色模式了！')
                        this.changeTheme(themes.dark)
                    }
                }
            }
            if (mode) {
                // console.log('addListener')
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', this.listeners.darkListener)
                window
                    .matchMedia('(prefers-color-scheme: light)')
                    .addEventListener('change', this.listeners.lightListener)
            } else {
                // console.log('removeListener')

                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.darkListener)
                window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', this.lightListener)
            }
        }
    },
    destroyed() {
        this.handlerListener(false)
    },
    components: {}
}
</script>

<style lang="scss" scoped>
.themes {
    @include flex-center();

    .theme-item {
        @include flex-center();
        flex-direction: column;
        margin: 0 8px;
        cursor: pointer;

        .theme-icon {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-bottom: 4px;
        }
        .active {
            color: $theme-color;
        }
    }
}
</style>
