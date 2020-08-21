import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const PlaylistDetail = () => import(/* webpackChunkName: "PlaylistDetail" */ '@/views/playlist-detail')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/playlist/3778678'
    },
    {
        path: '/playlist/:id',
        name: 'playlist',
        component: PlaylistDetail
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

const router = new VueRouter({
    routes
})

export default router
