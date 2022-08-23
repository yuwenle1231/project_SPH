import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

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
    routes: [
        {
            path:'/',
            redirect:'/home', //重定向，项目跑起来时，立马定向到'/home'
            meta:{show:true}  //路由的元信息，可以自定义一些属性
        },
        {
            path:'/home', //只是切换路由时网址里面的显示地址
            component:Home,
            meta:{show:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        {
            name:'search',
            path:'/search',
            component:Search,
            meta:{show:true}
        },
    ]
})