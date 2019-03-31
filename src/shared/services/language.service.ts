import rootStore from '@/shared/states/root.state';
import { ILanguageInfo } from '@/shared/states/modules/language.state';



class LanguageService {

    get currentLanguage(): ILanguageInfo {
        return rootStore.getters['language/currentLanguage'];
    }

    set currentLanguage(value: ILanguageInfo) {
        rootStore.commit('language/currentLanguage', value);
    }

    get languages(): ILanguageInfo[] {
        return rootStore.getters['language/languages'];
    }

    set languages(value: ILanguageInfo[]) {
        rootStore.commit('language/languages', value);
    }
}


const languageService = new LanguageService();
export default languageService;