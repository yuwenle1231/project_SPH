// 对所有的api进行统一管理
import requests from "./request";


// 三级联动接口 /api/product/getBaseCategoryList   get请求 无参数

export const reqCategoryList = () => {
    // 发送请求，axios发送请求返回的是一个promise对象
return  requests({url:'/product/getBaseCategoryList',method:'get'})
// url  因为baseURL写了'/api' , 这里就可以简写了   这里箭头函数也可以简写
}