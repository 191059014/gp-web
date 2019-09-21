import { updatePasswrod, realNameAuth, bindBankCard, balancesExtracted } from '../api/system';

export default {
  data() {
    return {
      loginUserName: "",
      sysName: "后台管理系统",
      collapsed: false,
      permissionSet: [],
      // 修改密码
      updatePasswordFormVisible: false,
      updatePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      editFormLabelWidth: '120px',
      updatePasswordLoading: false,
      // 实名认证
      idCardRealNameFormVisible: false,
      idCardRealNameForm: {
        realName: "",
        idCardNo: ""
      },
      idCardRealNameWidth: '120px',
      idCardRealNameLoading: false,
      // 绑定银行卡
      bindBankCardFormVisible: false,
      bindBankCardForm: {
        bankNo: "",
        bankName: ""
      },
      bindBankCardWidth: '120px',
      bindBankCardLoading: false,
      // 余额提取
      balancesExtractedFormVisible: false,
      balancesExtractedForm: {
        extractedMoney: 0
      },
      balancesExtractedWidth: '120px',
      balancesExtractedLoading: false,
      balance: 0
    };
  },
  methods: {
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
        _this.$router.push("/login");
      })
        .catch(() => { });
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    clickMenu: function () {
      clearInterval(this.$store.state.riskControlTimer);
    },
    handleCommand: function (command) {
      if (command == 'updatePassword') {
        this.updatePasswordFormVisible = true;
        this.updatePasswordForm = {
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }
      } else if (command == 'realNameAuth') {
        this.idCardRealNameFormVisible = true;
        this.idCardRealNameForm = {
          realName: "",
          idCardNo: ""
        }
      } else if (command == 'bindBankCard') {
        this.bindBankCardFormVisible = true;
        this.bindBankCardForm = {
          bankNo: "",
          bankName: ""
        }
      } else if (command == 'balancesExtracted') {
        this.balancesExtractedFormVisible = true;
        this.balancesExtractedForm = {
          extractedMoney: 0
        }
      }
    },
    updatePasswordSubmit: function () {
      let oldPassword = this.updatePasswordForm.oldPassword;
      let newPassword = this.updatePasswordForm.newPassword;
      let confirmNewPassword = this.updatePasswordForm.confirmNewPassword;
      if (!oldPassword) {
        this.$message({ message: '请输入旧密码', type: 'error' });
        return false;
      }
      if (!newPassword) {
        this.$message({ message: '请输入新密码', type: 'error' });
        return false;
      }
      if (!confirmNewPassword) {
        this.$message({ message: '请确认新密码', type: 'error' });
        return false;
      }
      if (newPassword != confirmNewPassword) {
        this.$message({ message: '两次输入的密码不一致，请重新输入', type: 'error' });
        return false;
      }
      this.updatePasswordLoading = true;
      let bodyParam = { oldPassword: oldPassword, newPassword: newPassword };
      updatePasswrod(bodyParam).then(res => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.$message({ message: '修改密码成功', type: 'success' });
          this.updatePasswordFormVisible = false;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
        this.updatePasswordLoading = false;
      }).catch(err => {
        this.updatePasswordLoading = false;
      });
    },
    idCardRealNameSubmit: function () {
      let realName = this.idCardRealNameForm.realName;
      let idCardNo = this.idCardRealNameForm.idCardNo;
      if (!realName) {
        this.$message({ message: '请输入真实姓名', type: 'error' });
        return false;
      }
      if (!idCardNo) {
        this.$message({ message: '请输入身份证号码', type: 'error' });
        return false;
      }
      this.idCardRealNameLoading = true;
      let bodyParam = { realName: realName, idCardNo: idCardNo };
      realNameAuth(bodyParam).then(res => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.$message({ message: '实名认证成功', type: 'success' });
          this.idCardRealNameFormVisible = false;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
        this.idCardRealNameLoading = false;
      }).catch(err => {
        this.idCardRealNameLoading = false;
      });
    },
    bindBankCardSubmit: function () {
      let bankNo = this.bindBankCardForm.bankNo;
      let bankName = this.bindBankCardForm.bankName;
      if (!bankNo) {
        this.$message({ message: '请输入银行卡号', type: 'error' });
        return false;
      }
      if (!bankName) {
        this.$message({ message: '请输入银行名称', type: 'error' });
        return false;
      }
      this.bindBankCardLoading = true;
      let bodyParam = { bankNo: bankNo, bankName: bankName };
      bindBankCard(bodyParam).then(res => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.$message({ message: '绑定银行卡成功', type: 'success' });
          this.bindBankCardFormVisible = false;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
        this.bindBankCardLoading = false;
      }).catch(err => {
        this.bindBankCardLoading = false;
      });
    },
    checkNumber: function (withdrawAmount) {
      this.balancesExtractedForm.extractedMoney = (withdrawAmount.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    },
    balancesExtractedSubmit: function () {
      let extractedMoney = this.balancesExtractedForm.extractedMoney;
      if (!extractedMoney) {
        this.$message({ message: '提取金额不能为空', type: 'error' });
        return false;
      }
      if (extractedMoney <= 0) {
        this.$message({ message: '提取金额必须大于0', type: 'error' });
        return false;
      }
      balancesExtracted(extractedMoney).then(res => {
        if (res.code == ResponseEnum.SUCCESS.code) {
          this.$message({ message: '提取成功', type: 'success' });
          this.balancesExtractedFormVisible = false;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
        this.balancesExtractedLoading = false;
      }).catch(err => {
        this.balancesExtractedLoading = false;
      });
    }
  },
  mounted() {
    // 当前登陆用户名
    let userInfo = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
    if (userInfo && userInfo.length > 0) {
      this.loginUserName = JSON.parse(userInfo).agentName;
    }
    // 权限列表
    let permissionStr = sessionStorage.getItem(CURRENT_AGENT_PERMISSION);
    if (permissionStr && permissionStr.length > 0) {
      this.permissionSet = permissionStr.split(",");
    }
  }
};