const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 8082,
        proxy: {
            '/api': {
                target: 'https://www.hairpin.top/music/163', // target host
                ws: true, // proxy websockets
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': '' // rewrite path
                }
            }
        }
    },
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
