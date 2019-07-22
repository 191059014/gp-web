<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.agentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryAgentListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleReport(0)">导出当前页数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleReport(1)">导出全部数据</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="agentList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="agentId" label="代理商ID" style="width:10%"></el-table-column>
      <el-table-column prop="agentName" label="代理商名称" style="width:10%"></el-table-column>
      <el-table-column
        prop="agentLevel"
        label="代理商等级"
        style="width:10%"
        :formatter="formatAgentLevel"
      ></el-table-column>
      <el-table-column prop="bankName" label="银行名称" style="width:10%"></el-table-column>
      <el-table-column prop="bankNo" label="银行卡号" style="width:10%"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号" style="width:10%"></el-table-column>
      <el-table-column
        prop="realAuthStatus"
        label="实名认证状态"
        style="width:10%"
        :formatter="formatRealAuthStatus"
      ></el-table-column>
      <el-table-column prop="mobile" label="手机号" style="width:10%"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width:15%"></el-table-column>
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

<script src="../../js/settleAccountManage/agentReport.js"></script>

<style>
@import "../../css/settleAccountManage/agentReport.css";
</style>
