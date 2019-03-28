import { Route } from 'vue-router';
import { IReusetTabItem } from '@/shared/states/modules/reuse-tab.state';
import AppConsts from '@/shared/AppConsts';
import appService from '@/shared/services/app.service';
import reuseTabService from '@/shared/services/reuse-tab.service';
import menuService from '@/shared/services/menu.service';



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
                    name: AppConsts.loginUrl,
                    query: {
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
        let mapMenu = menuService.getMapMenu(to.name);
        let newReuseTab: IReusetTabItem = {
            name: to.name,
            closable: true,
            link: to.path,
            activeName: from.name,
            text: to.name,
        }
       
        // 设置复用tab
        if (mapMenu) {
            newReuseTab.name = mapMenu.name;
            newReuseTab.link = mapMenu.link;
            newReuseTab.text = mapMenu.text;
        } 
        reuseTabService.add(newReuseTab);

        // 修改标题
        appService.changeTitle({
            name: newReuseTab.name,
            title: menuService.getTitle(newReuseTab.name)
        });
    }
}

const routerGuard = new RouterGuard();
export default routerGuard;