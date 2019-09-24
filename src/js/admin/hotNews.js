import { getHotNewsListPage, addHotNews, updateHotNews, deleteHotNewsById } from '../../api/system';

export default {
  data() {
    return {
      filters: {
        title: "",
        content: ""
      },
      hotNewsList: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormLabelWidth: '120px',
      editFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        title: "",
        content: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormLabelWidth: '120px',
      addFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        title: "",
        content: ""
      },
      editRoleVisible: false,
      editRoleLoading: false,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryStockListPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryStockListPage();
    },
    //获取用户列表
    queryHotNewsListPage() {
      let bodyParam = {
        name: this.filters.name,
        code: this.filters.code,
        state: this.filters.state
      };
      this.listLoading = true;
      getHotNewsListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.total = res.total;
          this.hotNewsList = res.obj;
          this.listLoading = false;
        } else {
          this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
        }
      }).catch(err => {
      });
    },
    handleReset: function () {
      this.filters = {
        title: "",
        content: ""
      }
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm("确认删除该资讯吗?", "提示", {
        type: "warning"
      }).then(() => {
          this.listLoading = true;
          let id = row.id;
          deleteHotNewsById(id).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.listLoading = false;
              this.$message({ message: '删除成功', type: 'success' });
              this.queryHotNewsListPage();
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
        title: "",
        content: ""
      }
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          let bodyParam = Object.assign({}, this.editForm);
          updateHotNews(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.editLoading = false;
              this.$message({ message: '修改成功', type: 'success' });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.queryHotNewsListPage();
            } else {
              this.editLoading = false;
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
          addHotNews(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.addLoading = false;
              this.$message({ message: '添加成功', type: 'success' });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.queryHotNewsListPage();
            } else {
              this.$message({ message: res.msg, type: 'error' });
              this.addLoading = false;
            }
          }).catch(err => {
            this.addLoading = false;
            this.addFormVisible = true;
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
    this.queryHotNewsListPage();
  }
};