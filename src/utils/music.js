/**
 * 业务工具方法
 */
import { getAlbum } from '@/api/song'

export function isUndef(v) {
    return v === undefined || v === null
}

export function pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}

export function genImgUrl(url, w, h) {
    if (!h) {
        h = w
    }
    url += `?param=${w}y${h}`
    return url
}

export function scrollInto(dom) {
    dom.scrollIntoView({ behavior: 'smooth' })
}

export function formatTime(interval) {
    interval = interval | 0
    const minute = pad((interval / 60) | 0)
    const second = pad(interval % 60)
    return `${minute}:${second}`
}

export function createSong(song) {
    const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song

    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        url: genSongPlayUrl(song.id),
        artistsText: genArtistisText(artists),
        durationSecond: duration / 1000,
        // 专辑 如果需要额外请求封面的话必须加上
        albumId,
        // mv的id 如果有的话 会在songTable组件中加上mv链接。
        mvId,
        ...rest
    }
}

export async function getSongImg(id, albumId) {
    if (!isDef(albumId)) {
        throw new Error('need albumId')
    }
    const { songs } = await getAlbum(albumId)
    const {
        al: { picUrl }
    } = songs.find(({ id: songId }) => songId === id) || {}
    return picUrl
}

export function genArtistisText(artists) {
    return (artists || []).map(({ name }) => name).join('/')
}

function genSongPlayUrl(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function isDef(v) {
    return v !== undefined && v !== null
}
