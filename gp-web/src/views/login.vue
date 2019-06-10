<template>
  <el-form
    :model="AgentDO"
    :rules="loginRules"
    ref="AgentDO"
    label-position="left"
    label-width="0px"
    class="login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="agentName">
      <el-input type="text" v-model="AgentDO.agentName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="AgentDO.password" auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item style="width:100%;padding-top:20px;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleSubmit"
        :loading="logining"
      >登录</el-button>
      <!-- <el-button @click.native.prevent="handleReset">重置</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
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
</script>

<style>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 25px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>