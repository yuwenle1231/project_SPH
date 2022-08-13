import {reqCategoryList} from '@/api'
const state = {
    categoryList:[],
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    // categoryList通过接口函数的调用，向服务器发请求，获取服务器的数据
     // 获取三级联动信息 返回的是一个promise结果,需要使用async,await
   async categoryList({commit}){
      let result = await reqCategoryList()
    //   console.log(result);
      if(result.code == 200){
        commit('CATEGORYLIST',result.data)
      }
    }
    
}

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}