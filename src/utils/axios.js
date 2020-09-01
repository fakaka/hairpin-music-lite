import axios from 'axios'
import { Loading } from 'element-ui'
// import { confirm } from '@/base/confirm'
// import store from '@/store'
import storage from 'good-storage'

// 'https://api.mtnhao.com/'
const BASE_URL = storage.get('__BASE_URL__', 'https://www.hairpin.top/music/')
// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()
// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)
// 通用的axios实例
function createBaseInstance() {
    const instance = axios.create({
        baseURL: BASE_URL
    })

    instance.interceptors.request.use(
        function(config) {
            //根据storage内容动态设置 baseurl
            // console.log(config.url)
            // let baseUrl = storage.get('__BASE_URL__', 'http://www.hairpin.top/music/')
            // config.url = 'http://localhost:3000' + config.url
            return config
        },
        function(error) {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

function handleError(e) {
    throw e
}

function handleResponse(response) {
    return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
    interceptors.request.use(loadingRequestInterceptor)
    interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

    function loadingRequestInterceptor(config) {
        if (!loading) {
            loading = Loading.service({
                target: 'body',
                background: 'transparent',
                text: '加载中...'
            })
            // store.commit(SET_AXIOS_LOADING, true)
        }
        loadingCount++
        return config
    }

    function handleResponseLoading() {
        loadingCount--
        if (loadingCount === 0) {
            loading.close()
            loading = null
            // store.commit(SET_AXIOS_LOADING, false)
        }
    }

    function loadingResponseInterceptor(response) {
        handleResponseLoading()
        return response
    }

    function loadingResponseErrorInterceptor(e) {
        handleResponseLoading()
        throw e
    }
}
