import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入vuex的仓库
import store from '@/store'
// 三级联动组件、轮播图  全局注册
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav)//参数1：全局组件的名字，参数2：哪一个组件
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false
// 引入mockServe.js ---这是mock模拟数据
import '@/mock/mockServe'

// 引入swiper的样式   有好几个地方都要用
import 'swiper/css/swiper.css'


new Vue({
  render: h => h(App),
  // 注册路由  这里写了router，组件身上才有了$route $router属性
  router,
  // 注册仓库  组件实例身上就多了$store属性
  store,
  beforeCreate(){
    Vue.prototype.$bus = this  //配置全局事件总线
  },
}).$mount('#app')
