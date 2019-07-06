<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.agentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getAgentFundList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="agentFundList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="agentId" label="代理商编号" style="width:15%"></el-table-column>
      <el-table-column prop="agentName" label="代理商名称" style="width:15%"></el-table-column>
      <el-table-column prop="accountTotalMoney" label="账户总金额" style="width:15%"></el-table-column>
      <el-table-column prop="freezeMoney" label="冻结金额" style="width:15%"></el-table-column>
      <el-table-column prop="usableMoney" label="可用余额" style="width:20%"></el-table-column>
      <el-table-column prop="remark" label="备注" style="width:20%"></el-table-column>
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

<script src="../../js/agentManage/agentFund.js"></script>

<style>
@import "../../css/agentManage/agentFund.css";
</style>
