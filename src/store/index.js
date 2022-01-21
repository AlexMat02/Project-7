import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {

  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      console.log("request has been sent");
      console.log(userInfos);
      fetch("http://localhost:4000/auth/signup", {method: 'POST', 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(userInfos)})
    },
  },
  modules: {
  }
})
