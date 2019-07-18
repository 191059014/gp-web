<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.permissionName" placeholder="权限名称"></el-input>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="filters.sourceType" placeholder="请选择资源类型">
            <el-option
              v-for="item in sourceTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryPermissionListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleImport">导入最新菜单权限</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="permissionList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="permissionId" label="权限ID" style="width:10%"></el-table-column>
      <el-table-column prop="permissionName" label="权限名称" style="width:10%"></el-table-column>
      <el-table-column
        prop="sourceType"
        label="资源类型"
        style="width:10%"
        :formatter="formatSourceType"
      ></el-table-column>
      <el-table-column prop="permissionValue" label="权限值" style="width:10%"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width:10%"></el-table-column>
      <!-- <el-table-column label="操作" style="width:20%">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>-->
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
        <el-form-item label="权限ID" :label-width="editFormLabelWidth" style="display:none;">
          <el-input v-model="editForm.permissionId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.permissionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" :label-width="editFormLabelWidth">
          <el-select v-model="editForm.sourceType" placeholder="请选择资源类型">
            <el-option
              v-for="item in sourceTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限值" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.permissionValue" autocomplete="off"></el-input>
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
        <el-form-item label="权限名称" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.permissionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" :label-width="addFormLabelWidth">
          <el-select v-model="addForm.sourceType" placeholder="请选择资源类型">
            <el-option
              v-for="item in sourceTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限值" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.permissionValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="../../js/admin/permissionManage.js"></script>

<style>
@import "../../css/admin/permissionManage.css";
</style>
