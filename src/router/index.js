import Vue from "vue"
// 改成自定义的
import VueRouter from "@/vue-router/index"
import Home from "@/components/Home.vue"
import About from "@/components/About.vue"
import ChildA from "@/components/ChildA.vue"

Vue.use(VueRouter)

export default new VueRouter({ // 创建Vue-router实例，将实例注入到main.js中
  mode: "history",
  routes: [
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
          path: "a",
          component: ChildA
        },
        {
          path: "b",
          component: {
            render: h => <h1>about BBB</h1>
          }
        }
      ]
    }
  ]
})
