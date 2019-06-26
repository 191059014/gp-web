import { getOrderListPage, getOrderStatusCombobox } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                userName: "",
                orderStatus: ""
            },
            orderList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            orderStatusList: []
        };
    },
    methods: {
        getOrderStatusList() {
            getOrderStatusCombobox().then(res => {
                this.orderStatusList = res.obj;
            })
        },
        formatMobile(row, column) {
            var ele = this.$createElement('div', '<p>' + row.userName + '</p><p>' + row.mobile + '</p>');
            var ele2 = row.userName+"<br/>"+row.mobile;
            return ele2;
        },
        formatOrderStatus(row, column) {
            for (let i in this.orderStatusList) {
                if (row.orderStatus == this.orderStatusList[i].value) {
                    return this.orderStatusList[i].name;
                }
            }
            return row.orderStatus;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryCustomerFundDetailListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryCustomerFundDetailListPage();
        },
        //获取订单列表
        queryOrderListPage() {
            let bodyParam = {
                userName: this.filters.userName,
                orderStatus: this.filters.orderStatus
            };
            this.listLoading = true;
            getOrderListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.orderList = res.obj;
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
                orderStatus: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.queryOrderListPage();
        this.getOrderStatusList();
    }
};