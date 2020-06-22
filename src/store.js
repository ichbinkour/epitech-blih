import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    api: null
  },
  mutations: {
    recieveToken(state, token) {
      state.token = token;
    },
    receiveApi(state, api) {
      state.api = api;
    }
  },
  actions: {
    setToken(context, token) {
      context.commit("recieveToken", token);
    },
    setApi(context, api) {
      context.commit("recieveApi", api);
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getApi(state) {
      return state.api;
    }
  }
})
