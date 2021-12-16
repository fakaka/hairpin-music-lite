<template>
    <el-dialog :modal="false" v-model="visible" class="confirm-dialog">
        <template #title>
            <div>{{ title || '提示' }}</div>
        </template>
        <div class="confirm-body">{{ text }}</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="mini" @click="confirmAndClose" class="confirm-btn" type="primary">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { createApp, nextTick } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

const Confirm = {
    name: 'Confirm',
    props: [],
    data() {
        return {
            title: '提示',
            text: '',
            visible: false
        }
    },
    methods: {
        onConfirm() {},
        confirmAndClose() {
            this.onConfirm && this.onConfirm()
            this.visible = false
        }
    }
}

export default Confirm

// 单例减少开销
let instanceCache
// 命令式调用
export const confirm = function (text, title, onConfirm = () => {}) {
    if (typeof title === 'function') {
        onConfirm = title
        title = undefined
    }

    const getInstance = () => {
        if (!instanceCache) {
            // 创建Toasts实例
            const ConfirmCtor = createApp(Confirm, {
                text,
                title
                // onConfirm
            })
            ConfirmCtor.use(ElDialog)
            ConfirmCtor.use(ElButton)
            // 挂载父亲元素
            let root = document.createElement('div')
            document.body.appendChild(root)
            instanceCache = ConfirmCtor.mount(root)
        } else {
            // 更新属性
            instanceCache.text = text
            instanceCache.title = title
            instanceCache.onConfirm = onConfirm
        }
        return instanceCache
    }
    const instance = getInstance()
    // 确保更新的prop渲染到dom
    // 确保动画效果
    nextTick(() => {
        instance.visible = true
    })
}
</script>

<style lang="scss" scoped>
.confirm-dialog {
    :deep(.el-dialog__body) {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .confirm-body {
        line-height: 20px;
    }
    .confirm-btn {
        width: 100%;
    }
}
</style>
