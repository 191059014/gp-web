import { getPermissionListPage, addPermission, updatePermission, deletePermissionById, getSourceTypeCombobox, batchInsertPermission } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                permissionName: "",
                sourceType: ""
            },
            permissionList: [],
            sourceTypeList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormLabelWidth: '120px',
            editFormRules: {
                permissionName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
                sourceType: [{ required: true, message: "请选择资源类型", trigger: "blur" }],
                permissionValue: [{ required: true, message: "请输入权限值", trigger: "blur" }]
            },
            //编辑界面数据
            editForm: {
                permissionName: "",
                sourceType: "",
                permissionValue: ""
            },

            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormLabelWidth: '120px',
            addFormRules: {
                permissionName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
                sourceType: [{ required: true, message: "请选择资源类型", trigger: "blur" }],
                permissionValue: [{ required: true, message: "请输入权限值", trigger: "blur" }]
            },
            //新增界面数据
            addForm: {
                permissionName: "",
                sourceType: "",
                permissionValue: ""
            }
        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryPermissionListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryPermissionListPage();
        },
        formatSourceType(row, column) {
            for (let i in this.sourceTypeList) {
                if (row.sourceType == this.sourceTypeList[i].value) {
                    return this.sourceTypeList[i].name;
                }
            }
            return row.sourceType;
        },
        querySourceTypeCombobox() {
            getSourceTypeCombobox().then((res) => {
                this.sourceTypeList = res.obj;
            })
        },
        //获取角色列表
        queryPermissionListPage() {
            let bodyParam = {
                permissionName: this.filters.permissionName,
                sourceType: this.filters.sourceType
            };
            this.listLoading = true;
            getPermissionListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.permissionList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                permissionName: "",
                sourceType: ""
            }
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm("确认删除该权限吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.listLoading = true;
                    let permissionId = row.permissionId;
                    deletePermissionById(permissionId).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.listLoading = false;
                            this.$message({ message: '删除成功', type: 'success' });
                            this.queryPermissionListPage();
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
        //重新导入所有菜单权限
        handleImport: function () {
            this.$confirm("将删除之前所有的权限，确认重新导入吗?", "提示", {
                type: "warning"
            }).then(() => {
                let routes = this.$router.options.routes;
                let allPermissions = [];
                // 一级菜单
                for (let i in routes) {
                    if (routes[i].path != "/") {
                        continue;
                    }
                    let firstPermission = {};
                    firstPermission.permissionName = routes[i].name;
                    firstPermission.sourceType = 1;
                    firstPermission.permissionValue = routes[i].meta.permissionValue;
                    allPermissions.push(firstPermission);
                    // 二级菜单
                    let childrens = routes[i].children;
                    if (childrens && childrens.length > 0) {
                        for (let j in childrens) {
                            let secondPermission = {};
                            secondPermission.permissionName = routes[i].name + "-" + childrens[j].name;
                            secondPermission.sourceType = 1;
                            secondPermission.permissionValue = childrens[j].meta.permissionValue;
                            allPermissions.push(secondPermission);
                            // 三级菜单
                            let operators = childrens[j].meta.operators;
                            if (operators && operators.length > 0) {
                                for (let m in operators) {
                                    let thirdPermission = {};
                                    thirdPermission.permissionName = routes[i].name + "-" + childrens[j].name + "-" + operators[m].permissionName;
                                    thirdPermission.sourceType = 2;
                                    thirdPermission.permissionValue = operators[m].permissionValue;
                                    allPermissions.push(thirdPermission);
                                }
                            }
                        }
                    }
                }
                batchInsertPermission(allPermissions).then(res => {
                    if (res.code == ResponseEnum.SUCCESS.code) {
                        this.$message({ message: '批量添加成功', type: 'success' });
                        this.queryPermissionListPage();
                    } else {
                        this.$message({ message: res.msg, type: 'error' });
                    }
                });
                debugger;
            }).catch(err => {

            });
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.editLoading = true;
                    let bodyParam = Object.assign({}, this.editForm);
                    updatePermission(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.editLoading = false;
                            this.$message({ message: '修改成功', type: 'success' });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.queryPermissionListPage();
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
                    addPermission(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.addLoading = false;
                            this.$message({ message: '添加成功', type: 'success' });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.queryPermissionListPage();
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
        this.queryPermissionListPage();
        this.querySourceTypeCombobox();
    }
};