import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
const state = {
  // 三级菜单的数据
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    floorList:[]
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
      state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
      state.floorList = floorList
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
    },
    // 获取首页轮播图的数据存储好
    async getBannerList({commit}){
      let result = await reqGetBannerList()
      // console.log(result);
      if(result.code == 200){
        commit('GETBANNERLIST',result.data)
      }
    },
    // 获取floor数据
    async getFloorList({commit}){
      let result = await reqFloorList()
      console.log('1111',result);
      if(result.code == 200){
        commit('GETFLOORLIST',result.data)
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