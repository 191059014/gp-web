import store from '../vuex/store'
import router from '../router'
import axios from 'axios'
import { Message } from 'element-ui';
// 成功的代码
window.ResponseEnum = {
    SUCCESS: { code: '10000', msg: '成功' },
    ERROR: { code: '99999', msg: '系统异常，请稍后再试' },
    LOGIN_SUCCESS: { code: '90100', msg: '登录成功' },
    NO_SESSION: { code: '90199', msg: '登录超时，请重新登陆' }
};

// 用户缓存key
window.USER_SESSION_KEY = "LOGIN_USER_INFO_";
// 用户缓存过期时间
window.USER_SESSION_EXIRE_TIME = 600;

router.beforeEach((to, from, next) => {
    debugger;
    if (to.path != '/login') {  // 非登陆页面
        if (store.state.AgentDO.agentId) {  // 通过vuex state获取当前的agentId是否存在
            next();
        } else {
            Message({ message: ResponseEnum.NO_SESSION.msg, type: "error" });
            next({
                path: '/login',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    config.headers.common.Authorization = store.state.AgentDO.agentId;
    return config;
}, function (error) {
    // 请求失败的处理
    Message({ message: ResponseEnum.ERROR.msg, type: "error" });
    return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    debugger;
    if (401 == error.response.status) {
        Message({ message: ResponseEnum.NO_SESSION.msg, type: "error" });
        router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
        });
        return;
    }
    Message({ message: ResponseEnum.ERROR.msg, type: "error" });
    // 处理响应失败
    return Promise.reject(error);
});