<template>
    <div class="theme">
        <el-popover placement="bottom" width="200">
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
            <template #reference>
                <Icon :backdrop="true" type="skin" />
            </template>
        </el-popover>
    </div>
</template>

<script setup>
import storage from 'good-storage'
import variablesDark from '@/assets/themes/dark'
import variablesWhite from '@/assets/themes/white'
// import variablesRed from '@/style/themes/variables-red'

import { onUnmounted, ref } from 'vue'

const THEME_KEY = '__theme__'
const themes = {
    white: 'white',
    dark: 'dark',
    red: 'red',
    auto: 'auto'
}
const themeMap = {
    [themes.dark]: {
        title: '深色',
        file: variablesDark,
        style: {
            backgroundColor: '#202020'
        }
    },
    [themes.white]: {
        title: '浅色',
        file: variablesWhite,
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

const currentTheme = ref('')

const chooseTheme = (themeKey) => {
    storage.set(THEME_KEY, themeKey)
    currentTheme.value = themeKey
    if (themeKey == themes.auto) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            changeTheme(themes.dark)
        }
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            changeTheme(themes.dark)
        }
        handlerListener(true)
        return
    }
    handlerListener(false)
    changeTheme(themeKey)
}

const changeTheme = (themeKey) => {
    const theme = themeMap[themeKey].file
    if (theme) {
        Object.keys(theme).forEach((key) => {
            const value = theme[key]
            document.documentElement.style.setProperty(key, value)
        })
    }
}
const handlerListener = (mode) => {
    let listeners = {
        darkListener: (mediaQueryList) => {
            if (mediaQueryList.matches) {
                console.log('您切换到深色模式了！')
                changeTheme(themes.dark)
            }
        },
        lightListener: (mediaQueryList) => {
            if (mediaQueryList.matches) {
                console.log('您切换到浅色模式了！')
                changeTheme(themes.dark)
            }
        }
    }
    if (mode) {
        // console.log('addListener')
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listeners.darkListener)
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', listeners.lightListener)
    } else {
        // console.log('removeListener')

        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listeners.darkListener)
        window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', listeners.lightListener)
    }
    onUnmounted(() => {
        handlerListener(false)
    })
}

// 默认浅色
chooseTheme(storage.get(THEME_KEY, themes.white))

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
