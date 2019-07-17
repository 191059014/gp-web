import { getPermissionListPage, addPermission, updatePermission, deletePermissionById } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                permissionName: "",
                sourceType: ""
            },
            permissionList: [],
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
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                permissionName: "",
                sourceType: "",
                permissionValue: ""
            }
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
    }
};