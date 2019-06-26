<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.userName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.agentName" placeholder="代理商姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryCustomerFundDetailListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="customerFundDetailList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="userName" label="客户姓名" style="width:5%"></el-table-column>
      <el-table-column prop="agentName" label="代理商姓名" style="width:6%"></el-table-column>
      <el-table-column prop="happenMoney" label="发生金额" style="width:20%"></el-table-column>
      <el-table-column prop="afterHappenMoney" label="发生后金额" style="width:15%"></el-table-column>
      <el-table-column prop="fundType" label="资金类型" style="width:6%" :formatter="formatFundType"></el-table-column>
      <el-table-column prop="remark" label="备注" style="width:6%"></el-table-column>
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

<script src="../../js/customerManage/customerFundDetail.js"></script>

<style>
@import "../../css/customerManage/customerFundDetail.css";
</style>
