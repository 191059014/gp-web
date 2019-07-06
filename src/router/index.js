import Vue from 'vue'
import Router from 'vue-router'
import workbench from '@/views/workbench'
import userManage from '@/views/admin/userManage'
import roleManage from '@/views/admin/roleManage'
import permissionManage from '@/views/admin/permissionManage'
import offlinePay from '@/views/auditManage/offlinePay'
import agent from '@/views/agentManage/agent'
import agentFund from '@/views/agentManage/agentFund'
import agentFundDetail from '@/views/agentManage/agentFundDetail'
import customer from '@/views/customerManage/customer'
import customerFund from '@/views/customerManage/customerFund'
import customerFundDetail from '@/views/customerManage/customerFundDetail'
import orderRiskControl from '@/views/orderManage/orderRiskControl'
import agentReport from '@/views/settleAccountManage/agentReport'
import alreadySettledReport from '@/views/settleAccountManage/alreadySettledReport'
import customerReport from '@/views/settleAccountManage/customerReport'
import holdAPositionReport from '@/views/settleAccountManage/holdAPositionReport'
import operationReport from '@/views/settleAccountManage/operationReport'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/workbench',
    name: '工作台',
    hidden: true,
    component: workbench
  },
  {
    path: '/login',
    name: '登录',
    hidden: true,
    component: () => import('@/views/login')
  }, {
    path: '/',
    component: workbench,
    name: '系统管理',
    iconCls: 'el-icon-setting',
    children: [
      { path: '/userManage', component: userManage, name: '用户管理' },
      { path: '/roleManage', component: roleManage, name: '角色管理' },
      { path: '/permissionManage', component: permissionManage, name: '权限管理' }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '审核管理',
    iconCls: 'el-icon-edit-outline',
    children: [
      { path: '/offlinePay', component: offlinePay, name: '线下支付审核' }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '代理商管理',
    iconCls: 'el-icon-user-solid',
    children: [
      { path: '/agent', component: agent, name: '代理商管理' },
      { path: '/agentFund', component: agentFund, name: '代理商资金管理' },
      { path: '/agentFundDetail', component: agentFundDetail, name: '代理商资金流水' }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '客户管理',
    iconCls: 'el-icon-s-custom',
    children: [
      { path: '/customer', component: customer, name: '客户管理' },
      { path: '/customerFund', component: customerFund, name: '客户资金管理' },
      { path: '/customerFundDetail', component: customerFundDetail, name: '客户资金流水' }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '订单管理',
    iconCls: 'el-icon-wallet',
    children: [
      { path: '/orderRiskControl', component: orderRiskControl, name: '点买实时风控' }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '结算管理',
    iconCls: 'el-icon-finished',
    children: [
      { path: '/agentReport', component: agentReport, name: '代理商报表' },
      { path: '/customerReport', component: customerReport, name: '客户报表' },
      { path: '/holdAPositionReport', component: holdAPositionReport, name: '持仓报表' },
      { path: '/alreadySettledReport', component: alreadySettledReport, name: '已结算报表' },
      { path: '/operationReport', component: operationReport, name: '运营报表' }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
