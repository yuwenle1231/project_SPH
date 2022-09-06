import { v4 as uuidv4 } from 'uuid'
export const getUUID = () =>{
    // 思路  .js内部先判断localStorage有无uuid_token,有的话则返回uuid_token，否则返回uuid（）

    // 生成一个随机字符串，且每次执行不能发送变化，游客身份持久存储
    // 1、先从本地存储获取uuid（判断是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        // 2、如果没有就生成并保存
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 一定要有返回值，不然是undefined
    return uuid_token
}