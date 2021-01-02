import History from "./base";

function getLocation() {
  const path = window.location.pathname;
  return (path || '/') + window.location.search + window.location.hash;
}
export default class BrowerHistory extends History {
  constructor(router) {
    super(router);
    this._startLocation = getLocation();
  }

  init(app) {
    const history = this.router.history;

    const setupPathListener = () => {
      history.setupListener(); // 监听路径变化
    }
    // 父类提供方法负责跳转
    history.transitionTo(
      history.getCurrentLocation(), // 子类获取对应的路径
      // 跳转成功后注册路径监听，为视图更新做准备
      setupPathListener
    );
    history.listen((route) => { // 需要更新_route属性
      app._route = route;
    });
  }

  // 获取当前路径
  getCurrentLocation() {
    return getLocation();
  }

  // 监听path变化
  setupListener() {
    window.addEventListener('popstate', () => {
      // 根据当前path值 过度到对应路径
      this.transitionTo(getLocation());
    });
  }

  push(location) {
    window.history.pushState({ key: Date.now().toFixed(3) }, '', location);
    this.transitionTo(getLocation());
  }
}
