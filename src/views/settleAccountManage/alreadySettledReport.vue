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
        <el-form-item label="时间">
          <el-date-picker
            v-model="filters.createTimeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="买入开始日期"
            end-placeholder="买入结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryOrderListPage">查询</el-button>
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
    <el-table :data="orderList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column min-width="50px" label="客户姓名">
        <el-table-column
          label="手机号"
          style="width:6%"
          :formatter="formatUserNameAndMobile"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="股票代码" min-width="50px">
        <el-table-column
          label="股票名称"
          min-width="50px"
          :formatter="formatStockCodeAndStockName"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="策略本金" style="width:5%">
        <el-table-column
          label="策略金额"
          min-width="50px"
          :formatter="formatStrategyOwnMoneyAndStrategyMoney"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="买入时间" style="width:5%">
        <el-table-column
          label="卖出时间"
          style="width:6%"
          :formatter="formatBuyTimeAndSellTime"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="order.buyNumber" label="买入股数" min-width="50px"></el-table-column>
      <el-table-column label="买入价格" style="width:5%">
        <el-table-column
          label="卖出价格"
          min-width="50px"
          :formatter="formatBuyBuyPriceAndSellPrice"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="利润" style="width:5%">
        <el-table-column
          label="盈亏率"
          min-width="50px"
          :formatter="formatProfitAndProfitRate"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="止盈价格" style="width:5%">
        <el-table-column
          label="止损价格"
          min-width="50px"
          :formatter="formatStopEarnMoneyAndStopLossMoney"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="信息服务费" style="width:5%">
        <el-table-column
          label="递延金"
          style="width:6%"
          :formatter="formatServiceMoneyAndDelayMoney"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="已递延天数" style="width:5%">
        <el-table-column
          label="递延到期时间"
          style="width:6%"
          :formatter="formatAlreadyDelayDaysAndDelayEndTime"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="order.netProfit" label="净利润" min-width="50px"></el-table-column>
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

    <div class="calcTotal">
      <p class="text-right">合计策略本金：<span>{{strategyMoneyTotal}}</span></p>
      <p class="text-right">合计服务费：<span>{{serviceMoneyTotal}}</span></p>
    </div>
    
  </section>
</template>

<script src="../../js/settleAccountManage/alreadySettledReport.js"></script>

<style>
@import "../../css/settleAccountManage/alreadySettledReport.css";
</style>
