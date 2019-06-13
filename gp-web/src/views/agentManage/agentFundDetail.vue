<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="代理商名称">
          <el-input v-model="filters.agentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="资金类型">
          <el-select v-model="filters.type" placeholder="请选择资金类型">
            <el-option
              v-for="item in fundTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="filters.createTimeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getAgentFundDetailList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="agentFundDetailList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="detailId" label="流水编号" style="width:15%"></el-table-column>
      <el-table-column prop="agentId" label="代理商编号" style="width:15%"></el-table-column>
      <el-table-column prop="agentName" label="代理商名称" style="width:15%"></el-table-column>
      <el-table-column prop="money" label="发生金额" style="width:15%"></el-table-column>
      <el-table-column prop="type" label="资金类型" style="width:15%" :formatter="formatFundType"></el-table-column>
      <el-table-column prop="createTime" label="发生时间" style="width:20%"></el-table-column>
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

<script src="../../js/agentManage/agentFundDetail.js"></script>

<style>
@import "../../css/agentManage/agentFundDetail.css";
</style>
