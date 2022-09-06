import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'

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


export default new VueRouter ({
    // routes:routes  key:value 一致
    routes,
    // 路由滚动行为
    scrollBehavior (to, from, savedPosition) { 
       return { y: 0 } //代表跳转后只到顶部
      }
})