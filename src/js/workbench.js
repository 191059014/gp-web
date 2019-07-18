export default {
  data() {
    return {
      loginUserName: "",
      sysName: "后台管理系统",
      collapsed: false
    };
  },
  methods: {
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("user");
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
    this.loginUserName = sessionStorage.getItem(USER_SESSION_KEY_agentName);
  }
};