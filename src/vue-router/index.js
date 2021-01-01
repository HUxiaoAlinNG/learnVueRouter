import createMatcher from "./create-matcher";
import install from "./install";

export default class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.matcher = createMatcher(options.routes || []);
  }

  // 快捷方式
  match(location) {
    return this.matcher.match(location);
  }
}

VueRouter.install = install;
