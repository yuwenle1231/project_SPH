import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
// 封装的游客临时身份模块uuid-- 生成一个随机字符串(不能再改变)                           
import {getUUID} from '@/utils/uuid_token'

const state ={
    goodInfo:{},
    // 游客身份
    uuid_token:getUUID()
}
const mutations ={
    GETGOODINFO(state,goodInfo){
       state.goodInfo = goodInfo
    }
}
const actions ={
    // 获取产品信息
    async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId)
    console.log('getGoodInfo',result)
    if(result.code == 200){
        commit('GETGOODINFO',result.data)
    }
    },
    // 将产品加入到购物车
    async  addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 服务器没有返回其它数据，不需要在state里存储其它数据
        // async函数执行一定是一个Promise函数【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    console.log('addOrUpdateShopCart',result)
    // 加入成功
    if(result.code == 200){
        return 'ok'
    }else{//加入失败
        return Promise.reject(new Error('faile'))
    }
    },
}
const getters ={
    // 导航/面包屑
    categoryView(state){
        return state.goodInfo.categoryView || {} // 当没有数据时  undefined || {}  以防没数据时报undefined的错误
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {} 
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}