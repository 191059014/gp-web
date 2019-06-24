import axios from 'axios';

let baseUrl = 'http://localhost:8090';

/**
 * 系统管理
 */
// 登陆
export const login = params => { return axios.post(`${baseUrl}/controller/login/login`, params).then(res => res.data); };
// 分页获取代理商列表
export const getAgentListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agent/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加代理商
export const addAgent = params => { return axios.post(`${baseUrl}/controller/agent/addAgent`, params).then(res => res.data); };
// 修改代理商
export const updateAgent = params => { return axios.post(`${baseUrl}/controller/agent/updateAgent`, params).then(res => res.data); };
// 删除代理商
export const deleteAgentById = agentId => { return axios.get(`${baseUrl}/controller/agent/deleteAgentById?agentId=` + agentId).then(res => res.data); };

/**
 * 审核管理
 */
// 支付状态下拉框
export const getOfflinePayStatusCombobox = () => { return axios.get(`${baseUrl}/controller/offlinePay/getOfflinePayStatusCombobox`).then(res => res.data); };
// 支付渠道下拉框
export const getOfflinePayChannelCombobox = () => { return axios.get(`${baseUrl}/controller/offlinePay/getOfflinePayChannelCombobox`).then(res => res.data); };
// 审核状态下拉框
export const getOfflineCheckStatusCombobox = () => { return axios.get(`${baseUrl}/controller/offlinePay/getOfflineCheckStatusCombobox`).then(res => res.data); };
// 分页查询线下支付列表
export const getOfflinePayListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/offlinePay/getOfflinePayListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 修改审核信息
export const updateOfflinePay = params => { return axios.post(`${baseUrl}/controller/offlinePay/update`, params).then(res => res.data); };

/**
 * 代理商管理
 */
// 代理商类型
export const getAgentLevelCombobox = () => { return axios.get(`${baseUrl}/controller/agent/getAgentLevelCombobox`).then(res => res.data); };
// 实名认证状态
export const getRealAuthStatusCombobox = () => { return axios.get(`${baseUrl}/controller/user/getRealAuthStatusCombobox`).then(res => res.data); };
// 分页查询代理商资金列表
export const getAgentFundListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agentFund/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询代理商资金流水
export const getAgentFundDetailListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agentFundDetail/getAgentFundDetailListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 资金类型
export const getFundTypeCombobox = () => { return axios.get(`${baseUrl}/controller/agentFundDetail/getFundTypeCombobox`).then(res => res.data); };

/**
 * 用户管理
 */
// 分页查询代理商
export const getUserListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/user/getUserListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询代理商资金信息
export const getCustomerFundListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/customerFund/getCustomerFundListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询客户资金流水信息
export const getCustomerFundDetailListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/customerFundDetail/getCustomerFundDetailListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
