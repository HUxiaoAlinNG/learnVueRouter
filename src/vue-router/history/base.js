export function createRoute(record, location) { // {path:'/',matched:[record,record]}
  const res = [];
  if (record) {
    while (record) {
      res.unshift(record); // 就将当前记录的父亲放到前面
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res
  }
}

export default class History {
  constructor(router) {
    this.router = router;
    // 设置根路径
    this.current = createRoute(null, {
      path: '/'
    })
  }

  // 根据路径进行跳转
  transitionTo(location, onComplete) {
    // 去匹配路径
    const route = this.router.match(location);
    // 相同路径不必过渡
    if (location === route.path && route.matched.length === this.current.matched.length) {
      return
    }
    this.updateRoute(route);
    onComplete && onComplete();
  }
  // 跟新current属性
  updateRoute(route) {
    this.current = route;
  }
}
