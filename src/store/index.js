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
      const {username, password} = userInfos
      const userLogs = {
        username: username,
        password: password
      }
      localStorage.setItem("signupLogs", JSON.stringify(userLogs))
      fetch("http://localhost:4000/auth/signup", {method: 'POST', 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(userInfos)})
    },
    expChecker: ({commit}, userData) => {
      const todayDate = new Date().getTime();
      if (userData.userData === null) {
        localStorage.setItem("expChecking" , "false");
        return false
      } else {
        if ( todayDate > userData.userData.Exp) {
          localStorage.setItem("expChecking" , "false");
          localStorage.removeItem("userData");
          return false;
        } else {
          localStorage.setItem("expChecking" , "true");
          return true;
        }
      }
    },
  },
  modules: {
  }
})
