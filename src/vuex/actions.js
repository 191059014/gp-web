// 响应在view 上的用户书输入导致的状态变化
export const setLoginInfo = ({ commit }, agentId, agentName, password) => {
    commit('setLoginInfo', agentId, agentName, password);
}