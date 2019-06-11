// 成功的代码
window.ResponseEnum = {
    SUCCESS: { code: '10000', msg: '成功' },
    ERROR: { code: '99999', msg: '系统异常，请稍后再试' },
    LOGIN_SUCCESS: { code: '90100', msg: '登录成功' }
};

// 用户缓存key
window.USER_SESSION_KEY = "LOGIN_USER_INFO_";
// 用户缓存过期时间
window.USER_SESSION_EXIRE_TIME = 600;