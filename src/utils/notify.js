export const notify = (song) => {
    const NotificationInstance = Notification || window.Notification
    if (NotificationInstance) {
        const permissionNow = NotificationInstance.permission
        if (permissionNow === 'granted') {
            //允许通知
            new Notification('YOYO 音乐', {
                body: song.name + ' - ' + song.artistsText,
                tag: 'next',
                renotify: true,
                image: song.img
            })
        } else if (permissionNow === 'denied') {
            console.log('用户拒绝了你!!!')
        } else {
            NotificationInstance.requestPermission(function (PERMISSION) {
                if (PERMISSION !== 'granted') {
                    console.log('用户无情残忍的拒绝了你!!!')
                }
            })
        }
    }
}
