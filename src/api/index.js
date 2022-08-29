// 对所有的api进行统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

// 三级联动接口 /api/product/getBaseCategoryList   get请求 无参数

export const reqCategoryList = () => {
    // 发送请求，axios发送请求返回的是一个promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })  // 另一种写法requests.get('url')
    // url  因为baseURL写了'/api' , 这里就可以简写了   这里箭头函数也可以简写
}

//获取banner里的图片数据  简写方式
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
// 获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })

// 获取Search模块数据   /api/list  post请求  需要参数
/*{   参数例子
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// 这里的给服务器传递的params至少是一个空对象(即 调用该函数的时候参数 至少 得有一个空对象)  reqSearchInfo({})
export const reqSearchInfo = (params) => requests({url:'/list',method:'post',data:params})