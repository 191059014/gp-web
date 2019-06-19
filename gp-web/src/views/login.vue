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
    <el-form-item prop="mobile">
      <el-input type="text" v-model="AgentDO.mobile" auto-complete="off" placeholder="手机号"></el-input>
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

<script src="../js/login.js"></script>

<style>
  @import "../css/login.css";
</style>