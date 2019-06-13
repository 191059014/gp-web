import { getAgentFundDetailListPage, getFundTypeCombobox } from '../../api/system';

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
                agentName: "",
                type: '',
                createTimeRange: ''
            },
            fundTypeList: [],
            agentFundDetailList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
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
                if (row.type == this.fundTypeList[i].value) {
                    return this.fundTypeList[i].name;
                }
            }
            return "";
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUsers();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getUsers();
        },
        //获取代理商资金列表
        getAgentFundDetailList() {
            let bodyParam = {
                agentName: this.filters.agentName,
                type: this.filters.type,
                createTimeStart: this.filters.createTimeRange[0],
                createTimeEnd: this.filters.createTimeRange[1]
            };
            this.listLoading = true;
            getAgentFundDetailListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.agentFundDetailList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleExport: function () {

        },
        handleReset: function () {
            this.filters = {
                agentName: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.getAgentFundDetailList();
        this.getFundTypeList();
    }
};