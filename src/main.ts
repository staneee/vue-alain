import Vue from 'vue';

import { i18n } from './app/index';

import App from './App.vue';
import router from '@/routes/app.router';
import store from '@/store/store';
import './registerServiceWorker';

// 初始化加载器
import { preloaderFinished } from './util/preloader';

Vue.config.productionTip = false;

import './directives/index';
import AppPreBootstrap from './AppPreBootstrap';
import { SessionServiceProxy } from './shared/service-proxies/service-proxies';
import httpClient from './shared/utils/http-client';

import * as _ from 'lodash';

// 创建vue实例
const rootApp = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
});


async function main() {
  await AppPreBootstrap.bootstrap();
  // 获取(未)登陆用户信息
  var result = await (new SessionServiceProxy('', httpClient).getCurrentLoginInformations());
}

main().then(() => {
  // 结束加载动画
  preloaderFinished();

  // 初始化vue app容器
  rootApp.$mount('#app-main');
  (window as any).appBootstrap();
});
