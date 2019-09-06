<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="股票名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.code" placeholder="股票代码"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filters.state" placeholder="请选择状态">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryStockListPage">查询</el-button>
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
      :data="stockList"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="code" label="代码" ></el-table-column>
      <el-table-column prop="state" label="状态" :formatter="formatState"></el-table-column>
      <el-table-column prop="full_code" label="股票查询代码" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="股票ID" :label-width="editFormLabelWidth" style="display:none;">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="股票名称" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="股票查询代码" :label-width="editFormLabelWidth">
          <el-input v-model="editForm.full_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="editFormLabelWidth">
          <el-select v-model="editForm.state" placeholder="请审核">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <el-form-item label="股票名称" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="股票查询代码" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.full_code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script src="../../js/admin/stockManage.js"></script>

<style>
@import "../../css/admin/stockManage.css";
</style>
