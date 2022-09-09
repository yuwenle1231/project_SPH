// 对所有的api进行统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

// 三级联动接口 /api/product/getBaseCategoryList   get请求 无参数

export const reqCategoryList = () => {
    // 发送请求，axios发送请求返回的是一个promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })  // 另一种写法requests.get('url')
    // url  因为baseURL写了'/api' , 这里就可以简写了   这里箭头函数也可以简写
}

//获取banner里的图片数据  简写方式
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
// 获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })

// 获取Search模块数据   /api/list  post请求  需要参数
/*{   参数例子
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// 这里的给服务器传递的params至少是一个空对象(即 调用该函数的时候参数 至少 得有一个空对象)  reqSearchInfo({})
export const reqSearchInfo = (params) => requests({url:'/list',method:'post',data:params})


// 获取商品详情   /api/item/{ skuId } get请求 
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method: 'get'})


//将产品添加到购物车（获取更新某一个产品的个数） /api/cart/addToCart/{ skuId }/{ skuNum }  post请求
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车的信息  /api/cart/cartList   get  不需要参数
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})

// 删除购物车某个产品  /api/cart/deleteCart/{skuId}  delete 带参数
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//  切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export const  reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码   /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册接口  /api/user/passport/register   phone code password   post
export const reqUserRegister = (data) => requests({url:'/user/passport/register',method:'post',data})

//登录接口  /api/user/passport/login phone password POST
export const  reqUserLogin = (data) => requests({url:'/user/passport/login',method:'post',data})

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList   get 

// 获取用户信息  /api/user/passport/auth/getUserInfo get 
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录 /api/user/passport/logout get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})