<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.agentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="agentName" label="代理商名称" style="width:8%"></el-table-column>
      <el-table-column prop="agentType" label="代理商类型" style="width:8%" :formatter="formatAgentType"></el-table-column>
      <el-table-column prop="bankName" label="银行名称" style="width:8%"></el-table-column>
      <el-table-column prop="bankNo" label="银行卡号" style="width:10%"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号" style="width:15%"></el-table-column>
      <el-table-column
        prop="realAuthStatus"
        label="实名认证状态"
        style="width:8%"
        :formatter="formatRealAuthStatus"
      ></el-table-column>
      <el-table-column prop="mobile" label="手机号" style="width:8%"></el-table-column>
      <el-table-column prop="inviteCode" label="邀请码" style="width:5%"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" style="width:15%"></el-table-column>
      <el-table-column label="操作" style="width:15%">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="用户ID" :label-width="editFormLabelWidth" style="display:none;">
          <el-input v-model="editForm.agentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.inviteCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">确定修改</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label="用户名" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.agentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="../../js/agentManage/agent.js"></script>

<style>
@import "../../css/agentManage/agent.css";
</style>
