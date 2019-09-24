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
// import holdAPositionReport from '@/views/settleAccountManage/holdAPositionReport'
// import operationReport from '@/views/settleAccountManage/operationReport'
import stockManage from '@/views/admin/stockManage'
import hotNews from '@/views/admin/hotNews'

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
    meta: {
      sourceType: '1',
      permissionValue: 'sys',
    },
    children: [
      {
        path: '/userManage',
        component: userManage,
        name: '用户管理',
        meta: {
          sourceType: '1',
          permissionValue: 'sys:agent',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'sys:agent:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'sys:agent:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'sys:agent:delete' }
          ]
        }
      },
      {
        path: '/roleManage',
        component: roleManage,
        name: '角色管理',
        meta: {
          sourceType: '1',
          permissionValue: 'sys:role',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'sys:role:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'sys:role:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'sys:role:delete' }
          ]
        }
      },
      {
        path: '/permissionManage',
        component: permissionManage,
        name: '权限管理',
        meta: {
          sourceType: '1',
          permissionValue: 'sys:permission',
          operators: [
            { permissionName: '修改', sourceType: '2', permissionValue: 'sys:permission:update' }
          ]
        }
      },
      {
        path: '/stockManage',
        component: stockManage,
        name: '股票管理',
        meta: {
          sourceType: '1',
          permissionValue: 'sys:stock',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'sys:stock:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'sys:stock:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'sys:stock:delete' }
          ]
        }
      },
      {
        path: '/hotNews',
        component: hotNews,
        name: '热点资讯管理',
        meta: {
          sourceType: '1',
          permissionValue: 'sys:hotNews',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'sys:hotNews:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'sys:hotNews:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'sys:hotNews:delete' }
          ]
        }
      }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '审核管理',
    iconCls: 'el-icon-edit-outline',
    meta: {
      sourceType: '1',
      permissionValue: 'check',
    },
    children: [
      {
        path: '/offlinePay',
        component: offlinePay,
        name: '线下支付审核',
        meta: {
          sourceType: '1',
          permissionValue: 'check:offlinePay',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'check:offlinePay:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'check:offlinePay:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'check:offlinePay:delete' }
          ]
        }
      }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '代理商管理',
    iconCls: 'el-icon-user-solid',
    meta: {
      sourceType: '1',
      permissionValue: 'agent',
    },
    children: [
      {
        path: '/agent',
        component: agent,
        name: '代理商管理',
        meta: {
          sourceType: '1',
          permissionValue: 'agent:agent',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'agent:agent:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'agent:agent:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'agent:agent:delete' }
          ]
        }
      },
      {
        path: '/agentFund',
        component: agentFund,
        name: '代理商资金管理',
        meta: {
          sourceType: '1',
          permissionValue: 'agent:agentFund'
        }
      },
      {
        path: '/agentFundDetail',
        component: agentFundDetail,
        name: '代理商资金流水',
        meta: {
          sourceType: '1',
          permissionValue: 'agent:agentFundDetail'
        }
      }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '客户管理',
    iconCls: 'el-icon-s-custom',
    meta: {
      sourceType: '1',
      permissionValue: 'customer',
    },
    children: [
      {
        path: '/customer',
        component: customer,
        name: '客户管理',
        meta: {
          sourceType: '1',
          permissionValue: 'customer:customer',
          operators: [
            { permissionName: '新增', sourceType: '2', permissionValue: 'customer:customer:add' },
            { permissionName: '修改', sourceType: '2', permissionValue: 'customer:customer:update' },
            { permissionName: '删除', sourceType: '2', permissionValue: 'customer:customer:delete' }
          ]
        }
      },
      {
        path: '/customerFund',
        component: customerFund,
        name: '客户资金管理',
        meta: {
          sourceType: '1',
          permissionValue: 'customer:customerFund'
        }
      },
      {
        path: '/customerFundDetail',
        component: customerFundDetail,
        name: '客户资金流水',
        meta: {
          sourceType: '1',
          permissionValue: 'customer:customerFundDetail'
        }
      }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '订单管理',
    iconCls: 'el-icon-wallet',
    meta: {
      sourceType: '1',
      permissionValue: 'order',
    },
    children: [
      {
        path: '/orderRiskControl',
        component: orderRiskControl,
        name: '点买实时风控',
        meta: {
          sourceType: '1',
          permissionValue: 'order:orderRiskControl'
        }
      }
    ]
  }, {
    path: '/',
    component: workbench,
    name: '结算管理',
    iconCls: 'el-icon-finished',
    meta: {
      sourceType: '1',
      permissionValue: 'settle',
    },
    children: [
      {
        path: '/agentReport',
        component: agentReport,
        name: '代理商报表',
        meta: {
          sourceType: '1',
          permissionValue: 'settle:agentReport'
        }
      },
      {
        path: '/customerReport',
        component: customerReport,
        name: '客户报表',
        meta: {
          sourceType: '1',
          permissionValue: 'settle:customerReport'
        }
      },
      // {
      //   path: '/holdAPositionReport',
      //   component: holdAPositionReport,
      //   name: '持仓报表',
      //   meta: {
      //     sourceType: '1',
      //     permissionValue: 'settle:holdAPositionReport'
      //   }
      // },
      {
        path: '/alreadySettledReport',
        component: alreadySettledReport,
        name: '已结算报表',
        meta: {
          sourceType: '1',
          permissionValue: 'settle:alreadySettledReport'
        }
      }
      // {
      //   path: '/operationReport',
      //   component: operationReport,
      //   name: '运营报表',
      //   meta: {
      //     sourceType: '1',
      //     permissionValue: 'settle:operationReport'
      //   }
      // }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
