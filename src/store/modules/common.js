
const common = {
  namespaced: true,
  state: {
    activeDeviceId: null
  },

  mutations: { // commit
    SET_ACTIVE_DEVICE: (state, deviceId) => {
      state.activeDeviceId = deviceId
    }
  },
  actions: { // dispatch
    // 设置选中的设备id，用于从其他页面跳转到对应设备的详情页
    SetActiveDeviceId({ commit, state }, data) {
      commit('SET_ACTIVE_DEVICE', data)
    }
  }
}
export default common
