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
              v-for="item in payChannelList"
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
      <el-table-column prop="checkId" label="编号" style="width:5%"></el-table-column>
      <el-table-column prop="userName" label="客户名称" style="width:8%"></el-table-column>
      <el-table-column prop="mobile" label="客户手机" style="width:8%"></el-table-column>
      <el-table-column prop="happenMoney" label="发生金额" style="width:5%"></el-table-column>
      <el-table-column prop="payChannel" label="支付渠道" style="width:8%" :formatter="formatPayChannel"></el-table-column>
      <el-table-column prop="payStatus" label="支付状态" style="width:15%" :formatter="formatPayStatus"></el-table-column>
      <el-table-column prop="checkStatus" label="审核状态" style="width:8%" :formatter="formatCheckStatus"></el-table-column>
      <el-table-column prop="remark" label="备注" style="width:10%"></el-table-column>
      <el-table-column prop="systemRemark" label="管理员备注" style="width:10%"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width:10%"></el-table-column>
      <el-table-column label="操作" style="width:20%">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
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

<!--编辑界面-->
    <el-dialog title="修改" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="审核ID" :label-width="editFormLabelWidth" style="display:none;">
          <el-input v-model="editForm.checkId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核" :label-width="editFormLabelWidth">
          <el-select v-model="editForm.checkStatus" placeholder="请审核">
            <el-option
              v-for="item in checkStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员备注" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.systemRemark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">确定修改</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script src="../../js/auditManage/offlinePay.js"></script>

<style>
@import "../../css/auditManage/offlinePay.css";
</style>