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
            defaultCheckedKeys: [],
            editPermissionVisible: false,
            editPermissionLoading: false,
            currentRoleId: "",
            initStatus: false
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
                    this.$message({ message: res.msg, type: 'error' });
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
        closeAllNode: function () {
            // 全部节点关闭展开
            for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
                this.$refs.tree.store._getAllNodes()[i].expanded = false;
            }
        },
        notCheckAllNode: function () {
            // 全部节点取消选中
            this.$refs.tree.store.setCheckedKeys([]);
        },
        editHandlerCancel: function () {
            this.editPermissionVisible = false;
            this.notCheckAllNode();
            this.closeAllNode();
        },
        handleEditPermission: function (index, row) {
            if (row.permissionValueSet && row.permissionValueSet.length > 0) {
                // 如果子节点没有全被选中，则剔除父节点，防止父节点选中导致子节点全选
                // 组织树
                var currentPermissionTree = [];
                // 一级节点
                for (let i in row.permissionValueSet) {
                    let permissionValue = row.permissionValueSet[i];
                    let arrLength = permissionValue.split(":").length;
                    if (arrLength == 1) {
                        let firstNode = {};
                        firstNode.id = permissionValue;
                        currentPermissionTree.push(firstNode);
                    }
                }
                // 二级节点
                for (let i in row.permissionValueSet) {
                    let permissionValue = row.permissionValueSet[i];
                    let arr = permissionValue.split(":");
                    let arrLength = arr.length;
                    if (arrLength == 2) {
                        for (let j in currentPermissionTree) {
                            if (arr[0] == currentPermissionTree[j].id) {
                                let secondNodeArr = currentPermissionTree[j].children;
                                if (secondNodeArr) {
                                    let newSecondNode = {};
                                    newSecondNode.id = permissionValue;
                                    secondNodeArr.push(newSecondNode);
                                } else {
                                    let newSecondNodeArr = [];
                                    let newSecondNode = {};
                                    newSecondNode.id = permissionValue;
                                    newSecondNodeArr.push(newSecondNode);
                                    currentPermissionTree[j].children = newSecondNodeArr;
                                }
                            }
                        }
                    }
                }
                // 三级节点
                for (let i in row.permissionValueSet) {
                    let permissionValue = row.permissionValueSet[i];
                    let arr = permissionValue.split(":");
                    let arrLength = arr.length;
                    if (arrLength == 3) {
                        let sendcondNodeId = arr[0] + ":" + arr[1];
                        for (let j in currentPermissionTree) {
                            if (arr[0] == currentPermissionTree[j].id) {
                                let secondNodeArr = currentPermissionTree[j].children;
                                for (let m in secondNodeArr) {
                                    if (sendcondNodeId == secondNodeArr[m].id) {
                                        let thirdNodeArr = secondNodeArr[m].children;
                                        if (thirdNodeArr) {
                                            let newThirdNode = {};
                                            newThirdNode.id = permissionValue;
                                            thirdNodeArr.push(newThirdNode);
                                        } else {
                                            let newThirdNodeArr = [];
                                            let newThirdNode = {};
                                            newThirdNode.id = permissionValue;
                                            newThirdNodeArr.push(newThirdNode);
                                            (currentPermissionTree[j].children)[m].children = newThirdNodeArr;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                debugger;
                // 对比两个节点
                let deleteArr = [];
                for (let i in this.permissionTree) {
                    for (let j in currentPermissionTree) {
                        // 比较一级节点的子节点长度
                        if (this.permissionTree[i].id == currentPermissionTree[j].id) {
                            let secondChildrenArr = this.permissionTree[i].children;
                            let secondChildrenArrLength = secondChildrenArr.length;
                            let currentSecondChildrenArr = currentPermissionTree[j].children;
                            let currentSecondChildrenArrLength = currentSecondChildrenArr & currentSecondChildrenArr.length | 0;
                            if (secondChildrenArrLength != currentSecondChildrenArrLength) {
                                deleteArr.push(this.permissionTree[i].id);
                            }
                            // 比较二级节点的子节点长度
                            for (let m in secondChildrenArr) {
                                let thirdChildrenArr = secondChildrenArr[m].children;
                                if (!thirdChildrenArr) {
                                    continue;
                                }
                                let thirdChildrenArrLength = thirdChildrenArr.length;
                                for (let n in currentSecondChildrenArr) {
                                    if (secondChildrenArr[m].id == currentSecondChildrenArr[n].id) {
                                        let currentThirdChildrenArr = currentSecondChildrenArr[n].children;
                                        if (!currentThirdChildrenArr) {
                                            continue;
                                        }
                                        let currentThirdChildrenArrLength = currentThirdChildrenArr.length;
                                        if (thirdChildrenArrLength != currentThirdChildrenArrLength) {
                                            deleteArr.push(secondChildrenArr[m].id);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                debugger;
                let checkedKeys = [];
                for (let i in row.permissionValueSet) {
                    if (deleteArr.indexOf(row.permissionValueSet[i]) < 0) {
                        checkedKeys.push(row.permissionValueSet[i]);
                    }
                }
                debugger;
                if (!this.initStatus) {
                    this.defaultCheckedKeys = checkedKeys;
                    this.initStatus = true;
                } else {
                    this.$refs.tree.store.setCheckedKeys(checkedKeys);
                }
            } else {
                if (!this.initStatus) {
                    this.defaultCheckedKeys = [];
                    this.initStatus = true;
                } else {
                    this.$refs.tree.store.setCheckedKeys([]);
                }
            }
            debugger;
            this.editPermissionVisible = true;
            this.currentRoleId = row.roleId;
        },
        editPermissionSubmit: function () {
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
            let permissionArr = [];
            for (let i in checkedKeys) {
                permissionArr.push(checkedKeys[i]);
            }
            for (let i in halfCheckedKeys) {
                permissionArr.push(halfCheckedKeys[i]);
            }
            batchInsertRolePermission(permissionArr, this.currentRoleId).then(res => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.$message({ message: '修改成功', type: 'success' });
                    this.editPermissionVisible = false;
                    this.queryRoleListPage();
                } else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            });
            this.closeAllNode();
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