export default {
  data() {
    return {
      loginUserName: "",
      sysName: "后台管理系统",
      collapsed: false,
      permissionSet: []
    };
  },
  methods: {
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem(USER_SESSION_KEY_agentId);
        _this.$router.push("/login");
      })
        .catch(() => { });
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    }
  },
  mounted() {
    // 当前登陆用户名
    let userInfo = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
    if (userInfo && userInfo.length > 0) {
      this.loginUserName = JSON.parse(userInfo).agentName;
    }
    // 权限列表
    let permissionStr = sessionStorage.getItem(CURRENT_AGENT_PERMISSION);
    if (permissionStr && permissionStr.length > 0) {
      this.permissionSet = permissionStr.split(",");
    }
    debugger;
  }
};