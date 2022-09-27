import { reqGetCode } from "@/api/index";
import { reqUserRegister } from "@/api/index";
import {reqUserLogin} from '@/api/index'
import { reqUserInfo } from "@/api/index";
import { reqUserLogout } from "@/api/index";
export default {
    namespaced:true,
    actions:{
        // 获取验证码
        async getCode(context,phone){
            // 把验证码返回了
            let result = await reqGetCode(phone)
            if(result.code === 200){
                context.commit('GETCODE',result.data)
                return 'OK'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister(context,user){
            let result = await reqUserRegister(user)
            if(result.code === 200){
                return 'OK'
            }else{
                // return Promise.reject(new Error('faile'))
                return Promise.reject(new Error(result.message))
            }
        },
        // 用户登录
        async userLogin(context,data){
            let result = await reqUserLogin(data)
            if(result.code === 200){
                context.commit('USERLOGIN',result.data.token)
                // 持久化存储，把token存储到本地，首页刷新的时候用户名还存在
                localStorage.setItem('TOKEN',result.data.token)
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户信息
        // eslint-disable-next-line no-unused-vars
        async userInfo(context,info){
            let result = await reqUserInfo()
            if(result.code === 200){
                context.commit("GETUSERINFO",result.data)
            }
        },
        // 用户退出登录
        // eslint-disable-next-line no-unused-vars
        async userLogout(context,data){
            // eslint-disable-next-line no-unused-vars
            let result = await reqUserLogout()
            // 提交mutation 清楚用户数据
            if(result.code === 200){
                context.commit("CLEAR")
            }else{
                return Promise.reject(new Error('faile'))
            }
        }   
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token =  token
        },
        GETUSERINFO(state,info){
            state.userInfo = info
        },
        CLEAR(state){
            // 把仓库的数据清空
            state.token = ''
            state.userInfo = ''
            // 把本地存储的数据清空
            localStorage.removeItem("TOKEN")
        }
    },
    state:{
        code:'',
        token:localStorage.getItem('TOKEN'),
        userInfo:''
    },
    getters:{}
}