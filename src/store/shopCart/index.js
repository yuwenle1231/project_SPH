import { reqCartList, reqDeleteCartById,reqUpdateCheckedById } from '@/api'
const state = {
    cartList: []
}
const mutations = {
    GEYCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log("getCartList", result);
        if (result.code == 200) {
            commit('GEYCARTLIST', result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        // 删除成功
        if (result.code == 200) {
            return 'ok'
        } else {//删除失败
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的选中状态
   async updateCheckedById({ commit }, {skuId,isChecked}){
       let result =  await reqUpdateCheckedById(skuId,isChecked)
            // 删除成功
            if (result.code == 200) {
                return 'ok'
            } else {//删除失败
                return Promise.reject(new Error('faile'))
            }
    },
    // 删除全部勾选的商品的信息
    // context（该小仓库） 上下文里有commit，（提交mutations修改state）， dispatch，getters，state，等等 
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            // console.log(111),数组里有几个信息就调用几次
         let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId) : ''
         PromiseAll.push(promise)
        });
        // 如果p1,p2....全部成功，Promise.all才返回成功的结果，如果有一个失败，就返回失败的结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            if (item.isChecked != isChecked){
                let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
                PromiseAll.push(promise)
            }
        });
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // cartInfoList(){
    //     return 
    // }
}
export default {
    state,
    mutations,
    actions,
    getters
}