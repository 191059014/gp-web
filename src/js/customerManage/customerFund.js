import { getCustomerFundListPage } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                userName: "",
                agentName: ""
            },
            customerFundList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryCustomerFundListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryCustomerFundListPage();
        },
        //获取用户列表
        queryCustomerFundListPage() {
            let bodyParam = {
                userName: this.filters.userName,
                agentName: this.filters.agentName
            };
            this.listLoading = true;
            getCustomerFundListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.customerFundList = res.obj;
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
        this.queryCustomerFundListPage();
    }
};