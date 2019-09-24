import service from '../util/axios'
import { Message } from 'element-ui';
import { dataUtils } from '../util/date';
import axios from 'axios'

/**
 * 系统管理
 */
// 登陆
export const login = params => { return service.post(`controller/login/login`, params).then(res => res.data); };
// 当前登陆用户的所有权限
export const getPermissionSet = () => { return service.get(`controller/login/getPermissionSet`).then(res => res.data); };
// 分页获取代理商列表
export const getAgentListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/agent/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加代理商
export const addAgent = params => { return service.post(`controller/agent/addAgent`, params).then(res => res.data); };
// 修改代理商
export const updateAgent = params => { return service.post(`controller/agent/updateAgent`, params).then(res => res.data); };
// 删除代理商
export const deleteAgentById = agentId => { return service.get(`controller/agent/deleteAgentById?agentId=` + agentId).then(res => res.data); };
// 分页获取角色列表
export const getRoleListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/role/getRoleListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加角色
export const addRole = params => { return service.post(`controller/role/addRole`, params).then(res => res.data); };
// 修改角色
export const updateRole = params => { return service.post(`controller/role/updateRole`, params).then(res => res.data); };
// 删除角色
export const deleteRoleById = roleId => { return service.get(`controller/role/deleteRoleById?roleId=` + roleId).then(res => res.data); };
// 分页获取权限列表
export const getPermissionListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/permission/getPermissionListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加权限
export const addPermission = params => { return service.post(`controller/permission/addPermission`, params).then(res => res.data); };
// 批量导入权限
export const batchInsertPermission = params => { return service.post(`controller/permission/batchInsert`, params).then(res => res.data); };
// 批量导入角色权限关系
export const batchInsertRolePermission = (bodyParam, roleId) => { return service.post(`controller/rolePermission/batchInsert?roleId=` + roleId, bodyParam).then(res => res.data); };
// 修改权限
export const updatePermission = params => { return service.post(`controller/permission/updatePermission`, params).then(res => res.data); };
// 删除权限
export const deletePermissionById = permissionId => { return service.get(`controller/permission/deletePermissionById?permissionId=` + permissionId).then(res => res.data); };
// 获取资源类型下拉框
export const getSourceTypeCombobox = () => { return service.get(`controller/permission/getSourceTypeCombobox`).then(res => res.data); };
// 获取所有角色树
export const findRoleTree = () => { return service.get(`controller/role/findRoleTree`).then(res => res.data); };
// 批量导入代理商角色关系
export const batchInsertAgentRole = (bodyParam, agentId) => { return service.post(`controller/agentRole/batchInsert?agentId=` + agentId, bodyParam).then(res => res.data); };
// 分页获取股票列表
export const getStockListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/stock/getStockListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加股票
export const addStock = params => { return service.post(`controller/stock/addStock`, params).then(res => res.data); };
// 修改股票
export const updateStock = params => { return service.post(`controller/stock/updateStock`, params).then(res => res.data); };
// 删除股票
export const deleteStockById = id => { return service.get(`controller/stock/deleteStockById?id=` + id).then(res => res.data); };
// 获取股票状态下拉框
export const getStockStatusCombobox = () => { return service.get(`controller/stock/getStockStatusCombobox`).then(res => res.data); };
// 修改密码
export const updatePasswrod = bodyParam => { return service.post(`controller/agent/updatePasswrod`, bodyParam).then(res => res.data); };
// 实名认证
export const realNameAuth = bodyParam => { return service.post(`controller/agent/realNameAuth`, bodyParam).then(res => res.data); };
// 绑定银行卡
export const bindBankCard = bodyParam => { return service.post(`controller/agent/bindBankCard`, bodyParam).then(res => res.data); };
// 余额提取
export const balancesExtracted = extractedMoney => { return service.get(`controller/agent/balancesExtracted?extractedMoney=` + extractedMoney).then(res => res.data); };
/**
 * 热点资讯管理
 */
// 分页查询热点资讯
export const getHotNewsListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/hotNews/getHotNewsListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加热点资讯
export const addHotNews = params => { return service.post(`controller/hotNews/addHotNews`, params).then(res => res.data); };
// 修改热点资讯
export const updateHotNews = params => { return service.post(`controller/hotNews/updateHotNewsById`, params).then(res => res.data); };
// 删除热点资讯
export const deleteHotNewsById = id => { return service.get(`controller/hotNews/deleteById?id=` + id).then(res => res.data); };
/**
 * 审核管理
 */
// 支付状态下拉框
export const getOfflinePayStatusCombobox = () => { return service.get(`controller/offlinePay/getOfflinePayStatusCombobox`).then(res => res.data); };
// 支付渠道下拉框
export const getOfflinePayChannelCombobox = () => { return service.get(`controller/offlinePay/getOfflinePayChannelCombobox`).then(res => res.data); };
// 审核状态下拉框
export const getOfflineCheckStatusCombobox = () => { return service.get(`controller/offlinePay/getOfflineCheckStatusCombobox`).then(res => res.data); };
// 分页查询线下支付列表
export const getOfflinePayListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/offlinePay/getOfflinePayListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 修改审核信息
export const updateOfflinePay = params => { return service.post(`controller/offlinePay/update`, params).then(res => res.data); };

/**
 * 代理商管理
 */
// 代理商类型
export const getAgentLevelCombobox = () => { return service.get(`controller/agent/getAgentLevelCombobox`).then(res => res.data); };
// 实名认证状态
export const getRealAuthStatusCombobox = () => { return service.get(`controller/user/getRealAuthStatusCombobox`).then(res => res.data); };
// 分页查询代理商资金列表
export const getAgentFundListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/agentFund/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询代理商资金流水
export const getAgentFundDetailListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/agentFundDetail/getAgentFundDetailListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 资金类型
export const getFundTypeCombobox = () => { return service.get(`controller/agentFundDetail/getFundTypeCombobox`).then(res => res.data); };

/**
 * 用户管理
 */
// 分页查询代理商
export const getUserListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/user/getUserListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询代理商资金信息
export const getCustomerFundListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/customerFund/getCustomerFundListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询客户资金流水信息
export const getCustomerFundDetailListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/customerFundDetail/getCustomerFundDetailListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };

/**
 * 订单管理
 */
// 分页查询订单
export const getOrderListPage = (pageNum, pageSize, bodyParam) => { return service.post(`controller/order/getOrderListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 订单状态
export const getOrderStatusCombobox = () => { return service.get(`controller/order/getOrderStatusCombobox`).then(res => res.data); };
// 实时风控
export const riskControl = bodyParam => { return axios.post(`/batchApi/controller/riskController/calcProfitCurrentTime`, bodyParam).then(res => res.data); };

/**
 * 结算管理
 */
// 持仓中订单分页查询
export const findHoldReportPages = (pageNum, pageSize, bodyParam) => { return service.post(`controller/holdReport/findHoldReportPages?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 已结算订单分页查询
export const findAlreadySettledReportPages = (pageNum, pageSize, bodyParam) => { return service.post(`controller/alreadySettledReport/findAlreadySettledReportPages?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 导出报表
export const exportExcel = (url, bodyParam, name) => {
    return service.post(url, bodyParam, { responseType: 'blob' }).then(res => {
        debugger;
        const blob = new Blob([res.data], { type: "application/vnd.ms-excel;charset=utf-8" });
        let data = dataUtils.formatDate(new Date, 'yyyyMMdd');
        // 文件名称
        const fileName = name + "_" + data + '.xls';
        const linkNode = document.createElement('a');
        // a标签的download属性规定下载文件的名称
        linkNode.download = fileName;
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob);
        document.body.appendChild(linkNode);
        // 模拟点击
        linkNode.click();
        // 释放URL对象
        URL.revokeObjectURL(linkNode.href);
        document.body.removeChild(linkNode);
        Message({ message: name + '下载成功', type: 'success' });
    }).catch(error => {
        Message({ message: name + '下载失败', type: 'error' });
    })
}