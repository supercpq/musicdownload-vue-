export default {
    namespace: true,
    state: {
        MList: [{
            "value": '123',
            name: "213",
            id: '123',
        },
        {
            "value": '123',
            name: "213",
            id: '123',
        }],
        AllList: []

    },
    actions: {
        //但是后端同样要去掉空字符串和去掉0的情况（ 使用isNaN() 的话），并且通过 isNaN() 函数或正则表达式判断是否为数组，以此判断请求的接口
        searchByName(context, value) {
            //只截取输入的前20个字符发送给服务器，且去掉前后空字符串
            //直接给API发axios请求，最多读十个用于MList给el-autocomplete
            //context.commit
        },
        searchAll(context, value) {
            //只截取输入的前20个字符发送给服务器，且去掉前后空字符串
            //发axios请求（给服务器发，后端先进行检查，然后用node中转给api），都读下来，给musiclists组件留着用
            //context.commit
        },
    },
    mutations: {
        SEARCHBYNAME(state, value) {
            console.log(value)
            //更新MList
            //通过全局事件总线通知List组件更新
        },
        SEARCHALL(state, value) {
            //更新AllList
            //根据返回值状态码参数来确定类型
            //（1）代表歌曲列表,通过全局事件总线通知musiclists组件更新
            //（2）代表是下载链接，通过全局事件总线通知List组件更新
        }
    }
}