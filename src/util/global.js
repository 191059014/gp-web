// 成功的代码
ResponseEnum = {
    SUCCESS: { code: '10000', msg: '成功' },
    ERROR: { code: '99999', msg: '系统异常，请稍后再试' },
    LOGIN_SUCCESS: { code: '90100', msg: '登录成功' },
    NO_SESSION: { code: '90199', msg: '登录超时，请重新登陆' }
};

// 用户缓存key
CURRENT_USER_SESSION_KEY = "current_login_user_info";
// 当前用户权限
CURRENT_AGENT_PERMISSION = "current_agent_permission";
