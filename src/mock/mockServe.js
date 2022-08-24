// 引入mock
import Mock from 'mockjs'
// 将JSON文件引入
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'
// 参数1：请求地址  参数2：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})