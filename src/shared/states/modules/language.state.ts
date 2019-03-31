import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/shared/states/root.state';


export interface ILanguageInfo {
    name: string;
    /** 显示名称 */
    displayName: string;
    /** 图标 */
    icon: string;
    /** 是否默认 */
    isDefault?: boolean;
    /** 是否禁用 */
    isDisabled?: boolean;
}


export interface ILanguageState {
    /** 当前语言 */
    currentLanguage: ILanguageInfo;
    /** 所有语言 */
    languages: ILanguageInfo[];
}


const mutations: MutationTree<ILanguageState> = {
    currentLanguage(state: ILanguageState, language: ILanguageInfo) {
        state.currentLanguage = language;
    },
    languages(state: ILanguageState, languages: ILanguageInfo[]) {
        state.languages = languages;
    },
};


const actions: ActionTree<ILanguageState, RootState> = {

};

const getters: GetterTree<ILanguageState, RootState> = {
    currentLanguage: (state: ILanguageState): ILanguageInfo => {
        return state.currentLanguage;
    },
    languages: (state: ILanguageState): ILanguageInfo[] => {
        return state.languages;
    },
};

const languageState: ILanguageState = {
    currentLanguage: null,
    languages: null
};

const language: Module<ILanguageState, RootState> = {
    namespaced: true,
    state: languageState,
    getters,
    actions,
    mutations,
};

export default language;
