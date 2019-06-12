// 定义所需的 mutations
const mutations = {
    setLoginInfo(state, agentId, agentName, password) {
        state.AgentDO.agentId = agentId;
        state.AgentDO.agentName = agentName;
        state.AgentDO.password = password;
    }
}

export default mutations