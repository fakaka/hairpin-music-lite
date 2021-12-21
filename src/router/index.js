import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'welcome',
        redirect: '/playlist/3778678'
    },
    {
        path: '/home',
        name: 'Home',
        component: import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: '/playlist/:id',
        name: 'playlist',
        component: () => import(/* webpackChunkName: "playlist-detail" */ '@/views/playlist-detail.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
    },
    {
        path: '/play',
        name: 'play',
        component: () => import(/* webpackChunkName: "play" */ '../views/play.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '../views/setting.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
