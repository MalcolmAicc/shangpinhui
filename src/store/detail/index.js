import {reqGoodsInfo} from '@/api/index'
import { reqCartInfo } from "@/api/index";
// 引入生成uuid的js文件
import { getUUID } from "./uuid/uuid";
export default {
    namespaced:true,
    actions:{
        // 获取产品信息
        async getGoodInfo(context,skuid){
            let result = await reqGoodsInfo(skuid)
            // console.log(result);
            if(result.code === 200){
                context.commit('GETGOODINFO',result.data)
            }
        },
        // 购物车数据
        // 将商品的id和商品个数存进数据库，而且数据库没有返回数据，不需要存进state
        async getCartInfo(context,{skuId,skuNum}){
            let result = await reqCartInfo(skuId,skuNum)
            // 需要返回成功和失败的状态
            if(result.code === 200){
                return 'ok'
            }else{
                Promise.reject(new Error('faile'))
            }
        },
    },
    mutations:{
        GETGOODINFO(state,goodsInfo){
            state.goodsInfo = goodsInfo
        }
    },
    state:{
        goodsInfo:{},
        // 游客的临时身份，必须是唯一的，不能重复生成
        uuid_token:getUUID()
    },
    getters:{
        // 计算返回商品详情页顶部的内容
        categoryView(state){
            return state.goodsInfo.categoryView || {}
        },
        skuInfo(state){
            return state.goodsInfo.skuInfo || {}
        }
    }
}