import { login } from '../api/system';
export default {
  data() {
    return {
      logining: false,
      AgentDO: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
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
            userName: this.AgentDO.userName,
            password: this.AgentDO.password
          };
          login(loginParams)
            .then(data => {
              this.logining = false;
              let { msg, code } = data;
              debugger;
              if (code == ResponseEnum.LOGIN_SUCCESS.code) {
                // 将登陆信息放入缓存
                this.$store.commit('setLoginInfo', data.obj.userId, data.obj.agentName, data.obj.password);
                this.$router.push({ path: "/workbench" });
                this.$message({ message: msg, type: "success" });
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