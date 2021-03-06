import { getCustomerFundDetailListPage, getFundTypeCombobox } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                userName: "",
                agentName: ""
            },
            customerFundDetailList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            fundTypeList: []
        };
    },
    methods: {
        getFundTypeList() {
            getFundTypeCombobox().then(res => {
                this.fundTypeList = res.obj;
            })
        },
        formatFundType(row, column) {
            for (let i in this.fundTypeList) {
                if (row.fundType == this.fundTypeList[i].value) {
                    return this.fundTypeList[i].name;
                }
            }
            return row.fundType;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryCustomerFundDetailListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryCustomerFundDetailListPage();
        },
        //获取用户列表
        queryCustomerFundDetailListPage() {
            let bodyParam = {
                userName: this.filters.userName,
                agentName: this.filters.agentName
            };
            this.listLoading = true;
            getCustomerFundDetailListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.customerFundDetailList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                userName: "",
                agentName: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.queryCustomerFundDetailListPage();
        this.getFundTypeList();
    }
};