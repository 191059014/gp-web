import { getStockListPage, addStock, updateStock, deleteStockById, getStockStatusCombobox } from '../../api/system';

export default {
  data() {
    return {
      filters: {
        name: "",
        code: "",
        state: ""
      },
      stateList: [],
      stockList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormLabelWidth: '120px',
      editFormRules: {
        name: [{ required: true, message: "请输入股票名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入股票代码", trigger: "blur" }],
        full_code: [{ required: true, message: "请输入股票查询代码", trigger: "blur" }],
        state: [{ required: true, message: "请输入状态", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "",
        code: "",
        full_code: "",
        state: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormLabelWidth: '120px',
      addFormRules: {
        name: [{ required: true, message: "请输入股票名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入股票代码", trigger: "blur" }],
        full_code: [{ required: true, message: "请输入股票查询代码", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        code: "",
        full_code: ""
      },
      roleTree: [],
      defaultCheckedKeys: [],
      editRoleVisible: false,
      editRoleLoading: false,
      currentAgentId: "",
      initStatus: false
    };
  },
  methods: {
    getStockStatusCombobox: function () {
      getStockStatusCombobox().then(res => {
        this.stateList = res.obj;
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryStockListPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryStockListPage();
    },
    formatState(row, column) {
      for (let i in this.stateList) {
          if (row.state == this.stateList[i].value) {
              return this.stateList[i].name;
          }
      }
      return row.orderStatus;
  },
    //获取用户列表
    queryStockListPage() {
      let bodyParam = {
        name: this.filters.name,
        code: this.filters.code,
        state: this.filters.state
      };
      this.listLoading = true;
      getStockListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.total = res.total;
          this.stockList = res.obj;
          this.listLoading = false;
        } else {
          this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
        }
      }).catch(err => {
      });
    },
    handleReset: function () {
      this.filters = {
        name: "",
        code: "",
        state: ""
      }
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm("确认删除该股票吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let id = row.id;
          deleteStockById(id).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.listLoading = false;
              this.$message({ message: '删除成功', type: 'success' });
              this.queryStockListPage();
            } else {
              this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
            }
          });
        }).catch(err => {
          this.listLoading = false;
        });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        code: "",
        state: ""
      }
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          let bodyParam = Object.assign({}, this.editForm);
          updateStock(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.editLoading = false;
              this.$message({ message: '修改成功', type: 'success' });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.queryStockListPage();
            } else {
              this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
            }
          }).catch(err => {
            this.editLoading = false;
            this.editFormVisible = false;
          });
        }
      });
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          let bodyParam = Object.assign({}, this.addForm);
          addStock(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.addLoading = false;
              this.$message({ message: '添加成功', type: 'success' });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.queryStockListPage();
            } else {
              this.$message({ message: res.msg, type: 'error' });
              this.addLoading = false;
            }
          }).catch(err => {
            this.addLoading = false;
            this.addFormVisible = false;
          });
        }
      });
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //批量删除
  },
  mounted() {
    this.queryStockListPage();
    this.getStockStatusCombobox();
  }
};