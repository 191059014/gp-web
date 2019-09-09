<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        :span="10"
        class="logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link userinfo-inner">欢迎 {{loginUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updatePassword" icon="el-icon-edit">修改密码</el-dropdown-item>
            <el-dropdown-item command="balancesExtracted" icon="el-icon-minus">余额提取</el-dropdown-item>
            <el-dropdown-item command="realNameAuth" icon="el-icon-user-solid">实名认证</el-dropdown-item>
            <el-dropdown-item command="bindBankCard" icon="el-icon-bank-card">绑定银行卡</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical"
          unique-opened
          router
          v-show="!collapsed"
        >
          <template v-for="(item,index) in $router.options.routes">
            <template v-if="!item.hidden">
              <template v-if="permissionSet && permissionSet.indexOf(item.meta.permissionValue)>-1">
                <el-submenu :index="index+''" :key="index">
                  <template slot="title">
                    <i :class="item.iconCls"></i>
                    {{item.name}}
                  </template>
                  <template v-for="child in item.children">
                    <template v-if="permissionSet && permissionSet.indexOf(child.meta.permissionValue)>-1">
                      <el-menu-item :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
            </template>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

    <!--修改密码界面-->
    <el-dialog title="修改密码" :visible.sync="updatePasswordFormVisible">
      <el-form :model="updatePasswordForm">
        <el-form-item label="原密码" :label-width="editFormLabelWidth">
          <el-input v-model="updatePasswordForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="editFormLabelWidth">
          <el-input v-model="updatePasswordForm.newPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="editFormLabelWidth">
          <el-input v-model="updatePasswordForm.confirmNewPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePasswordSubmit" :loading="updatePasswordLoading">确定修改</el-button>
      </div>
    </el-dialog>

    <!--实名认证界面-->
    <el-dialog title="实名认证" :visible.sync="idCardRealNameFormVisible">
      <el-form :model="idCardRealNameForm">
        <el-form-item label="真实姓名" :label-width="idCardRealNameWidth">
          <el-input v-model="idCardRealNameForm.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="editFormLabelWidth">
          <el-input v-model="idCardRealNameForm.idCardNo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="idCardRealNameFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="idCardRealNameSubmit" :loading="idCardRealNameLoading">确定</el-button>
      </div>
    </el-dialog>

    <!--绑定银行卡界面-->
    <el-dialog title="绑定银行卡" :visible.sync="bindBankCardFormVisible">
      <el-form :model="bindBankCardForm">
        <el-form-item label="银行卡号" :label-width="bindBankCardWidth">
          <el-input v-model="bindBankCardForm.bankNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="bindBankCardWidth">
          <el-input v-model="bindBankCardForm.bankName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindBankCardFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindBankCardSubmit" :loading="bindBankCardLoading">绑定</el-button>
      </div>
    </el-dialog>

    <!--余额提取界面-->
    <el-dialog title="余额提取" :visible.sync="balancesExtractedFormVisible">
      <el-form :model="balancesExtractedForm">
        <el-form-item label="余额" :label-width="balancesExtractedWidth">
          <el-input v-model="balance" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="提取金额" :label-width="balancesExtractedWidth">
          <el-input v-model="balancesExtractedForm.extractedMoney" @input="checkNumber(balancesExtractedForm.extractedMoney)" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="balancesExtractedFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="balancesExtractedSubmit" :loading="balancesExtractedLoading">绑定</el-button>
      </div>
    </el-dialog>

  </el-row>

</template>

<script src="../js/workbench.js"></script>

<style>
@import "../css/workbench.css";
</style>