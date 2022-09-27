import {
    reqCategoryList,
    reqBannerList,
    reqFloorList
} from '@/api'

export default {
    namespaced: true,
    actions: {
        async categoryList(context) {
            let result = await reqCategoryList();
            if (result.code === 200) {
                context.commit('CATEGORYLIST', result.data)
            }
        },
        async bannerList(context) {
            let result = await reqBannerList();
            if (result.code === 200) {
                context.commit('BANNER', result.data)
            }
        },
        async getFloorList(context){
            let result = await reqFloorList();
            if (result.code === 200) {
                context.commit('FOOTERLIST', result.data)
            }
        }
    },
    mutations: {
        CATEGORYLIST(state, value) {
            state.categoryList = value
        },
        BANNER(state,value){
            state.bannerList = value
        },
        FOOTERLIST(state,value){
            state.floorList = value
        }
    },
    state: {
        categoryList: [],
        bannerList:[],
        floorList:[],
    },
    getters: {}
}