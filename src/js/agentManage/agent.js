import { getAgentListPage, getAgentLevelCombobox, getRealAuthStatusCombobox } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                agentName: "",
                mobile: ""
            },
            agentList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列

            agentLevelList: [],
            realAuthStatusList: []
        };
    },
    methods: {
        getAgentLevelList() {
            getAgentLevelCombobox().then(res => {
                this.agentLevelList = res.obj;
            })
        },
        getRealAuthStatusList() {
            getRealAuthStatusCombobox().then(res => {
                this.realAuthStatusList = res.obj;
            })
        },
        formatAgentLevel(row, column) {
            for (let i in this.agentLevelList) {
                if (row.agentLevel == this.agentLevelList[i].value) {
                    return this.agentLevelList[i].name;
                }
            }
            return row.agentLevel;
        },
        formatRealAuthStatus(row, column) {
            for (let i in this.realAuthStatusList) {
                if (row.realAuthStatus == this.realAuthStatusList[i].value) {
                    return this.realAuthStatusList[i].name;
                }
            }
            return row.realAuthStatus;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryAgentListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryAgentListPage();
        },
        //获取用户列表
        queryAgentListPage() {
            let bodyParam = {
                userName: this.filters.userName
            };
            this.listLoading = true;
            getAgentListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.agentList = res.obj;
                    this.listLoading = false;
                } else {
                    this.$message({ message: ResponseEnum.ERROR.msg, type: 'error' });
                }
            }).catch(err => {
            });
        },
        handleReset: function () {
            this.filters = {
                agentName: "",
                mobile: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.queryAgentListPage();
        this.getAgentLevelList();
        this.getRealAuthStatusList();
    }
};