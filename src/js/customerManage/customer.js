import { getUserListPage, getRealAuthStatusCombobox } from '../../api/system';

export default {
    data() {
        return {
            filters: {
                userName: "",
                mobile: ""
            },
            userList: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            listLoading: false,
            sels: [], //列表选中列
            realAuthStatusList: []
        };
    },
    methods: {
        getRealAuthStatusList() {
            getRealAuthStatusCombobox().then(res => {
                this.realAuthStatusList = res.obj;
            })
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
            this.queryUserListPage();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryUserListPage();
        },
        //获取用户列表
        queryUserListPage() {
            let bodyParam = {
                userName: this.filters.userName,
                mobile: this.mobile
            };
            this.listLoading = true;
            getUserListPage(this.pageNum, this.pageSize, bodyParam).then((res) => {
                if (res.code == ResponseEnum.SUCCESS.code) {
                    this.total = res.total;
                    this.userList = res.obj;
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
                mobile: ""
            }
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.queryUserListPage();
        this.getRealAuthStatusList();
    }
};