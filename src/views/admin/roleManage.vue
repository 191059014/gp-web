<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryRoleListPage">查询</el-button>
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
    <el-table :data="roleList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="roleId" label="角色ID" style="width:10%"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" style="width:10%"></el-table-column>
      <el-table-column prop="description" label="描述" style="width:10%"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width:10%"></el-table-column>
      <el-table-column label="操作" style="width:20%">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" @click="handleEditPermission(scope.$index, scope.row)">编辑权限</el-button>
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
        <el-form-item label="角色ID" :label-width="editFormLabelWidth" style="display:none;">
          <el-input v-model="editForm.roleId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.description" autocomplete="off"></el-input>
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
        <el-form-item label="角色名称" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!--权限界面-->
    <el-dialog title="权限树" :visible.sync="editPermissionVisible">
      <el-tree
        :data="permissionTree"
        :default-checked-keys="defaultCheckedKeys"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editHandlerCancel">取 消</el-button>
        <el-button type="primary" @click="editPermissionSubmit" :loading="editPermissionLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="../../js/admin/roleManage.js"></script>

<style>
@import "../../css/admin/roleManage.css";
</style>
