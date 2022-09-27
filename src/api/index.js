// 接口的统一管理文件
import requests from './request'
import MockRequests from './MockRequest'


// 三级联动的接口
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// 轮播图mock数据接口
export const reqBannerList = () => MockRequests.get('/banner')

// floor 组件mock数据接口
export const reqFloorList = () => MockRequests.get('/floor')

// searchseletore组件 获取数据
// params 参数至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url:"/list",
    method:'post',
    data:params
})

// 请求验证码
// URL  /api/user/passport/sendCode/{phone}    get请求
export const reqGetCode = (phone) => requests({ 
  url:`/user/passport/sendCode/${phone}`,
  method:'get'
})

// 注册接口   /api/user/passport/register    post请求
// 手机号  验证码  密码
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    method:'post',
    data
})

// 登录接口
export const reqUserLogin = (data) => requests({
  url:'/user/passport/login',
  method:'post',
  data
})

// 获取用户信息  /api/user/passport/auth/getUserInfo  需要带着token
// 请求头里带数据
export const reqUserInfo = () => requests({
  url:'/user/passport/auth/getUserInfo',
  method:'get'
})

// 退出登录的接口    /api/user/passport/logout
export const reqUserLogout = () => requests({
  url:"/user/passport/logout",
  method:'get'
})

// 获取产品详情信息接口  /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({
  // eslint-disable-next-line no-undef
  url:`/item/${skuId}`,
  method:'get',
})

// 将产品添加到购物车中，以及后续在购物车中修改产品数量
// /api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqCartInfo = (skuId,skuNum)=>requests({
  url:`/cart/addToCart/${ skuId }/${ skuNum }`,
  method:'post'
})

// 获取购物车的列表 /api/cart/cartList
export const reqCartList = ()=>requests({
  url:'/cart/cartList',
  method:'get'
})

// 删除购物车接口  /api/cart/deleteCart/{skuId}
export const reqDeleteCartList = (skuId) => requests({
  url:`/cart/deleteCart/${skuId}`,
  method:'delete'
})

// 切换商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdatecheckedById = (skuId,isChecked) => requests({
  url:`/cart/checkCart/${skuId}/${isChecked} `,
  method:'get'
})

// /api/user/userAddress/auth/findUserAddressList 获取用户地址信息 get
export const reqUserAddressList = () => requests({
  url:'/user/userAddress/auth/findUserAddressList',
  method:'get'
})

// 获取交易信息页面的商品信息  /api/order/auth/trade  get
export const reqOrderInfo = () => requests({
  url:'/order/auth/trade',
  method:'get'
})

// 提交订单的接口  /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data) => requests({
  url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method:'post'
})

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:'get'
})

// 获取支付状态  /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:'get'
})

// 获取我的订单列表  /api/order/auth/{page}/{limit}   get 
export const reqMyOrderList = (page,limit) => requests({
  url:`/order/auth/${page}/${limit}`,
  method:'get'
})

