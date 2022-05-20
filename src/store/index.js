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
      const {username, password} = userInfos
      console.log(userInfos);
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
      console.log("expChecker has been called");
      const todayDate = new Date().getTime();
      if (userData.userData === null) {
        console.log("userData is null")
        localStorage.setItem("expChecking" , "false");
        return false
      } else {
        console.log("LOGGED userData" , userData);
        console.log("LOGGED todayDate -> " , todayDate);
        console.log("LOGGED Exp       -> " , userData.userData.Exp);
        if ( todayDate > userData.userData.Exp) {
          console.log("returned false // todayDate > userData.Exp");
          localStorage.setItem("expChecking" , "false");
          localStorage.removeItem("userData");
          console.log("userData has been removed from localStorage");
          return false;
        } else {
          console.log("returned true // todayDate < userData.Exp");
          localStorage.setItem("expChecking" , "true");
          return true;
        }
      }
    }
  },
  modules: {
  }
})
