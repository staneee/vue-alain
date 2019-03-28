import rootStore from '@/shared/states/root.state';
import { IReusetTabItem, IReReusetTabItem } from '@/shared/states/modules/reuse-tab.state';



class ReuseTabService {

    /** 添加复用标签 */
    add(item: IReusetTabItem) {
        rootStore.dispatch('reuseTab/add', item);
    }

    remove() {

    }

    renderer(reReusetTabItem: IReReusetTabItem) {
        rootStore.commit('reuseTab/renderer', reReusetTabItem);
    }
}

const reuseTabService = new ReuseTabService();
export default reuseTabService;