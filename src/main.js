import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
// 上线时不加这个await报错
import "@babel/polyfill"


Vue.config.productionTip = false


// 三级联动、轮播图 注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'


// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)


// 引入路由
import router from '@/router'


// 引入element,遮罩层用于微信支付弹框
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 图片懒加载插件
import VueLazyload from 'vue-lazyload'
import logo from '@/assets/logo.png'
Vue.use(VueLazyload,{
  loading:logo
})


// 引入mockserve
import '@/mock/mockServer.js'


// 引入表单验证规则
import "@/plugins/validate";


// 统一引入 API为一个对象
import * as API from '@/api'
new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus
    Vue.prototype.$bus = this
    // 将所有的接口映入一个对象挂到prototype上
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')

