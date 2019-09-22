import { getOrderListPage, getOrderStatusCombobox, riskControl } from '../../api/system';
import store from '../../vuex/store'

export default {
    data() {
        return {
            filters: {
                userName: ""
            },
            orderList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            // orderStatusList: [],
            // riskControlTimer: store.state.riskControlTimer
        };
    },
    methods: {
        // getOrderStatusList() {
        //     getOrderStatusCombobox().then(res => {
        //         this.orderStatusList = res.obj;
        //     })
        // },
        formatUserNameAndMobile(row, column) {
            return row.userName + '\n' + row.mobile;
        },
        formatStockCodeAndStockName(row, column) {
            return row.stockCode + '\n' + row.stockName;
        },
        formatBuyPriceAndBuyPriceTotal(row, column) {
            return row.buyPrice + '\n' + row.buyPriceTotal;
        },
        formatStrategyOwnMoneyAndStrategyMoney(row, column) {
            return row.strategyOwnMoney + '\n' + row.strategyMoney;
        },
        formatStopEarnMoneyAndStopLossMoney(row, column) {
            return row.stopEarnMoney + '\n' + row.stopLossMoney;
        },
        formatServiceMoneyAndDelayMoney(row, column) {
            return row.serviceMoney + '\n' + row.delayMoney;
        },
        formatPrice(row, column) {
            let currentPrice = row.currentPrice;
            if (!currentPrice) {
                currentPrice = 0
            }
            return currentPrice;
        },
        // formatOrderStatus(row, column) {
        //     for (let i in this.orderStatusList) {
        //         if (row.orderStatus == this.orderStatusList[i].value) {
        //             return this.orderStatusList[i].name;
        //         }
        //     }
        //     return row.orderStatus;
        // },
        setCellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 8 ||columnIndex === 9) {
                return 'redWord';
            }
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
                userName: this.filters.userName
            };
            this.listLoading = true;
            getOrderListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.orderList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                userName: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        openRiskControl: function () {
            if (!this.orderList) {
                return false;
            }
            let bodyParam = [];
            for (let j in this.orderList) {
                let orderInfo = {};
                orderInfo.orderId = this.orderList[j].orderId;
                orderInfo.stockCode = this.orderList[j].stockCode;
                orderInfo.buyPrice = this.orderList[j].buyPrice;
                orderInfo.buyNumber = this.orderList[j].buyNumber;
                bodyParam.push(orderInfo);
            }
            riskControl(bodyParam).then(res => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    for (let m in this.orderList) {
                        let orderInfo = this.orderList[m];
                        for (let n in res.obj) {
                            if (orderInfo.orderId == res.obj[n].orderId) {
                                orderInfo.currentPrice = res.obj[n].currentPrice;
                                orderInfo.profit = res.obj[n].profit;
                                break;
                            }
                        }
                    }
                }
            })
        },
    },
    beforeMount() {
        this.$store.state.riskControlTimer = setInterval(() => {
            this.openRiskControl();
        }, 3000);
    },
    mounted() {
        this.queryOrderListPage();
        // this.getOrderStatusList();
    }
};