import PassportLayout from '@/layout/passport/passport.component.vue';

const accountRouter = {
    path: '/passport',
    component: PassportLayout,
    name: '/passport',
    redirect: '/passport/login',
    meta: {
        title: '登录页',
        icon: 'appstore-o',
    },
    children: [{
        path: 'login',
        name: '/account/login',
        component: () => import('@/views/account/login/login.vue'),
        meta: {
            title: '登录',
            i18n: 'Login'
        },
    },
    ],
};

export default accountRouter;
