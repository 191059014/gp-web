import { getOfflinePayStatusCombobox, getOfflinePayTypeCombobox, getOfflinePayListPage } from '../../api/system';
export default {
    data() {
        return {
            filters: {
                payStatus: "",
                payType: ""
            },
            payStatusList: [],
            payTypeList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            offlinePayList: []
        }
    },
    methods: {
        getOfflinePayStatusCombobox: function () {
            getOfflinePayStatusCombobox().then(res => {
                this.payStatusList = res.obj;
            })
        },
        getOfflinePayTypeCombobox: function () {
            getOfflinePayTypeCombobox().then(res => {
                this.payTypeList = res.obj;
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
        },
        handleReset: function () {
            this.filters = {
                payStatus: "",
                payType: ""
            }
          },
        formatPayType: function (row, cloum) {
            for (let i in this.payTypeList) {
                if (row.payType == this.payTypeList[i].value) {
                    return this.payTypeList[i].name;
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
                this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
            });
        }
    },
    mounted() {
        this.getOfflinePayStatusCombobox();
        this.getOfflinePayTypeCombobox();
        this.queryList();
    }

}