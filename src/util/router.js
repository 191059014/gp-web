import router from '../router'
import { Message } from 'element-ui';

router.beforeEach((to, from, next) => {
    if (to.path != '/login') {  // 非登陆页面
        if (sessionStorage.getItem(CURRENT_USER_SESSION_KEY)) {  // 判断当前的用户会话是否存在
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