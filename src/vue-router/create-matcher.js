import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
  // 收集所有的路由路径, 收集路径的对应渲染关系
  const { pathList, pathMap } = createRouteMap(routes);
  // 动态加载路由
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  // 根据路径找到对应的记录
  function match(location) {
    const record = pathMap[location]
    if (record) { // 根据记录创建对应的路由
      return createRoute(record, {
        path: location
      })
    }

    return createRoute(null, {
      path: location
    })
  }
  return {
    addRoutes,
    match
  }
}
