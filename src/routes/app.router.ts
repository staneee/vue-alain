import Vue from 'vue';
import Router from 'vue-router';
import RouterGuard from './router-guard';

import dashboardrouter from './dashboard.router';

import listrouter from './list.router';
import formrouter from './form.router';
import detailrouter from './detail.router';

import widgetsrouter from './widgets.router';
import passportrouter from './passport.router';



Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    /** 其余的路由 */
    dashboardrouter,
    listrouter,
    formrouter,
    detailrouter,
    widgetsrouter,
    passportrouter,
  ],
});


/** 绑定路由校验 */
router.beforeResolve(RouterGuard.beforeResolve);
router.beforeEach(RouterGuard.beforeEach);
router.afterEach(RouterGuard.afterEach);


export default router;
