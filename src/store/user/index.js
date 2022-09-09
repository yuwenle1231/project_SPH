import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token' //封装的方法
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 把仓库中相关用户信息和本地存储的信息清空
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码
   async  getCode({commit},phone){
      let result = await reqGetCode(phone)
    //   console.log(result);  以下只是为了测试
    if(result.code == 200){
        commit('GETCODE',result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    },
    // 注册
   async  userRegister({commit},user){
  let result = await reqUserRegister(user)
        console.log('注册是否成功',result);
        if(result.code == 200){
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    },
    // 登录
   async  userLogin({commit},data){
        let result = await reqUserLogin(data)
        // console.log(result);
        if(result.code == 200){
            // 用户登录成功并且获取到token    存在vuex里面并非持久化的存储  所以
            commit('USERLOGIN',result.data.token)
            // 持续化存储  在utils里封装的setToken  就是localStorage.setItem
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
   async  getUserInfo({commit}){
    let result =  await reqUserInfo()
        // console.log('获取用户信息',result);
        if(result.code == 200){
            // 提交用户信息
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
   async userLogout({commit}){
    // 通知服务器清楚token
    let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}