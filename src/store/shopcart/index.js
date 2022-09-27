import { reqCartList } from "@/api/index";
import { reqDeleteCartList } from "@/api/index";
import { reqUpdatecheckedById } from "@/api/index";
// 引入生成uuid的js文件

export default {
    namespaced:true,
    actions:{
        // 获取购物车列表
        async getCartList(context){
            let result = await reqCartList()
            if(result.code === 200){
                context.commit('CARTLIST', result.data[0] || [])
            }
        },
        // 删除购物车的商品
        async deleteCartList(context,skuId){
            let result = await reqDeleteCartList(skuId)
            // 组件需要知道请求的成功与失败。返回一个promise对象
            if(result.code === 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('falie'))
            }
        },
        // 修改产品选中状态
        async UpdatecheckedById(context,{skuId,isChecked}){
            let result = await reqUpdatecheckedById(skuId,isChecked)
            if(result.code === 200){
                return 'Ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 全部删除按钮的删除操作
        deleteAll(context){
            // 使用promise.all方法
            let PromiseAll = []
            // 遍历数组中的每一个产品，调用一次删除产品的actions
            context.getters.cartInfoList.forEach(element => {
                if (element.isChecked === 1) {
                    let result = context.dispatch("deleteCartList",element.skuId)
                    PromiseAll.push(result) 
                }
            });
            // 返回成功和失败额状态
            // 只有数组中的状态都是成功则返回成功，只要有一个失败都是失败
            return Promise.all(PromiseAll)
        },
        // 全选或者取消全选
        UpdateAllChecked(context,isChecked){
            let PromiseAll = []
            context.getters.cartInfoList.forEach(element => {
                let result = context.dispatch("UpdatecheckedById",{skuId:element.skuId,isChecked:isChecked})
                PromiseAll.push(result)
            });
            return Promise.all(PromiseAll)
        }
    },
    mutations:{
        CARTLIST(state,value){
            state.cartInfo = value
        }
    },
    state:{
        cartInfo:[]
    },
    getters:{
        cartInfoList(state){
            return state.cartInfo.cartInfoList || []
        }
    }
}