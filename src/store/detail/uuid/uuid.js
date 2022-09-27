import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    // 先从本地存储里面查看，是否有uuid
    // 第一次生成之前，本地存储中是没有的，uuid_token为null
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果uuid_token为null，!uuid_token为true，执行if语句，if语句只会执行一此
    if(!uuid_token){
        uuid_token = uuidv4()
        // 在本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}