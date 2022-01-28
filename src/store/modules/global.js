export default {
    state: () => {
        return {
            axiosLoading: false
        }
    },
    actions: {
        setAxiosLoading(loading) {
            this.axiosLoading = loading
        }
    }
}
