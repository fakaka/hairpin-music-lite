const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/styles/vars.scss";`
            }
        }
    }
}
