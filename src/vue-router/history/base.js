export function createRoute(record, location) { // {path:'/',matched:[record,record]}
  const matched = [];
  if (record) {
    while (record) {
      matched.unshift(record); // 就将当前记录的父亲放到前面
      record = record.parent
    }
  }
  return {
    ...location,
    matched,
  }
}

// 迭代queue
function runQueue(queue, iterator, cb) {
  function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      iterator(queue[index], () => {
        step(index + 1)
      })
    }
  }
  step(0)
}

export default class History {
  constructor(router) {
    this.router = router;
    // 设置根路径
    this.current = createRoute(null, {
      path: '/',
    });
    this.cb = null;
  }

  // 根据路径进行跳转
  transitionTo(location, onComplete) {
    // 去匹配路径
    const route = this.router.match(location);
    // 相同路径不必过渡
    if (location === this.current.path && route.matched.length === this.current.matched.length) {
      return
    }
    const queue = [].concat(this.router.beforeHooks);
    const iterator = (hook, next) => {
      // 分别对应 to，from,next参数
      hook(route, this.current, () => {
        next();
      });
    }
    // 依次执行队列 ,执行完毕后更新路由
    runQueue(queue, iterator, () => {
      this.updateRoute(route);
      onComplete && onComplete();
    });
  }
  // 跟新current属性,更新_route属性触发更新
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }
  // 注册函数
  listen(cb) {
    this.cb = cb;
  }
}
