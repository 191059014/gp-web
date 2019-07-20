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
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{loginUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-minus">余额提取</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid">实名认证</el-dropdown-item>
            <el-dropdown-item icon="el-icon-bank-card">绑定银行卡</el-dropdown-item>
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
  </el-row>
</template>

<script src="../js/workbench.js"></script>

<style>
@import "../css/workbench.css";
</style>