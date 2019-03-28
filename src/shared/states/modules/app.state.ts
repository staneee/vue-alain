import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '../root.state';

export interface IDocumentTitle {
  name: string;
  title?: string;
}

export interface IBreadcrumb {
  icon?: string;
  text?: string;
}


export interface IAppState {
  isCollapse: boolean;
  name?: string;
  documentTitle?: IDocumentTitle;
  breadcrumb?: IBreadcrumb;
}


const mutations: MutationTree<IAppState> = {
  collapse(state: IAppState) {
    state.isCollapse = !state.isCollapse;
  },
  appName(state: IAppState, appinfo: any) {
    state.name = appinfo.name;
  },
  changeTitle(state: IAppState, titleInfo: IDocumentTitle) {
    state.documentTitle = titleInfo;
  },
  breadcrumb(state: IAppState, breadcrumb: IBreadcrumb) {
    state.breadcrumb = breadcrumb;
  },
};


const actions: ActionTree<IAppState, RootState> = {

};

const getters: GetterTree<IAppState, RootState> = {
  documentTitle: (state: IAppState): IDocumentTitle => {
    return state.documentTitle;
  },

  breadcrumb: (state: IAppState): IBreadcrumb => {
    return state.breadcrumb;
  }
};

const appState: IAppState = {
  isCollapse: false,
  name: '',
  documentTitle: {
    name: '',
    title: ''
  },
  breadcrumb: {
    text: '主页',
    icon: null,
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
