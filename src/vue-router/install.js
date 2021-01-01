import routerLink from "./components/router-link";
import routerView from "./components/router-view";

export default function install(_Vue) {
  _Vue.component("router-view", routerView);
  _Vue.component("router-link", routerLink);
  _Vue.mixin({
    beforeCreate() {
      // 根组件
      if (this.$options.router) {
        this._routerRoot = this; // 将根实例挂载在_routerRoot属性上
        this._router = this.$options.router; // 将当前router实例挂载在_router上
        this._router.init(this); // 初始化路由,这里的this指向的是根实例
        // 子组件
      } else { // 父组件渲染后会渲染子组件
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  })
};
