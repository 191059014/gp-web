<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.userName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryCustomerFundListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="customerFundList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="userName" label="客户姓名" style="width:5%"></el-table-column>
      <el-table-column prop="agentName" label="代理商姓名" style="width:6%"></el-table-column>
      <el-table-column prop="accountTotalMoney" label="账户总金额" style="width:20%"></el-table-column>
      <el-table-column prop="freezeMoney" label="提现冻结" style="width:15%"></el-table-column>
      <el-table-column prop="tradeFreezeMoney" label="交易冻结" style="width:15%"></el-table-column>
      <el-table-column prop="usableMoney" label="可用余额" style="width:6%"></el-table-column>
      <el-table-column prop="totalRechargeMoney" label="累计充值" style="width:6%"></el-table-column>
      <el-table-column prop="totalWithdrawMoney" label="累计提现" style="width:5%"></el-table-column>
      <el-table-column prop="totalProfitAndLossMoney" label="累计净盈亏" style="width:5%"></el-table-column>
      <el-table-column prop="totalMessageServiceMoney" label="累计信息服务费" style="width:13%"></el-table-column>
      <el-table-column prop="totalInAndOutMoney" label="累计出入金额" style="width:13%"></el-table-column>
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

<script src="../../js/customerManage/customerFund.js"></script>

<style>
@import "../../css/customerManage/customerFund.css";
</style>
