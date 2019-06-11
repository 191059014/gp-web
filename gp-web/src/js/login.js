import { login } from '../api/system';
export default {
  data() {
    return {
      logining: false,
      AgentDO: {
        agentName: "",
        password: ""
      },
      loginRules: {
        agentName: [{ required: true, message: "请输入账号", trigger: "blur" }],
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
      debugger;
      this.$refs.AgentDO.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            agentName: this.AgentDO.agentName,
            password: this.AgentDO.password
          };
          login(loginParams)
            .then(data => {
              this.logining = false;
              let { msg, code } = data;
              if (code == ResponseEnum.LOGIN_SUCCESS.code) {
                this.$message({ message: msg, type: "info" });
                sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(data.obj));
                this.$router.push({ path: "/workbench" });
              } else {
                this.$message({ message: msg, type: "error" });
              }
            })
            .catch(err => {
              this.$message({ message: ResponseEnum.ERROR.msg, type: "error" });
            });
        } else {
          console.log("validate failed!");
          return false;
        }
      });
    }
  }
};