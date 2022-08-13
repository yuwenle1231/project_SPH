import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入vuex的仓库
import store from '@/store'
// 三级联动组件  全局注册
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)//参数1：全局组件的名字，参数2：哪一个组件

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 注册路由  这里写了router，组件身上才有了$route $router属性
  router,
  // 注册仓库  组件实例身上就多了$store属性
  store
}).$mount('#app')
