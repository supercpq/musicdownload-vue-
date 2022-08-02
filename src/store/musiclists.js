import axios from 'axios'
export default {
    namespace: true,
    state: {
        //存储建议输入
        MList: [],
        AllList: [{
            id: 347230,
            name: "海阔天空",
            picUrl: "http://p4.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg"
        }],//存储搜索结果组件的数据    { name: 'hello', id: '122231' }
        isShow: false,//控制搜索结果组件是否展示
        ifDonwload: false,
        DownloadUrl: '#',
        info: {
            isLoading: false,
            isSucc: false,
            isFatal: false,
        },
    },
    actions: {
        //但是后端同样要去掉空字符串和去掉0的情况（ 使用isNaN() 的话），并且通过 isNaN() 函数或正则表达式判断是否为数组，以此判断请求的接口
        searchByName(context, value) {
            this.state.musicList.MList.splice(0, this.state.musicList.MList.length);
            var name = value.toString().trim().slice(0, 20)
            //只截取输入的前20个字符发送给服务器，且去掉前后空字符串
            if (name) {
                axios.get(`https://musicdownload.vercel.app/cloudsearch?keywords=${name}`).then(
                    res => {
                        context.commit('SEARCHBYNAME', res.data.result.songs.slice(0, 10))
                    },
                    err => {
                        console.log(err.message)

                    }
                )
            }
            //直接给API发axios请求，最多读十个用于MList给el-autocomplete
            //context.commit
        },
        searchAll(context, value) {
            this.state.musicList.info.isLoading = true
            this.state.musicList.info.isSucc = false
            this.state.musicList.info.isFatal = false
            this.state.musicList.ifDonwload = false
            var name = value.toString().trim().slice(0, 20)
            if (name) {
                axios.post("http://www.wxhzny.top/api/search", `music=${name}`).then(
                    (res) => {
                        if (res.data.status == 0) {
                            this.state.musicList.info.isLoading = false
                            this.state.musicList.info.isSucc = true
                            this.state.musicList.info.isFatal = false
                            if (res.data.ifid == 0) {
                                context.commit('SEARCHALL', res.data.songs)
                            } else {
                                //一个跳转链接
                                context.commit('DOWNLOADMUSIC', res.data.songsUrl)
                            }
                        } else {
                            this.state.musicList.info.isLoading = false
                            this.state.musicList.info.isSucc = false
                            this.state.musicList.info.isFatal = true
                        }
                    },
                    (err) => {
                        console.log(err.message);
                        this.state.musicList.info.isLoading = false
                        this.state.musicList.info.isSucc = false
                        this.state.musicList.info.isFatal = true
                    }
                );
                //     axios.get(`https://musicdownload.vercel.app/cloudsearch?keywords=${name}`).then(
                //         res => {
                //             console.log(res.data)
                //             this.state.musicList.info.isLoading = false
                //             this.state.musicList.info.isSucc = true
                //             this.state.musicList.info.isFatal = false
                //             context.commit('SEARCHALL', res.data.result.songs)
                //             //记得播放动画
                //         },
                //         err => {
                //             console.log(err.message)
                //             this.state.musicList.info.isLoading = false
                //             this.state.musicList.info.isSucc = false
                //             this.state.musicList.info.isFatal = true
                //         }
                //     )
                // }
                //只截取输入的前20个字符发送给服务器，且去掉前后空字符串
                //发axios请求（给服务器发，后端先进行检查，然后用node中转给api），都读下来，给musiclists组件留着用
                //context.commit
            }
        },
    },
    mutations: {
        SEARCHBYNAME(state, value) {
            //console.log(value)
            //更新MList
            value.forEach(element => {
                var a = { "value": element.name, id: element.id }
                this.state.musicList.MList.push(a)
            });
        },
        SEARCHALL(state, value) {
            //更新AllList
            this.state.musicList.AllList = value
            console.log(this.state.musicList.AllList)
            this.state.musicList.isShow = true
        },
        DOWNLOADMUSIC(state, value) {
            this.state.musicList.DownloadUrl = value
            this.state.musicList.ifDonwload = true
        }
    }
}
