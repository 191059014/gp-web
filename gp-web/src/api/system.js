import axios from 'axios';

let baseUrl = 'http://localhost:8090';

// 登陆
export const login = params => { return axios.get(`${baseUrl}/controller/login/login`, { params: params }).then(res => res.data); };
// 分页获取用户列表
export const getAgentListPage = (pageNum, pageSize, bodyParam) => { return axios.post(`${baseUrl}/controller/agent/getAgentListPage?pageNum=` + pageNum + '&pageSize=' + pageSize, bodyParam).then(res => res.data); };
// 添加用户
export const addAgent = params => { return axios.post(`${baseUrl}/controller/agent/addAgent`, params).then(res => res.data); };
// 修改用户
export const modifyAgent = params => { return axios.post(`${baseUrl}/controller/agent/modifyAgent`, params).then(res => res.data); };
// 删除用户
export const deleteAgentById = agentId => { return axios.get(`${baseUrl}/controller/agent/deleteAgentById?agentId=` + agentId).then(res => res.data); };