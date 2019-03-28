import PassportLayout from '@/layout/passport/passport.component.vue';
import AppConsts from '@/shared/AppConsts';

const accountRouter = {
    path: '/account',
    component: PassportLayout,
    name: '/account',
    redirect: AppConsts.loginUrl,
    meta: {
        title: '登录页',
        icon: 'appstore-o',
    },
    children: [{
        path: 'login',
        name: AppConsts.loginUrl,
        component: () => import('@/views/account/login/login.vue'),
        meta: {
            title: '登录',
            i18n: 'Login'
        },
    },
    ],
};

export default accountRouter;
