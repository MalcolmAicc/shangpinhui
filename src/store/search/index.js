import {reqGetSearchInfo} from '@/api/index'
export default {
    actions:{
        async SearchInfo(context,params = {}){
            let result =await reqGetSearchInfo(params)
            if(result.code === 200){
                context.commit('SEARCHINFO',result.data)
            }
        }
    },
    mutations:{
        SEARCHINFO(state,value){
            state.SearchList = value
        }
    },
    state:{
        SearchList:{}
    },
    getters:{
        goodsList(state){
            return state.SearchList.goodsList
        },
        trademarkList(state){
            return state.SearchList.trademarkList
        },
        attrsList(state){
            return state.SearchList.attrsList
        },
        total(state){
            return state.SearchList.total
        }
    }
}