import Vue from 'vue';
import Router from 'vue-router';
import RouterGuard from '@/shared/auth/router-guard';

import AccountRouter from '@/views/account/account.router';
import DashboardRouter from '@/views/dashboard/dashboard.router';
import DetailRouter from '@/views/detail/detail.router';
import FormRouter from '@/views/form/form.router';
import ListRouter from '@/views/list/list.router';
import WidgetsRouter from '@/views/widgets/widgets.router';





Vue.use(Router);

const RootRouter = new Router({
  base: process.env.BASE_URL,
  routes: [
    /** 其余的路由 */
    AccountRouter,
    // 
    DashboardRouter,
    DetailRouter,
    FormRouter,
    ListRouter,
    WidgetsRouter,
  ],
});


/** 绑定路由守卫 */
RootRouter.beforeResolve(RouterGuard.beforeResolve);
RootRouter.beforeEach(RouterGuard.beforeEach);
RootRouter.afterEach(RouterGuard.afterEach);


export default RootRouter;
