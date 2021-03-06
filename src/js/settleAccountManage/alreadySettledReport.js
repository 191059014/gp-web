import { findAlreadySettledReportPages, exportExcel } from '../../api/system';

export default {
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            filters: {
                userName: "",
                mobile: '',
                createTimeRange: '',
                inviterMobile: '',
                unit: ''
            },
            orderList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
        };
    },
    computed: {
        strategyMoneyTotal: function () {
            let result = 0;
            if (this.orderList && this.orderList.length > 0) {
                for (let i in this.orderList) {
                    result += this.orderList[i].order.strategyMoney;
                }
            }
            return result + "元";
        },
        serviceMoneyTotal: function () {
            let result = 0;
            if (this.orderList && this.orderList.length > 0) {
                for (let i in this.orderList) {
                    result += this.orderList[i].order.serviceMoney;
                }
            }
            return result + "元";
        }
    },
    methods: {
        formatUserNameAndMobile(row, column) {
            return row.user.userName + '\n' + row.user.mobile;
        },
        formatStockCodeAndStockName(row, column) {
            return row.order.stockCode + '\n' + row.order.stockName;
        },
        formatBuyBuyPriceAndSellPrice(row, column) {
            return row.order.buyPrice + '\n' + row.order.sellPrice;
        },
        formatBuyTimeAndSellTime(row, column) {
            return row.order.buyTime + '\n' + row.order.sellTime;
        },
        formatStrategyOwnMoneyAndStrategyMoney(row, column) {
            return row.order.strategyOwnMoney + '\n' + row.order.strategyMoney;
        },
        formatStopEarnMoneyAndStopLossMoney(row, column) {
            return row.order.stopEarnMoney + '\n' + row.order.stopLossMoney;
        },
        formatServiceMoneyAndDelayMoney(row, column) {
            return row.order.serviceMoney + '\n' + row.order.delayMoney;
        },
        formatAlreadyDelayDaysAndDelayEndTime(row, column) {
            return row.order.alreadyDelayDays + '\n' + row.order.delayEndTime;
        },
        formatProfitAndProfitRate(row, column) {
            return row.order.profit + '\n' + row.order.profitRate;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryOrderListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryOrderListPage();
        },
        handleReport(type) {
            let bodyParam = {};
            let pageNum = 0;
            let pageSize = 0;
            if (type == 0) {
                // 导出当前页
                pageNum = this.pageNum;
                pageSize = this.pageSize;
            }
            bodyParam = {
                userName: this.filters.userName,
                mobile: this.filters.mobile,
                orderTimeStart: this.filters.createTimeRange[0],
                orderTimeEnd: this.filters.createTimeRange[1],
                inviterMobile: this.filters.inviterMobile,
                unit: this.filters.unit
            };
            let url = 'controller/alreadySettledReport/exportAlreadySettledReport?pageNum=' + pageNum + '&pageSize=' + pageSize;
            exportExcel(url, bodyParam, '持仓中报表');
        },
        //获取用户列表
        queryOrderListPage() {
            let bodyParam = {
                userName: this.filters.userName,
                mobile: this.filters.mobile,
                orderTimeStart: this.filters.createTimeRange[0],
                orderTimeEnd: this.filters.createTimeRange[1],
                inviterMobile: this.filters.inviterMobile,
                unit: this.filters.unit
            };
            this.listLoading = true;
            findAlreadySettledReportPages(this.pageNum, this.pageSize, bodyParam).then((res) => {
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
                mobile: "",
                createTimeRange: '',
                unit: '',
                inviterMobile:''
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.queryOrderListPage();
    }
};