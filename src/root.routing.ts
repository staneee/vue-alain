import Vue from 'vue';
import Router from 'vue-router';
import RouterGuard from '@/shared/auth/router-guard';

import accountRouter from '@/views/account/account.routing';
import dashboardRouter from '@/views/dashboard/dashboard.routing';
import detailRouter from '@/views/detail/detail.routing';
import formRouter from '@/views/form/form.routing';
import listRouter from '@/views/list/list.routing';
import widgetsRouter from '@/views/widgets/widgets.routing';





Vue.use(Router);

const rootRouter = new Router({
  base: process.env.BASE_URL,
  routes: [
    /** 其余的路由 */
    accountRouter,
    // 
    dashboardRouter,
    detailRouter,
    formRouter,
    listRouter,
    widgetsRouter,
  ],
});


/** 绑定路由守卫 */
rootRouter.beforeResolve(RouterGuard.beforeResolve);
rootRouter.beforeEach(RouterGuard.beforeEach);
rootRouter.afterEach(RouterGuard.afterEach);


export default rootRouter;
