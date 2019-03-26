import { Route } from 'vue-router';
import AppConsts from '@/shared/AppConsts';
import store from '@/store/store';

/**
 * 路由守卫
 */
class RouterGuard {


    beforeResolve(to: Route, from: Route, next: any) {
        // 路由信息设置了需要守卫，跳转路由时需要先登录
        if (to.meta && to.meta.routerGuard) {
            // 需要路由守护,校验token
            if (!abp.auth.getToken()) {
                next({
                    name: '/passport/login', query: {
                        redirect: '/',
                    }
                });
                return;
            }
        }
        next();
    }

    beforeEach(to, from, next) {
        next();
    }


    afterEach(to: any, from: any) {
        // 创建reuseTab
        const tabInfo: any = {
            name: to.name,
            closable: true,
            path: to.name,
            title: to.meta.title,
            activeName: from.name,
            i18n: to.meta.i18n || null,
        };

        // 设置复用tab
        store.dispatch('reuseTab/add', tabInfo);
        // 设置标题
        store.commit('app/changeTitle', {
            title: tabInfo.title,
            i18n: tabInfo.i18n,
        });
    }

}

const routerGuard = new RouterGuard();
export default routerGuard;