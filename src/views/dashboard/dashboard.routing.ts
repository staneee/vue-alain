import MainLayout from '@/layout/main/MainLayout.vue';

const dashboardRouter = {
  path: '',
  component: MainLayout,
  redirect: '/analysis',
  name: '/',
  meta: {
    icon: 'dashboard',
    routerGuard: true,
  },
  children: [
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
    {
      path: '/workplace',
      name: '/workplace',
      routerGuard: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Workplace.vue'),
      meta: {
        routerGuard: true,
      },
    }],
};

export default dashboardRouter;
