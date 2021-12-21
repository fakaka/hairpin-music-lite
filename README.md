# hairpin-music-lite
> 一个网页版的音乐播放器页面  
> ~~众所周知没有做过播放器的前端是不完整~~  
> 源码地址 <https://github.com/fakaka/hairpin-music-lite>  
> 预览地址 <https://hairpin-music-lite.vercel.app>  

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn dev
```
### Compiles and minifies for production
```
yarn build
```



## 参考资料

### 音乐界面 UI
[sl1673495/vue-netease-music](https://github.com/sl1673495/vue-netease-music)

### 网易云音乐 API 
[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)


## RoadMap
- 头部
    - [ ] logo
- 左侧
- 底部
- 设置
- 持续集成
- 快捷键
  - [ ] 系统媒体键
- [ ] 播放列表
- [x] 使用 Vue3 + ~~TS~~
- [x] 规范 'plugin:vue/vue3-recommended'
- [ ] v0.6
    - [ ] 兼容 vue3 以及周边
    - [ ] 使用 vue3 setup 语法重构


## ChangeLog

### 0.5
*2021-11-25*
- 升级 依赖
- 重构 vue-cli 迁移到 vite

### 0.4
*2020-09-28*

- 增加 快捷键
- 增加 清空播放列表
- 增加 系统媒体键控制
- 增加 歌单本地打开
- 增加 切换歌单滚动到顶部
- 修改 播放列表头部操作
- 修复 获取歌词逻辑
- 升级 https
- 重构 本地化图标文件 

### 0.3
*2020-08-21*

- 增加 在本地打开
- 增加 缓存歌曲的功能
- 增加音量控制
- 增加 欢迎语
- 测试 CI

### 0.2
*2020-08-21*

- 基本功能实现
