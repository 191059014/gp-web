// 响应在view 上的用户书输入导致的状态变化
export const setRiskControlTimer = ({ commit }, riskControlTimer) => {
    commit('setRiskControlTimer', riskControlTimer);
}
export const getRiskControlTimer = ({ commit }) => {
    commit('getRiskControlTimer');
}