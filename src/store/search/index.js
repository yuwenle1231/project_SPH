// 先引入api
import { reqSearchInfo } from "@/api";
const state = {
    searchList:{}
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    // 获取Search模块的数据
 async  getSaerchList({commit},params={}){
    // 调用该函数reqSearchInfo的时候参数 至少 得有一个空对象)  reqSearchInfo({})
    // 这里的参数params是派发action时的第二个参数   这里设置的默认值为空对象，外部传入就用外部传入的
    let result = await reqSearchInfo(params)
    console.log('Search',result);
    if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
    }
    }
}
// 计算属性，为了简化数据而生   利用已有的属性值再计算出一些属性
const getters = {
    // 这里的state是当前仓库的state，而不是store下的index（大仓库）
    goodsList(state){
        return state.searchList.goodsList || []  //加入网络不好|没网，那么这里返回的是undefined，所以要加一个空数组
    },
    trademarkList(){
        return state.searchList.trademarkList 
    },
    attrsList(state){
        return state.searchList.attrsList 
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}