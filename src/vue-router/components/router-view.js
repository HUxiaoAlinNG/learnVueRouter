export default {
  functional: true,
  render(h, context) {
    let { parent, data } = context;
    const route = parent && parent.$route;
    let depth = 0;
    // 增加标示
    data.routerView = true;
    while (parent) { // 根据matched 渲染对应的router-view
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const record = route && route.matched[depth];
    if (!record) {
      return h();
    }

    return h(record.component, data);
  }
}
