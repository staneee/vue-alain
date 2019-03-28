import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '../root.store';

export interface Doctitle {
  title?: string;
  i18n?: string;
}

export interface IMenu {
  /** 唯一键值 */
  key: string;
  /** 显示的文本 */
  text?: string;
  /** 多语言本地化 */
  i18n?: string;
  /** 权限 */
  acl?: string | string[];
  /** 链接 */
  link?: string;
  /** 是否隐藏 */
  hide?: boolean;
  /** 图标 */
  icon?: string;
  /** 子项 */
  children?: IMenu[];
}

export interface IAppState {
  isCollapse: boolean;
  name?: string;
  doctitle?: Doctitle;
  /** 程序的菜单 */
  menus?: IMenu[];
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
  setMenu(state: IAppState, menus: IMenu[]) {
    state.menus = menus;
  }
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
  menus: [
    {
      key: '/dashborad',
      text: '工作台',
      children: [
        {
          key: '/analysis',
          text: '分析页',
          link: '/analysis',
        },
        {
          key: '/monitor',
          text: '监控页',
          link: '/monitor',
        },
        {
          key: '/workplace',
          text: '工作台',
          link: '/workplace',
        }
      ]
    },
    {
      key: '/form',
      text: '表单页',
      children: [
        {
          key: '/form/basic',
          text: '基础表单',
          link: '/form/basic',
        },
        {
          key: '/form/step',
          text: '分步表单',
          link: '/form/step',
        },
        {
          key: '/form/advanced',
          text: '高级表单',
          link: '/form/advanced',
        }
      ]
    }
  ],
};

const app: Module<IAppState, RootState> = {
  namespaced: true,
  state: appState,
  getters,
  actions,
  mutations,
};

export default app;
