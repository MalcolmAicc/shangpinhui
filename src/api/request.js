// 对于axios进行二次封装
// 使用请求和响应拦截器
import store from '@/store';
import axios from 'axios';
// 引入进度条和样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"


const requests = axios.create({
    // 基础路径，路径都带有/api
    baseURL:"/api"
})

// 设置请求拦截器
requests.interceptors.request.use((config) => {
    // 请求头携带游客身份
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 请求头携带token
    if(store.state.users.token){
        config.headers.token = store.state.users.token
    }
        // config：配置对象，对象里面有一个属性很重要，header请求头
        nprogress.start();
        return config
})

requests.interceptors.response.use((response) => {
    //  成功的回调函数
    nprogress.done()
    return response.data
},(error) => {
    //   失败的回调函数
    return Promise.reject(error)
})


export default requests;