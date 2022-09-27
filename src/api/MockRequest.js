// 对于axios进行二次封装
// 使用请求和响应拦截器
import axios from 'axios';
// 引入进度条和样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"


const MockRequests = axios.create({
    // 基础路径，路径都带有/api
    baseURL:"/mock"
})

// 设置请求拦截器
MockRequests.interceptors.request.use((config) => {
        // config：配置对象，对象里面有一个属性很重要，header请求头
        nprogress.start();
        return config
})

MockRequests.interceptors.response.use((response) => {
    //  成功的回调函数
    nprogress.done()
    return response.data
},(error) => {
    //   失败的回调函数
    return Promise.reject(error)
})


export default MockRequests;