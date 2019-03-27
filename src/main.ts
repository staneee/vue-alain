import Vue from 'vue';

import './directives/index';
import '@/registerServiceWorker';



import App from '@/App.vue';
import RootRouter from '@/root.router';
import RootStore from '@/shared/store/root.store';

import AppPreBootstrap from '@/AppPreBootstrap';
import httpClient from '@/shared/utils/http-client';

import { SessionServiceProxy } from '@/shared/service-proxies/service-proxies';
import { i18n } from '@/app/index';
import { preloaderFinished } from '@/shared/utils/preloader';

import * as _ from 'lodash';



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
  // 获取(未)登陆用户信息
  var result = await (new SessionServiceProxy(undefined, httpClient).getCurrentLoginInformations());
}

main().then(() => {
  // 结束加载动画
  preloaderFinished();

  // 初始化vue app容器
  rootApp.$mount('#app-main');
  (window as any).appBootstrap();
});
