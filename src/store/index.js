import { createStore } from 'vuex'

export default createStore({
  state: {
    totalCreated1Day: 0,
    userId: "",
  },
  getters: {

  },
  mutations: {
    setTotalCreated1Day(state){
      state.totalCreated1Day++
    },
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
    userIdSetter({commit} , userInfo) {
      console.log("console LOGGED userInfo -> " , userInfo)
      console.log("console LOGGED userInfo-1 -> " , typeof(userInfo))
      console.log("console LOGGED userInfo-2 -> " , Object.entries(userInfo))
      this.state.userId = userInfo;
      console.log("console LOGGED this.userId -> " , this.userId)
    },
    testAction({commit}) {
      console.log("read")
      console.log("LOGGED USERID -> " , this.userId)
    }
  },
  modules: {
  }
})
