import { login, getPermissionSet } from '../api/system';
export default {
  data() {
    return {
      logining: false,
      AgentDO: {
        mobile: "",
        password: ""
      },
      loginRules: {
        mobile: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleReset() {
      this.$refs.AgentDO.resetFields();
    },
    handleSubmit(ev) {
      this.$refs.AgentDO.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            mobile: this.AgentDO.mobile,
            password: this.AgentDO.password
          };
          login(loginParams)
            .then(data => {
              this.logining = false;
              let { msg, code } = data;
              debugger;
              if (code == ResponseEnum.LOGIN_SUCCESS.code) {
                // 将登陆信息放入缓存
                sessionStorage.setItem(USER_SESSION_KEY_agentId, data.obj.agentId);
                sessionStorage.setItem(USER_SESSION_KEY_agentName, data.obj.agentName);
                // 获取当前用户的权限
                getPermissionSet().then(res => {
                  if (res.code == ResponseEnum.SUCCESS.code) {
                    sessionStorage.setItem(CURRENT_AGENT_PERMISSION, res.obj);
                    this.$router.push({ path: "/workbench" });
                    this.$message({ message: msg, type: "success" });
                  } else {
                    this.$message({ message: res.msg, type: "error" });
                  }
                  debugger;
                }).catch(err => {
                  this.$message({ message: '获取当前用户权限失败', type: "error" });
                });
              } else {
                this.$message({ message: msg, type: "error" });
              }
            }).catch(err => {
              this.logining = false;
            });
        } else {
          console.log("validate failed!");
          return false;
        }
      });
    }
  }
};