import MainLayout from '@/layout/main/MainLayout.vue';

const adminRouter = {
  path: '',
  component: MainLayout,
  redirect: '/workplace',
  name: '/',
  meta: {
    routerGuard: true,
  },
  children: [
    {
      path: '/workplace',
      name: '/workplace',
      routerGuard: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Workplace.vue'),
      meta: {
        routerGuard: true,
      },
    },
    {
      path: '/analysis',
      name: '/analysis',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Analysis.vue'),
      meta: {
        routerGuard: true,
      },
    },
    {
      path: '/monitor',
      name: '/monitor',
      routerGuard: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Monitor.vue'),
      meta: {
        routerGuard: true,
      },
    },
  ],
};

export default adminRouter;
