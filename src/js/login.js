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
                sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(data.obj));
                if (data.obj.unit) {
                  console.log('unit='+this.$store.state.unit);
                  this.$store.state.unit = data.obj.unit;
                  console.log('unit='+this.$store.state.unit);
                }
                // 获取当前用户的权限
                getPermissionSet().then(res => {
                  if (res.code == ResponseEnum.SUCCESS.code) {
                    let permissionArr = [];
                    if (res.obj && res.obj.length > 0) {
                      for (let i in res.obj) {
                        permissionArr.push(res.obj[i]);
                      }
                    }
                    sessionStorage.setItem(CURRENT_AGENT_PERMISSION, permissionArr);
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