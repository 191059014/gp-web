import { getOfflinePayStatusCombobox, getOfflineCheckStatusCombobox, getOfflinePayChannelCombobox, getOfflinePayListPage, updateOfflinePay, getFundTypeCombobox } from '../../api/system';
export default {
    data() {
        return {
            filters: {
                payStatus: "",
                payChannel: ""
            },
            payStatusList: [],
            payChannelList: [],
            checkStatusList: [],
            fundTypeList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            offlinePayList: [],
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormLabelWidth: '120px',
            editFormRules: {
                checkStatus: [{ required: true, message: "请审核", trigger: "blur" }],
                systemRemark: [{ required: true, message: "请输入备注", trigger: "blur" }]
            },
            //编辑界面数据
            editForm: {
                checkId: "",
                checkStatus: "",
                systemRemark: ""
            },
        }
    },
    methods: {
        getOfflinePayStatusCombobox: function () {
            getOfflinePayStatusCombobox().then(res => {
                this.payStatusList = res.obj;
            })
        },
        getOfflineCheckStatusCombobox: function () {
            getOfflineCheckStatusCombobox().then(res => {
                this.checkStatusList = res.obj;
            })
        },
        getOfflinePayChannelCombobox: function () {
            getOfflinePayChannelCombobox().then(res => {
                this.payChannelList = res.obj;
            })
        },
        getFundTypeCombobox: function () {
            getFundTypeCombobox().then(res => {
                this.fundTypeList = res.obj;
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        handleReset: function () {
            this.filters = {
                payStatus: "",
                payType: ""
            }
        },
        formatPayChannel: function (row, cloum) {
            for (let i in this.payChannelList) {
                if (row.payChannel == this.payChannelList[i].value) {
                    return this.payChannelList[i].name;
                }
            }
            return row.payType;
        },
        formatCheckStatus: function (row, cloum) {
            for (let i in this.checkStatusList) {
                if (row.checkStatus == this.checkStatusList[i].value) {
                    return this.checkStatusList[i].name;
                }
            }
            return row.payType;
        },
        formatPayStatus: function (row, cloum) {
            for (let i in this.payStatusList) {
                if (row.payStatus == this.payStatusList[i].value) {
                    return this.payStatusList[i].name;
                }
            }
            return row.payStatus;
        },
        formatFundType: function (row, cloum) {
            for (let i in this.fundTypeList) {
                if (row.fundType == this.fundTypeList[i].value) {
                    return this.fundTypeList[i].name;
                }
            }
            return row.fundType;
        },
        queryList: function () {
            let bodyParam = {
                payStatus: this.filters.payStatus,
                payType: this.filters.payType
            };
            this.listLoading = true;
            getOfflinePayListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.offlinePayList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.editLoading = true;
                    let bodyParam = Object.assign({}, this.editForm);
                    updateOfflinePay(bodyParam).then((res) => {
                        if (res.code == ResponseEnum.SUCCESS.code) {
                            this.editLoading = false;
                            this.$message({ message: '修改成功', type: 'success' });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.queryList();
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
    },
    mounted() {
        this.getOfflinePayStatusCombobox();
        this.getOfflineCheckStatusCombobox();
        this.getOfflinePayChannelCombobox();
        this.getFundTypeCombobox();
        this.queryList();
    }

}