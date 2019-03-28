import PassportLayout from '@/layout/passport/passport.component.vue';
import AppConsts from '@/shared/AppConsts';
import { RouteConfig } from 'vue-router';

const accountRouter: RouteConfig = {
    name: '/account',
    path: '/account',
    component: PassportLayout,
    redirect: AppConsts.loginUrl,
    meta: {
        title: '登录页',
        icon: 'appstore-o',
        hide: true,
    },
    children: [
        {
            name: AppConsts.loginUrl,
            path: AppConsts.loginUrl,
            component: () => import('@/views/account/login/login.vue'),
            meta: {
                title: '登录',
                i18n: 'Login',
                hide: true
            },
        },

    ],
};

export default accountRouter;
