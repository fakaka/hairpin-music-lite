import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'welcome',
        redirect: '/playlist/3778678'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/playlist/:id',
        name: 'playlist',
        component: () => import(/* webpackChunkName: "PlaylistDetail" */ '@/views/playlist-detail')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
