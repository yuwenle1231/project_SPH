// 对于axios的二次封装
import axios from 'axios'
// 引入进度条  nprogress的start：进度条开始；done：进度条结束
import nprogress from 'nprogress'
// 同时引入进度条样式
import 'nprogress/nprogress.css'

// 引入store  
import store from '@/store'


// 利用axios对象的方法create创建一个axios实例
const requests = axios.create({
    // 这是一个配置对象
    // 基础路径，发送请求时，路径当中默认加上/api
    baseURL:'/api',
    // 代表请求超时的时间5s
    timeout:5000,
})
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 进度条开始
    nprogress.start();
    // uuid_token是临时的token
    if(store.state.detail.uuid_token){
      // 请求头添加一个字段（userTempId），与后台商量好了的
      config.headers.userTempId = store.state.detail.uuid_token
    }
    // 真正的token需要发给服务器  请求头添加一个字段（token） 与后台商量好了的
    if(store.state.user.token){
      config.headers.token = store.state.user.token
    }
    return config;
    
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 进度条结束
    nprogress.done();
    console.log('@@@@@@',response.data);
    return response.data;
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });




export default requests;