import rootStore from '@/shared/states/root.state';
import { IDocumentTitle, IBreadcrumb } from '@/shared/states/modules/app.state';



class AppService {

    /** 修改标题 */
    changeTitle(title: IDocumentTitle) {
        rootStore.commit('app/changeTitle', title);
    }

    getTitle(): IDocumentTitle {
        return rootStore.getters["app/documentTitle"];
    }

    setAppName(appName: string) {
        rootStore.commit('app/appName', appName);
    }

    getAppName(): string {
        return rootStore.getters["app/appName"];
    }
    setBreadcrumb(breadcrumb: IBreadcrumb) {
        rootStore.commit('app/breadcrumb', breadcrumb);
    }

    getBreadcrumb(): IBreadcrumb {
        return rootStore.getters["app/breadcrumb"];
    }
}


const appService = new AppService();
export default appService;