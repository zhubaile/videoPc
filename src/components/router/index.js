import routerInit from "../miniapp-router/lib/router";
import Taro from "@tarojs/taro";
import { defaultPath, routes } from "./routes";
import { isEmpty, isJSON } from "public/utils/index";

let router;

const initState = { currentPath:'' };
function routerDispatch({ type, data }) {
    let app = Taro.getApp();
    app.store.dispatch({ type, data });
}

export function routerReducer (state = initState, action) {
    switch (action.type) {
        case "ROUTER_CHANGE":
            return { ...state, ...action.data };
            break;
        default:
            return state;
    }
}
/**
 * 处理路由格式
 * @param {*} routes 
 * @returns 
 */
export function convertToRouterOption (routes) {
    return routes.map(route => {
        let path = route.path;
        let component = route.component;
        if (!component && path && !route.children) {
            component = route.path.replace('/', '');
        }

        if (!path) {
            route.path = '/' + route.name;
            if (!component) {
                component = 'unimplemented';
            }
        }

        let newRoute = {
            path:route.path,
            abstract:route.abstract,
            default:route.default,
        };
        if (component) {
            newRoute.component = component;
        }
        if (route.children) {
            newRoute.children = convertToRouterOption(route.children);
        }
        return newRoute;
    });
}
/**
 * 初始化路由
 * @param scope
 * @param page 有值则代表用这个路由作为初始路由
 */
export function initRouter (scope, page) {
    let routesConverted = convertToRouterOption(routes);
    let initPath = isEmpty(page) ? defaultPath : page;
    routesConverted = {
        routes:routesConverted,
        option: { initPath },
    };
    console.log(routesConverted);
    routerInit.call(scope, routesConverted);
    router = scope.$router;
}

/**
 * 改变路由(跳转页面)
 * @param path
 */
export function changeRoute ({ path, param = null }) {
    router.push(path);
    if (param) {
        router.params.param = JSON.stringify(param);
    }
    routerDispatch({
        type:'ROUTER_CHANGE',
        data: {currentPath:path}
    });
}

/**
 * 获取路由传递的参数
 */
export function getRouteParams () {
    return (router.params && router.params.param) ? JSON.parse(router.params.param) : '';
}

/**
 * 获取当前路径位置
 * @returns {string|__setCurrentPath.props}
 */
export function getCurrentPath () {
    return router.currentPath;
}

/**
 * 获取当前页面
 */
export function getCurrentPage () {
    return getCurrentPath().split('/')[2];
}

export function getCurrentMainRouteName() {
    let name = '';
    for (let i=0; i<routes.length; i++) {
        if (routes[i].path.indexOf(getCurrentPath().split('/')[1]) > -1) {
            name = routes[i].name;
            break;
        }
    }
    return name;
}

/**
 * 路由跳转
 * @param route
 * @param parent
 */
 export const handleChangeRoute = (route, parent) => {
    if (route.redirect) {
        changeRoute({ path: route.redirect, param: route.param });
        return;
    }
    if (route.abstract) {
        if (!Array.isArray(route.children) || route.children.length == 0) {
            return;
        }
        let child = route.children.find(item => item.default);
        if (!child) {
            child = route.children[0];
        }
        handleChangeRoute(child, route);
        return;
    }
    let path = route.path;
    if (parent) {
        path = parent.path + path;
    }
    path = path.replace(/\/\:.+$/, '');
    changeRoute({ path });
};