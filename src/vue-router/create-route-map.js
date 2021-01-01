// 收集路径的对应渲染关系
function createRouteMap(routes, oldPathList, oldPathMap) {
  // 当第一次加载的时候没有 pathList 和 pathMap
  const pathList = oldPathList || [];
  const pathMap = oldPathMap || Object.create(null);
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap
  }
}

// 将当前路由存储到pathList和pathMap中
function addRouteRecord(route, pathList, pathMap, parent) {
  // 如果是子路由记录 需要增加前缀 
  const path = parent ? `${parent.path}/${route.path}` : route.path;
  const record = {
    path,
    component: route.component,
    parent
  }
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  // 添加子路由
  if (route.children) {
    route.children.forEach(r => {
      // 传入父亲route
      addRouteRecord(r, pathList, pathMap, route);
    })
  }
}

export default createRouteMap;
