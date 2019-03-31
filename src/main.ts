import Vue from 'vue';

import './directives/index';
import '@/registerServiceWorker';


import App from '@/App.vue';
import RootRouter from '@/root.routing';
import RootStore from '@/shared/states/root.state';

import AppPreBootstrap from '@/AppPreBootstrap';

import { i18n } from '@/app/index';
import { preloaderFinished } from '@/shared/utils/preloader';

import * as _ from 'lodash';
import menuService from '@/shared/services/menu.service';
import menus from '@/shared/AppMenus';


Vue.config.productionTip = false;

// 创建vue实例
const rootApp = new Vue({
  router: RootRouter,
  store: RootStore,
  i18n: i18n,
  render: (h) => h(App),
});


async function main() {
  await AppPreBootstrap.bootstrap();
  // 设置菜单
  menuService.setMenus(menus);
}

main().then(() => {
  // 结束加载动画
  preloaderFinished();

  // 初始化vue app容器
  rootApp.$mount('#app-main');
  (window as any).appBootstrap();
});
