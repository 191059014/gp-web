import Vue from 'vue'
import Router from 'vue-router'
import workbench from '@/views/workbench'
import agentManage from '@/views/admin/agentManage'
import roleManage from '@/views/admin/roleManage'
import permissionManage from '@/views/admin/permissionManage'

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
  },{
    path: '/',
    component: workbench,
    name: '系统管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
        { path: '/agentManage', component: agentManage, name: '用户管理'},
        { path: '/roleManage', component: roleManage, name: '角色管理' },
        { path: '/permissionManage', component: permissionManage, name: '权限管理' }
    ]
},
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
