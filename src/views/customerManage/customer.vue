<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.userName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryUserListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="userList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="userName" label="客户名称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
      <el-table-column
              prop="realAuthStatus"
              label="实名认证状态"
              style="width:5%"
              :formatter="formatRealAuthStatus"
            ></el-table-column>
      <el-table-column prop="inviterMobile" label="邀请人手机号"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="bankNo" label="银行卡号"></el-table-column>
      <el-table-column prop="accountBank" label="开户行地址"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width:13%"></el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="10"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="float:right;"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script src="../../js/customerManage/customer.js"></script>

<style>
@import "../../css/customerManage/customer.css";
</style>
