import { getAgentFundListPage } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                agentName: ""
            },
            agentFundList: [],
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
            this.getUsers();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getUsers();
        },
        //获取代理商资金列表
        getAgentFundList() {
            let bodyParam = {
                agentName: this.filters.agentName
            };
            this.listLoading = true;
            getAgentFundListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.agentFundList = res.obj;
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
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.getAgentFundList();
    }
};