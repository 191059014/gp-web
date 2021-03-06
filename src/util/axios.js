import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router/index'

/**
 * axios相关设置
 */
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 30000
})

// 请求拦截（配置发送请求的信息）
service.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    let agentId = "";
    let userInfo = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
    if (userInfo) {
        agentId = JSON.parse(userInfo).agentId;
    }
    config.headers.common.Authorization = agentId;
    return config;
}, function (error) {
    // 请求失败的处理
    Message({ message: ResponseEnum.ERROR.msg, type: "error" });
    return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
service.interceptors.response.use(function (response) {
    if (response.data.code == ResponseEnum.NO_SESSION.code) {
        Message({ message: ResponseEnum.NO_SESSION.msg, type: 'error' });
        router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
        });
        return;
    }
    return response;
}, function (error) {
    Message({ message: ResponseEnum.ERROR.msg, type: "error" });
    // 处理响应失败
    return Promise.reject(error);
});

export default service 
