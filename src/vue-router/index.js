import createMatcher from "./create-matcher";
import install from "./install";
import HashHistory from "../vue-router/history/hash-history"
import BrowerHistory from "../vue-router/history/brower-history"
export default class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.matcher = createMatcher(options.routes || []);
    switch (this.mode) {
      case "history":
        this.history = new BrowerHistory(this);
        break;
      case "hash":
        this.history = new HashHistory(this);
        break;
      default:
        this.history = new HashHistory(this);
        break;
    }
    this.beforeHooks = [];
  }

  // 快捷方式
  match(location) {
    return this.matcher.match(location);
  }

  init(app) {
    this.history.init(app);
  }

  push(location) {
    window.location.hash = location;
  }

  // 将fn注册到队列中
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
}

VueRouter.install = install;
