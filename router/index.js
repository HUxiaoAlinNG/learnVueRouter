import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"
import About from "./views/about.vue"

Vue.use(Router);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About,
    children: [
      {
        path: "a", component: {
          render(h) { return <h1>about A</h1> }
        }
      },
      {
        path: "b", component: {
          render(h) { return <h1>about B</h1> }
        }
      }
    ]
  }
]

export default new Router({
  routes,
});