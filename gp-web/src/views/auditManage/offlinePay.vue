<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select v-model="filters.payStatus" placeholder="请选择支付状态">
            <el-option
              v-for="item in payStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.payType" placeholder="请选择支付类型">
            <el-option
              v-for="item in payTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="offlinePayList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="payId" label="编号" style="width:5%"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" style="width:8%"></el-table-column>
      <el-table-column prop="mobile" label="客户手机" style="width:8%"></el-table-column>
      <el-table-column prop="payMoney" label="支付金额" style="width:5%"></el-table-column>
      <el-table-column prop="payType" label="支付类型" style="width:8%" :formatter="formatPayType"></el-table-column>
      <el-table-column prop="payStatus" label="支付状态" style="width:8%" :formatter="formatPayStatus"></el-table-column>
      <el-table-column prop="createTime" label="发生时间" style="width:15%"></el-table-column>
      <el-table-column prop="bankNo" label="银行卡" style="width:15%"></el-table-column>
      <el-table-column prop="remark" label="备注" style="width:10%"></el-table-column>
      <el-table-column prop="systemRemark" label="管理员备注" style="width:10%"></el-table-column>
      <el-table-column label="操作" style="width:20%">
        #
        <!-- <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
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

<script src="../../js/auditManage/offlinePay.js"></script>

<style>
@import "../../css/auditManage/offlinePay.css";
</style>