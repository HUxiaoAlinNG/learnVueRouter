import History from "./base";

// 确保有hash
function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

function getHash() {
  // 去掉#
  return window.location.hash.slice(1);
}

export default class HashHistory extends History {
  constructor(router) {
    super(router);
    ensureSlash();
  }

  init(app) {
    const history = this.history;

    const setupHashListener = () => {
      history.setupListener(); // 监听路径变化
    }
    // 父类提供方法负责跳转
    history.transitionTo(
      history.getCurrentLocation(), // 子类获取对应的路径
      // 跳转成功后注册路径监听，为视图更新做准备
      setupHashListener
    )
  }

  // 获取当前路径
  getCurrentLocation() {
    return getHash();
  }

  // 监听hash变化
  setupListener() {
    window.addEventListener('hashchange', () => {
      // 根据当前hash值 过度到对应路径
      this.transitionTo(getHash());
    })
  }
}
