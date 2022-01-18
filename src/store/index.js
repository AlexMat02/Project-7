import { createStore } from 'vuex'

export default createStore({
  state: {
    totalCreated1Day: 0,
  },
  getters: {

  },
  mutations: {
    dateCreator() {
      const randomNumber = Math.random();
      const createdDate = new Date();
      const time = createdDate.setDate(randomNumber);
      const time2 = createdDate.setDate(randomNumber - 1);
      return time, time2;
    }
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
