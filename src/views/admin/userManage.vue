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
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="agentList"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column prop="agentName" label="姓名" sortable></el-table-column>
      <el-table-column prop="mobile" label="手机号" sortable></el-table-column>
      <el-table-column prop="unit" label="代理商编制" sortable></el-table-column>
      <el-table-column
              prop="agentLevel"
              label="代理商等级"
              :formatter="formatAgentLevel"
            ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" sortable></el-table-column>
      <el-table-column label="操作" min-width="150px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" @click="editRole(scope.$index, scope.row)">编辑角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
        <el-form-item label="用户名" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.agentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="addFormLabelWidth">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
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
        <el-form-item label="手机号" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口令" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.key" autocomplete="off" placeholder="如果新增二级代理商，则需填写"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!--角色界面-->
    <el-dialog title="角色树" :visible.sync="editRoleVisible">
      <el-tree
        :data="roleTree"
        :default-checked-keys="defaultCheckedKeys"
        show-checkbox
        node-key="id"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleSubmit" :loading="editRoleLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="../../js/admin/userManage.js"></script>

<style>
@import "../../css/admin/userManage.css";
</style>
