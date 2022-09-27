import { reqUserAddressList } from "@/api/index";
import { reqOrderInfo } from "@/api/index";
// 引入生成uuid的js文件

export default {
    namespaced:true,
    actions:{
        // 获取用户地址
        async getUserAddress(context){
            let result = await reqUserAddressList()
            if(result.code === 200){
                context.commit('GETUSERADDRESS',result.data)
            }
        },
        // 获取订单消息
        async getOrderInfo(context){
            let result = await reqOrderInfo()
            if(result.code === 200){
                context.commit('GETORDERINFO',result.data)
            }
        }
    },
    mutations:{
        GETUSERADDRESS(state,address){
            state.address = address
        },
        GETORDERINFO(state,OrderInfo){
            state.OrderInfo = OrderInfo
        }
    },
    state:{
        address:[],
        OrderInfo:[]
    },
    getters:{
        
    }
}