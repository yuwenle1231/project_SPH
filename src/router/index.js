import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'

// 引入store 主要是拿到里面的token来判断是否登录，从而进行接下来的操作
import store from '@/store'


// 重写$router的push|replace方法  解决多次重复点击然后调用push方法报错
// location参数，告诉原来push|replace，往哪里跳转  push全部改为replace即可
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject);
  }else{
    originPush.call(this,location,() => {},() => {})
  }
}


let  router =  new VueRouter ({
    // routes:routes  key:value 一致
    routes,
    // 路由滚动行为
    scrollBehavior (to, from, savedPosition) { 
       return { y: 0 } //代表跳转后只到顶部
      },

})

// 全局守卫 ：前置守卫 （路由跳转前）
router.beforeEach(async (to,from,next) => {
  //  to到哪里去  from从哪里来  next()放行   next('/home')放行到指定的路由   next(false)拒绝放行路由返回到from
  // next()
  let token = store.state.user.token  //用户登录了才有token
  let name = store.state.user.userInfo.name //用户信息
  if(token){
    // 登录了还想跳转到login|register就不行
    if(to.path == '/login'|| to.path=='/register'){
      next('/home')
    }else{  
      if(name){//登录了且有用户信息除了去login都可以，
        next()
      }else{//没有用户信息就action派发一个
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效，获取不到用户信息   先清除token，然后重新登录
         await store.dispatch('userLogout')
         next('/login')
        }
      }
    }
  }else{
    // 未登录 不能进入交易，支付pay|paysuccess 个人中心....   用的全局守卫
     // 未登录就点这些的话就自动跳转到登录
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 ||toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 ){
      // 把未登录就想去的路由添加到query参数上

      next('/login?redirect='+toPath)
    }else{
      next()
    }
   
    // next()
  }
})







export default router