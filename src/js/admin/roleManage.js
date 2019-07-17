import { getRoleListPage, addRole, updateRole, deleteRoleById } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                roleName: ""
            },
            roleList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormLabelWidth: '120px',
            editFormRules: {
                roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
                description: [{ required: true, message: "请输入描述", trigger: "blur" }]
            },
            //编辑界面数据
            editForm: {
                roleName: "",
                description: ""
            },

            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormLabelWidth: '120px',
            addFormRules: {
                roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
                description: [{ required: true, message: "请输入描述", trigger: "blur" }]
            },
            //新增界面数据
            addForm: {
                roleName: "",
                description: ""
            }
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
        //获取角色列表
        queryRoleListPage() {
            let bodyParam = {
                roleName: this.filters.roleName
            };
            this.listLoading = true;
            getRoleListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.roleList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                roleName: ""
            }
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm("确认删除该角色吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.listLoading = true;
                    let roleId = row.roleId;
                    deleteRoleById(roleId).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.listLoading = false;
                            this.$message({ message: '删除成功', type: 'success' });
                            this.queryRoleListPage();
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
                roleName: "",
                description: ""
            }
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.editLoading = true;
                    let bodyParam = Object.assign({}, this.editForm);
                    updateRole(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.editLoading = false;
                            this.$message({ message: '修改成功', type: 'success' });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.queryRoleListPage();
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
                    addRole(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.addLoading = false;
                            this.$message({ message: '添加成功', type: 'success' });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.queryRoleListPage();
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
        }
    },
    mounted() {
        this.queryRoleListPage();
    }
};