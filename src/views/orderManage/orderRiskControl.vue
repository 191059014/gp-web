<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.userName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryOrderListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="orderList" highlight-current-row v-loading="listLoading" :cell-class-name="setCellStyle" style="width: 100%;">
      <el-table-column prop="userName" label="客户姓名" style="width:5%">
        <el-table-column
          prop="mobile"
          label="手机号"
          style="width:6%"
          :formatter="formatUserNameAndMobile"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="stockCode" label="股票代码" style="width:5%">
        <el-table-column
          prop="stockName"
          label="股票名称"
          style="width:6%"
          :formatter="formatStockCodeAndStockName"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="buyNumber" label="买入股数" style="width:5%"></el-table-column>
      <el-table-column prop="buyPrice" label="买入价格" style="width:6%">
        <el-table-column
          prop="buyPriceTotal"
          label="买入总金额"
          style="width:6%"
          :formatter="formatBuyPriceAndBuyPriceTotal"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="strategyOwnMoney" label="策略本金" style="width:5%">
        <el-table-column
          prop="strategyMoney"
          label="策略金额"
          style="width:6%"
          :formatter="formatStrategyOwnMoneyAndStrategyMoney"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="stopEarnMoney" label="止盈价格" style="width:5%">
        <el-table-column
          prop="stopLossMoney"
          label="止损价格"
          style="width:6%"
          :formatter="formatStopEarnMoneyAndStopLossMoney"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="serviceMoney" label="信息服务费" style="width:5%">
        <el-table-column prop="delayMoney" label="递延金" style="width:6%" :formatter="formatServiceMoneyAndDelayMoney"></el-table-column>
      </el-table-column>
      <el-table-column prop="buyTime" label="买入时间" style="width:5%"></el-table-column>
      <el-table-column prop="currentPrice" label="当前价格" :formatter="formatPrice"></el-table-column>
      <el-table-column prop="profit" label="浮动盈亏"></el-table-column>
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

<script src="../../js/orderManage/orderRiskControl.js"></script>

<style>
@import "../../css/orderManage/orderRiskControl.css";
</style>