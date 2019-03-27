import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '../root.store';

export interface Doctitle {
  title?: string;
  i18n?: string;
}

export interface IAppState {
  isCollapse: boolean ;
  name?: string;
  doctitle?: Doctitle;
}


const mutations: MutationTree<IAppState> = {
  collapse(state: IAppState) {
    state.isCollapse = !state.isCollapse;
  },
  appName(state: IAppState, appinfo: any) {
    state.name = appinfo.name;
  },
  changeTitle(state: IAppState, titleInfo: any) {
    state.doctitle = {
      ...titleInfo,
    };
  },
};


const actions: ActionTree<IAppState, RootState> = {

};

const getters: GetterTree<IAppState, RootState> = {

};

const appState: IAppState = {
  isCollapse: false,
  name: '',
  doctitle: {
    title: '',
  },
};

const app: Module<IAppState, RootState> = {
  namespaced: true,
  state: appState,
  getters,
  actions,
  mutations,
};

export default app;
