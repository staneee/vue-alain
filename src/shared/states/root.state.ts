import Vue from 'vue';
import Vuex from 'vuex';

import appState from './modules/app.state';
import userState from './modules/user.state';
import reuseTabState from './modules/reuse-tab.state';
import menuState from './modules/menu.state';
import languageState from './modules/language.state';

Vue.use(Vuex);

export interface RootState {
}

export default new Vuex.Store<RootState>({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app: appState,
    reuseTab: reuseTabState,
    user: userState,
    menu: menuState,
    language: languageState,
  },
});
