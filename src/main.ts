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
import AppConsts from './shared/AppConsts';
import Util from './shared/utils/util';
import { async } from 'rxjs/internal/scheduler/async';

// 创建vue实例
const rootApp = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
});


async function main() {
  // 获取appconfig信息
  var result = await AppPreBootstrap.getApplicationConfig();
  AppConsts.appBaseUrl = window.location.protocol + '//' + window.location.host;
  AppConsts.remoteServiceBaseUrl = result.data.remoteServiceBaseUrl;
  // 获取当前(未)登陆用户系统配置信息
  result = await AppPreBootstrap.getUserConfiguration();
  (<any>abp) = Util.extend(true, abp, result.data);
  abp.localization.defaultSourceName = AppConsts.localization.defaultLocalizationSourceName;
  // 获取(未)登陆用户信息
  result = await (new SessionServiceProxy('', httpClient).getCurrentLoginInformations());
}

main().then(() => {
  // 结束加载动画
  preloaderFinished();

  // 初始化vue app容器
  rootApp.$mount('#app-main');
  (window as any).appBootstrap();
});
