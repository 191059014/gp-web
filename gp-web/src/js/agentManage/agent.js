import { getAgentListPage, addAgent, modifyAgent, deleteAgentById, getAgentTypeCombobox, getRealAuthStatusCombobox } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                agentName: ""
            },
            users: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列

            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormLabelWidth: '120px',
            editFormRules: {
                agentName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
            //编辑界面数据
            editForm: {
                agentId: "",
                inviteCode: "",
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
                agentName: "",
                confirmPassword: ""
            },
            agentTypeList: [],
            realAuthStatusList: []
        };
    },
    methods: {
        getAgentTypeList() {
            getAgentTypeCombobox().then(res => {
                this.agentTypeList = res.obj;
            })
        },
        getRealAuthStatusList() {
            getRealAuthStatusCombobox().then(res => {
                this.realAuthStatusList = res.obj;
            })
        },
        formatAgentType(row, column) {
            for (let i in this.agentTypeList) {
                if (row.agentType == this.agentTypeList[i].value) {
                    return this.agentTypeList[i].name;
                }
            }
            return row.agentType;
        },
        formatRealAuthStatus(row, column) {
            for (let i in this.realAuthStatusList) {
                if (row.realAuthStatus == this.realAuthStatusList[i].value) {
                    return this.realAuthStatusList[i].name;
                }
            }
            return row.realAuthStatus;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUsers();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getUsers();
        },
        //获取用户列表
        getUsers() {
            let bodyParam = {
                agentName: this.filters.agentName
            };
            this.listLoading = true;
            getAgentListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.users = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                agentName: ""
            }
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm("确认删除该记录吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.listLoading = true;
                    let agentId = row.agentId;
                    deleteAgentById(agentId).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.listLoading = false;
                            this.$message({ message: '删除成功', type: 'success' });
                            this.getUsers();
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
                agentName: "",
                agentName: "",
                confirmPassword: ""
            }
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.editLoading = true;
                    let bodyParam = Object.assign({}, this.editForm);
                    modifyAgent(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.editLoading = false;
                            this.$message({ message: '修改成功', type: 'success' });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getUsers();
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
                            this.getUsers();
                        } else {
                            this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
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
        }
    },
    mounted() {
        this.getUsers();
        this.getAgentTypeList();
        this.getRealAuthStatusList();
    }
};