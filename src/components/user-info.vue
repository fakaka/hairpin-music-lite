<template>
    <div class="user">
        <!-- 登录前 -->
        <div @click="onOpenModal" class="login-trigger" v-if="!isLogin">
            <i class="user-icon iconfont icon-yonghu" />
            <p class="user-name">未登录</p>
        </div>
        <!-- 登录后 -->
        <div @click="detail" class="logined-user" v-else>
            <img :src="user.avatarUrl" class="avatar" />
            <p class="user-name">{{ user.nickname }}</p>
        </div>

        <!-- 登录框 -->
        <el-dialog :modal="false" v-model="visible" :close-on-click-modal="false" width="360px">
            <template #title>
                <p>登录</p>
            </template>
            <div class="login-body">
                <el-input class="input" placeholder="请输入您的网易云uid" v-model="uid" />
                <div class="login-help">
                    <p class="help">
                        1、请
                        <a href="http://music.163.com" target="_blank">点我(http://music.163.com)</a>打开网易云音乐官网
                    </p>
                    <p class="help">2、点击页面右上角的“登录”</p>
                    <p class="help">3、点击您的头像，进入我的主页</p>
                    <p class="help">4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button :loading="loading" @click="onLogin(uid)" class="login-btn" type="primary"
                        >登 录</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import storage from 'good-storage'
import { UID_KEY } from '../utils/config'
import { isDef } from '../utils/music'
import { confirm } from '@/base/confirm.vue'
import { mapActions, mapState, mapGetters } from '@/store/helper/user'

export default {
    created() {
        const uid = storage.get(UID_KEY, '269342361')
        if (isDef(uid)) {
            this.onLogin(uid)
        }
    },
    data() {
        return {
            visible: false,
            loading: false,
            uid: '54034393'
        }
    },
    methods: {
        onOpenModal() {
            this.visible = true
        },
        onCloseModal() {
            this.visible = false
        },
        async onLogin(uid) {
            this.loading = true
            const success = await this.login(uid).finally(() => {
                this.loading = false
            })
            if (success) {
                this.onCloseModal()
            }
        },
        detail() {
            // this.$router.push('/user')
            confirm('确定要注销吗？', () => {
                this.logout()
            })
        },
        ...mapActions(['login', 'logout'])
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin'])
    }
    // components: {}
}
</script>

<style lang="scss" scoped>
.user {
    padding: 16px;
    padding-bottom: 0;
    margin-bottom: 4px;
    font-size: 14px;

    .login-trigger {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .user-icon {
        font-size: 24px;
    }

    .user-name {
        margin-left: 8px;
    }

    .logout {
        transform: translateY(1px);
        margin-left: 8px;
        color: var(--font-color-shallow-grey);
    }

    .login-body {
        .input {
            margin-bottom: 16px;
        }

        .login-help {
            .help {
                margin-bottom: 4px;
            }
        }
    }

    .login-btn {
        width: 100%;
        padding: 8px 0;
    }

    .logined-user {
        display: flex;
        align-items: center;
        cursor: pointer;

        .avatar {
            width: 40px;
            // @include round(40px);
            border-radius: 50%;
        }
    }
}
</style>
