import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '../root.state';

export interface IMenu {
    /** 唯一键值 */
    name: string;
    /** 显示的文本 */
    text: string;
    /** 多语言本地化 */
    i18n?: string;
    /** 权限 */
    acl?: string | string[];
    /**
     * acl校验类型(one,any,all)
     * 
     * one: 只校验这一个(一个权限情况下,默认)
     * any: 一组数据中满足一个(多个权限情况下,默认)
     * all: 全部通过校验
     */
    aclType?: string;
    /** 链接 */
    link?: string;
    /** 是否隐藏 */
    hide?: boolean;
    /** 图标 */
    icon?: string;
    /** 子项 */
    children?: IMenu[];
}


export interface IMapMenu {
    /** 菜单key */
    name: string;
    /** 菜单标题 */
    text: string;
    /** 链接 */
    link: string;
    /** 图标 */
    icon?:string;
}


export interface IMenuState {
    /** 程序的菜单 */
    menus?: IMenu[];
}


const mutations: MutationTree<IMenuState> = {
    /**
     * 修改菜单
     * @param state 
     * @param menus 菜单
     */
    setMenu(state: IMenuState, menus: IMenu[]) {
        state.menus = menus;
    }
};


const actions: ActionTree<IMenuState, RootState> = {

};

const getters: GetterTree<IMenuState, RootState> = {

};

const menuState: IMenuState = {
    menus: [
    ],
};

const menu: Module<IMenuState, RootState> = {
    namespaced: true,
    state: menuState,
    getters,
    actions,
    mutations,
};

export default menu;
