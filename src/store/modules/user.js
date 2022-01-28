import storage from 'good-storage'
import { isDef } from '@/utils/music'
import { UID_KEY } from '@/utils/config'
import { getUserDetail, getUserPlaylist } from '@/api/user'

export default {
    state: () => {
        return {
            // 登录用户
            user: {},
            // 登录用户歌单
            userPlaylist: []
        }
    },
    getters: {
        isLogin: (state) => isDef(state.user.userId),
        menuPlaylist: (state) => {
            const { user, userPlaylist } = state
            const retMenus = []
            const userCreateList = []
            const userCollectList = []

            userPlaylist.forEach((playlist) => {
                const { userId } = playlist
                if (user.userId === userId) {
                    userCreateList.push(playlist)
                } else {
                    userCollectList.push(playlist)
                }
            })

            const genPlaylistChildren = (playlist) =>
                playlist.map(({ id, name }) => ({
                    id,
                    path: `/playlist/${id}`,
                    meta: {
                        title: name,
                        icon: 'playlist-menu'
                    }
                }))

            if (userCreateList.length) {
                retMenus.push({
                    type: 'playlist',
                    title: '创建的歌单',
                    children: genPlaylistChildren(userCreateList)
                })
            }

            if (userCollectList.length) {
                retMenus.push({
                    type: 'playlist',
                    title: '收藏的歌单',
                    children: genPlaylistChildren(userCollectList)
                })
            }

            return retMenus
        }
    },
    actions: {
        async login(uid) {
            const error = () => {
                // notify.error('登录失败，请输入正确的uid。')
                return false
            }
            if (!isDef(uid)) {
                return error()
            }

            try {
                const user = await getUserDetail(uid)
                const { profile } = user
                this.setUser(profile)
                storage.set(UID_KEY, profile.userId)
            } catch (e) {
                return error()
            }

            const { playlist } = await getUserPlaylist(uid)
            this.setUserPlaylist(playlist)
            return true
        },
        logout() {
            this.$reset()
            storage.set(UID_KEY, null)
        },
        setUser(user) {
            this.user = user
        },
        setUserPlaylist(playlist) {
            this.userPlaylist = playlist
        }
    }
}
