import { getAgentListPage, addAgent, updateAgent, deleteAgentById, findRoleTree, batchInsertAgentRole } from '../../api/system';

export default {
  data() {
    return {
      filters: {
        agentName: "",
        mobile: ""
      },
      agentList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      sels: [], //列表选中列
      primaryPassword: "",

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormLabelWidth: '120px',
      editFormRules: {
        agentName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        agentId: "",
        agentName: "",
        password: "",
        mobile: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormLabelWidth: '120px',
      addFormRules: {
        agentName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [{ required: true, message: "请输入确认密码", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        agentName: "",
        password: "",
        confirmPassword: "",
        mobile: ""
      },
      roleTree: [],
      defaultCheckedKeys: [],
      editRoleVisible: false,
      editRoleLoading: false,
      currentAgentId: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryAgentListPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryAgentListPage();
    },
    //获取用户列表
    queryAgentListPage() {
      let bodyParam = {
        agentName: this.filters.agentName,
        mobile: this.filters.mobile
      };
      this.listLoading = true;
      getAgentListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.total = res.total;
          this.agentList = res.obj;
          this.listLoading = false;
        } else {
          this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
        }
      }).catch(err => {
      });
    },
    handleReset: function () {
      this.filters = {
        agentName: "",
        mobile: ""
      }
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm("确认删除该用户吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let agentId = row.agentId;
          deleteAgentById(agentId).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.listLoading = false;
              this.$message({ message: '删除成功', type: 'success' });
              this.queryAgentListPage();
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
      this.primaryPassword = row.password;
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        agentName: "",
        password: "",
        confirmPassword: "",
        mobile: ""
      }
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          let bodyParam = Object.assign({}, this.editForm);
          if (this.primaryPassword == this.editForm.password) {
            bodyParam.password = null;
          }
          updateAgent(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.editLoading = false;
              this.$message({ message: '修改成功', type: 'success' });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.queryAgentListPage();
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
          delete bodyParam.confirmPassword;
          addAgent(bodyParam).then((res) => {
            if (res.code == ResponseEnum.SUCCESS.code) {
              this.addLoading = false;
              this.$message({ message: '添加成功', type: 'success' });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.queryAgentListPage();
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
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", { type: "warning" })
        .then(() => { })
        .catch(() => { });
    },
    handleRole: function (index, row) {
      this.defaultCheckedKeys=row.roleIdSet;
      this.editRoleVisible = true;
      this.currentAgentId = row.agentId;
    },
    editRoleSubmit: function () {
      let roleIdArr = this.$refs.tree.getCheckedKeys();
      batchInsertAgentRole(roleIdArr, this.currentAgentId).then(res => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.$message({ message: '修改成功', type: 'success' });
          this.editRoleVisible = false;
          this.queryAgentListPage();
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
    },
    loadRoleTree: function () {
      findRoleTree().then(res => {
        this.roleTree = res.obj;
      })
    }
  },
  mounted() {
    this.queryAgentListPage();
    this.loadRoleTree();
  }
};