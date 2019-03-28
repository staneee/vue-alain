import * as _ from 'lodash';

import { Module, MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/shared/states/root.state';

export interface IReReusetTabItem {
    name: string;
    text: string;
}

export interface IReusetTabItem {
    name: string;
    text: string;
    closable: boolean;
    link: string;
    activeName: string;
}

export interface IReusetabState {
    source: IReusetTabItem[];
    to?: string;
}

const mutations: MutationTree<IReusetabState> = {
    changeSource(state: IReusetabState, param: any) {
        state.source = param.source;
    },
    changeTo(state: IReusetabState, param: any) {
        state.to = param;
    },
    renderer(state: IReusetabState, reReusetTabItem: IReReusetTabItem) {
        let reusetTabItem = state.source.find(o => o.name == reReusetTabItem.name);
        if (reusetTabItem) {
            reusetTabItem.text = reReusetTabItem.text;
        }
    }
};


const actions: ActionTree<IReusetabState, RootState> = {
    add(context: ActionContext<IReusetabState, RootState>, param: IReusetTabItem) {
        let oldTables = context.state.source;
        let name = param.name;
        let link = param.link;
        let text = param.text;
        let activeName = param.activeName;

        let isPassport = _.startsWith(link, '/account');
        if (isPassport === true) {
            return;
        }

        if (activeName === text) {
            return;
        }
        let exist = _.find(oldTables, (item) => {
            return item.text === param.text;
        });

        if (exist === undefined) {
            oldTables.push(param);
            context.commit('changeSource', { source: oldTables });
        }
    },
    remove(context: ActionContext<IReusetabState, RootState>, param: IReusetTabItem) {
        let source = context.state.source;
        let name = param.name;
        let link = param.link;
        let text = param.text;
        let activeName = param.activeName;

        if (activeName === text) {
            _.forEach(source, (tab, index: number) => {
                if (tab.text === text) {
                    let nextTab = source[index + 1] || source[index - 1];
                    if (nextTab) {
                        activeName = nextTab.text;
                        if (activeName === context.state.to) {
                            context.commit('changeTo', ''); // 如果activename == to,需要先重置
                        }

                        setTimeout(() => {
                            context.commit('changeTo', activeName);
                        }, 1);
                    }
                }
            });
        }
        let newTabs = _.filter(source, (tab) => tab.text !== text);
        context.commit('changeSource', { source: newTabs });
    }
};

const getters: GetterTree<IReusetabState, RootState> = {

};

const reuseTabState: IReusetabState = {
    source: [],
    to: '',
};

const reuseTab: Module<IReusetabState, RootState> = {
    namespaced: true,
    state: reuseTabState,
    getters,
    actions,
    mutations,
};


export default reuseTab;
