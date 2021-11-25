<template>
    <div class="scroller" ref="scroller">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

const defaultOptions = {
    mouseWheel: true,
    scrollY: true,
    scrollbar: true,
    probeType: 3
}
export default {
    name: 'Scroller',
    props: {
        data: {
            default: () => []
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    methods: {
        getScroller() {
            return this.scroller
        },
        refresh() {
            this.scroller.refresh()
        }
    },
    watch: {
        data: {
            handler() {
                this.$nextTick(() => {
                    if (!this.scroller) {
                        this.scroller = new BScroll(
                            this.$refs.scroller,
                            Object.assign({}, defaultOptions, this.options)
                        )
                        this.$emit('init', this.scroller)
                    } else {
                        this.scroller && this.scroller.refresh()
                    }
                })
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
.scroller {
    position: relative;
    overflow: hidden;
    height: 100%;

    .bscroll-indicator {
        border: none !important;
        background: var(--scrollbar-color) !important;
    }
}
</style>
