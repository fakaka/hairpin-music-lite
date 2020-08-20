export default {
    namespaced: true,
    state: {
        axiosLoading: false
    },
    mutations: {
        setAxiosLoading(state, loading) {
            state.axiosLoading = loading
        }
    }
}
