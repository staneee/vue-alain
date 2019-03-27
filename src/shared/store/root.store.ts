import Vue from 'vue';
import Vuex from 'vuex';

import appState from './modules/app.store';
import userState from './modules/user.store';
import reuseTabState from './modules/reuse-tab.store';

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
  },
});
