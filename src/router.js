import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (from, to, next) => {
        if (store.getters["getToken"] == null) {
          next({
            name: 'login'
          })
        } else {
          next()
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});
