import { createStore } from 'vuex'

export default createStore({
  state: {
    totalCreated1Day: 0,
  },
  getters: {

  },
  mutations: {
    setTotalCreated1Day(state){
      state.totalCreated1Day++
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit;
      console.log(userInfos)
    }
  },
  modules: {
  }
})
