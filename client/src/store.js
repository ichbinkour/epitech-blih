import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  actions: {
    setUser(context, user) {
      context.commit("recieveUser", user);
    }
  },
  mutations: {
    recieveUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  plugins: [createPersistedState()],
})
