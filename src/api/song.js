import { request, requestWithoutLoading } from '../utils/axios'

// 获取音乐url
export const getSongUrl = (id, br = 320000) => request.get(`/song/url?id=${id}&br=${br}`)

export const getListDetail = (params) => request.get('/playlist/detail', { params })

// 获取音乐详情
export const getSongDetail = (ids) => request.get(`/song/detail?ids=${ids}`)

// 歌词
export const getLyric = (id) => request.get(`/lyric?id=${id}`)

export const getAlbum = (id) => request.get(`/album?id=${id}`)
