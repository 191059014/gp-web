import router from '../router'

router.beforeEach((to, from, next) => {
    debugger;
    if (to.path != '/login') {  // 非登陆页面
        if (sessionStorage.getItem(USER_SESSION_KEY_agentId)) {  // 通过vuex state获取当前的agentId是否存在
            next();
        } else {
            this.$message({ message: ResponseEnum.NO_SESSION.msg, type: "error" });
            next({
                path: '/login',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})