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
          login(loginParams).then(data => {
            this.logining = false;
            let { msg, code} = data;
            if (code !== responseCode.SUCCESS.code) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ path: "/table" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};