import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Repository from "./views/Repository.vue";
import HomeRepositoriesList from "./components/HomeRepositoriesList";

import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      component: Home,
      beforeEnter: (from, to, next) => {
        if (store.getters["getUser"] == null) {
          next({
            name: 'login'
          })
        } else {
          next()
        }
      },
      children: [{
          path: '/',
          name: "home",
          component: HomeRepositoriesList,
          meta: {
            breadcrumb: [{
              text: 'Home',
              active: true
            }]
          },
        },
        {
          path: '/repository/:name',
          name: 'repository',
          component: Repository,
          meta: {
            breadcrumb: [{
                text: 'Home',
                to: {
                  path: '/'
                }
              },
              {
                text: 'Repository',
                active: true
              }
            ]
          },
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (from, to, next) => {
        if (store.getters["getUser"] != null) {
          next({
            name: '/'
          })
        } else {
          next()
        }
      },
    },
  ],
});
