import Vue from 'vue'

import VueRouter from 'vue-router'

import store from '@/store'

// 使用插件
Vue.use(VueRouter)
// 使用路由懒加载的方式
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

// 引入二级路由
// import myOrder from '@/pages/Center/myOrder'
// import groupOrder from '@/pages/Center/groupOrder'

// 浅拷贝$router对象
let originPush = VueRouter.prototype.push;

// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

// 配置路由
let router = new VueRouter({
    routes: [
        // 重定向, 一开始访问的时候呈现的路由组件
        {
            path: '/',
            redirect: '/home',
            meta: {
                show: true
            }
        },
        {
            path: '/home',
            component: ()=>import('@/pages/Home'),
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: ()=>import('@/pages/Login'),
            meta: {
                show: false
            },
        },
        {
            path: '/register',
            component: ()=>import('@/pages/Register'),
            meta: {
                show: false
            },

        },
        {
            name: 'Search',
            path: '/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta: {
                show: true
            }
        },
        {
            name: 'Detail',
            path: '/detail/:skuid',
            component: ()=>import('@/pages/Detail'),
            meta: {
                show: true
            }
        },
        {
            name: 'AddCartSuccess',
            path: '/addCartSuccess',
            component: ()=>import('@/pages/AddCartSuccess')
        },
        {
            name: 'ShopCart',
            path: '/shopcart',
            component: ()=>import('@/pages/ShopCart'),
            meta: {
                show: true
            }
        },
        {
            name: 'Trade',
            path: '/trade',
            component: ()=>import('@/pages/Trade'),
            meta: {
                show: true
            },
            beforeEnter: (to, from,next) => {
                // 去交易页面必须是从shopcart来
                if(from.path == "/shopcart"){
                    next();
                }else{
                    next('/shopcart');
                }
            },
        },
        {
            name: 'pay',
            path: '/pay',
            component:()=>import('@/pages/Pay'),
            meta: {
                show: true
            },
            beforeEnter: (to, from,next) => {
                // 去交易页面必须是从shopcart来
                if(from.path == "/trade"){
                    next();
                }else{
                    next(false);
                }
            },
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: ()=>import('@/pages/PaySuccess'),
            meta: {
                show: true
            },
            beforeEnter: (to, from,next) => {
                // 去交易页面必须是从shopcart来
                if(from.path == "/pay"){
                    next();
                }else{
                    next(false);
                }
            },
        },
        {
            name: 'Center',
            path: '/center',
            component: ()=>import('@/pages/Center'),
            meta: {
                show: true
            },
            children: [{
                    name: 'myOrder',
                    path: 'myOrder',
                    component: ()=>import('@/pages/Center/myOrder'),
                    meta: {
                        show: true
                    },
                },
                {
                    name: 'groupOrder',
                    path: 'groupOrder',
                    component: ()=>import('@/pages/Center/groupOrder'),
                    meta: {
                        show: true
                    },
                },
                {
                    path: '/center',
                    redirect: '/center/myOrder',
                    meta: {
                        show: true
                    },
                }
            ]

        }
    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            y: 0
        }
    },
})
// 配置全局前置路由守卫
router.beforeEach(async (to, from, next) => {
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来来的信息
    //next: next() 放行  next(path) 放行  
    //方便测试 统一放行
   //  next();
   //获取仓库中的token-----可以确定用户是登录了
    let token  = store.state.users.token;
    let name = store.state.users.userInfo.name;
    //用户登录了
    if(token){
      //已经登录而且还想去登录------不行
      if(to.path=="/login"||to.path=='/register'){
         next('/home');
      }else{
        //已经登陆了,访问的是非登录与注册
        //登录了且拥有用户信息放行
        if(name){
          next();
        }else{
          //登陆了且没有用户信息
          //在路由跳转之前获取用户信息且放行
          try {
           await store.dispatch("users/userInfo");
           next();
          } catch (error) {
            //token失效从新登录
            await store.dispatch("users/userLogout");
            next('/login')
          }
        }
      }
    }else{
       //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
       //未登录去上面这些路由-----登录
       let toPath = to.path;
       if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
         //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
         next('/login?redirect='+toPath);
       }else{
          //去的不是上面这些路由（home|search|shopCart）---放行
          next();
       }
     
    }
 });
 

export default router;