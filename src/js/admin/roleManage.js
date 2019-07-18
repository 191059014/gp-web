import { getRoleListPage, addRole, updateRole, deleteRoleById, batchInsertRolePermission } from '../../api/system';

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
            },

            permissionTree: [],
            editPermissionVisible: false,
            editPermissionLoading: false,
            currentRoleId: ""
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
            console.info(this.$router.options.routes);
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
        },
        handleEditPermission: function (index, row) {
            this.editPermissionVisible = true;
            this.currentRoleId = row.roleId;
        },
        editPermissionSubmit: function () {
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            let permissionArr = [];
            for (let i in checkedKeys) {
                let permissionValue = checkedKeys[i];
                let arr = permissionValue.split(":");
                if (permissionArr.indexOf(arr[0]) < 0) {
                    permissionArr.push(arr[0]);
                }
                if (arr.length > 1) {
                    let second = arr[0] + ":" + arr[1];
                    if (permissionArr.indexOf(second) < 0) {
                        permissionArr.push(second);
                    }
                }
                if (arr.length > 2) {
                    let third = arr[0] + ":" + arr[1] + ":" + arr[2];
                    if (permissionArr.indexOf(third) < 0) {
                        permissionArr.push(third);
                    }
                }
            }
            batchInsertRolePermission(permissionArr, this.currentRoleId).then(res => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.$message({ message: '批量添加成功', type: 'success' });
                    editPermissionVisible = false;
                } else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            })
        },
        loadPermissionTree: function () {
            let routes = this.$router.options.routes;
            // 一级菜单
            for (let i in routes) {
                if (routes[i].path != '/') {
                    continue;
                }
                let firstNode = {};
                firstNode.id = routes[i].meta.permissionValue;
                firstNode.label = routes[i].name;
                let childrens = routes[i].children;
                // 二级菜单
                if (childrens && childrens.length > 0) {
                    let secondNodeArr = [];
                    for (let j in childrens) {
                        let secondNode = {};
                        secondNode.id = childrens[j].meta.permissionValue;
                        secondNode.label = childrens[j].name;
                        let operators = childrens[j].meta.operators
                        // 三级菜单
                        let thirdNodeArr = [];
                        if (operators && operators.length > 0) {
                            for (let m in operators) {
                                let thirdNode = {};
                                thirdNode.id = operators[m].permissionValue,
                                    thirdNode.label = operators[m].permissionName,
                                    thirdNodeArr[m] = thirdNode;
                            }
                        }
                        secondNode.children = thirdNodeArr;
                        secondNodeArr[j] = secondNode;
                    }
                    firstNode.children = secondNodeArr;
                }
                this.permissionTree.push(firstNode);
            }
        }
    },
    mounted() {
        this.queryRoleListPage();
        this.loadPermissionTree();
    }
};