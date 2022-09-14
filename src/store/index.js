import Vuex from 'vuex'
import Vue from 'vue'
// 使用vuex插件
Vue.use(Vuex)
// 引入小仓库
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import shopcart from '@/store/shopCart'
import user from '@/store/user'
import trade from '@/store/trade'

//存取数据state
//mutations修改state的唯一手段
//actions可以写自己的业务逻辑，也可以处理异步，但不能修改state
//getters理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})