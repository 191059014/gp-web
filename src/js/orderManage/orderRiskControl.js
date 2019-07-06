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
        formatUserNameAndMobile(row, column) {
            return row.userName + '\n' + row.mobile;
        },
        formatStockCodeAndStockName(row, column) {
            return row.stockCode + '\n' + row.stockName;
        },
        formatBuyPriceAndBuyPriceTotal(row, column) {
            return row.buyPrice + '\n' + row.buyPriceTotal;
        },
        formatSellPriceAndSellPriceTotal(row, column) {
            return row.sellPrice + '\n' + row.sellPriceTotal;
        },
        formatStrategyOwnMoneyAndStrategyMoney(row, column) {
            return row.strategyOwnMoney + '\n' + row.strategyMoney;
        },
        formatProfitAndProfitRate(row, column) {
            return row.profit + '\n' + row.profitRate;
        },
        formatStopEarnMoneyAndStopLossMoney(row, column) {
            return row.stopEarnMoney + '\n' + row.stopLossMoney;
        },
        formatServiceMoneyAndDelayMoney(row, column) {
            return row.serviceMoney + '\n' + row.delayMoney;
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
            this.queryOrderListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryOrderListPage();
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