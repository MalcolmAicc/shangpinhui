import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 引入模块化
import home from './home/index'
import search from './search/index'
import users from './users/index'
import detail from './detail/index'
import shopcart from './shopcart/index'
import trade from './trade/index'


export default new Vuex.Store({
    modules:{
        home,
        search,
        users,
        detail,
        shopcart,
        trade
    }
})