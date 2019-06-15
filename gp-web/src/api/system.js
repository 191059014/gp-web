import axios from 'axios';

let baseUrl = 'http://localhost:8090';

/**
 * 系统管理
 */
// 登陆
export const login = params => { return axios.get(`${baseUrl}/controller/login/login`, { params: params }).then(res => res.data); };
// 分页获取用户列表
export const getUserListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/user/getUserListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加用户
export const addUser = params => { return axios.post(`${baseUrl}/controller/user/addUser?inviteCode=`+params.inviteCode, params).then(res => res.data); };
// 修改用户
export const updateUser = params => { return axios.post(`${baseUrl}/controller/user/updateUser`, params).then(res => res.data); };
// 删除用户
export const deleteUserById = agentId => { return axios.get(`${baseUrl}/controller/user/deleteUserById?agentId=` + agentId).then(res => res.data); };

/**
 * 审核管理
 */
// 支付状态下拉框
export const getOfflinePayStatusCombobox = () => { return axios.get(`${baseUrl}/controller/offlinePay/getOfflinePayStatusCombobox`).then(res => res.data); };
// 支付类型下拉框
export const getOfflinePayTypeCombobox = () => { return axios.get(`${baseUrl}/controller/offlinePay/getOfflinePayTypeCombobox`).then(res => res.data); };
// 分页查询线下支付列表
export const getOfflinePayListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/offlinePay/getOfflinePayListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };

/**
 * 代理商管理
 */
// 代理商类型
export const getAgentLevelCombobox = () => { return axios.get(`${baseUrl}/controller/agent/getAgentLevelCombobox`).then(res => res.data); };
// 实名认证状态
export const getRealAuthStatusCombobox = () => { return axios.get(`${baseUrl}/controller/agent/getRealAuthStatusCombobox`).then(res => res.data); };
// 分页查询代理商资金列表
export const getAgentFundListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agentFund/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 分页查询代理商资金流水
export const getAgentFundDetailListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agentFundDetail/getAgentFundDetailListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 资金类型
export const getFundTypeCombobox = () => { return axios.get(`${baseUrl}/controller/agentFundDetail/getFundTypeCombobox`).then(res => res.data); };