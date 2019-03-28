import { IMenu, IMapMenu } from '@/shared/states/modules/menu.state';
import rootStore from '@/shared/states/root.state';
import abpService from '@/shared/services/abp.service';
import appService from '@/shared/services/app.service';
import reuseTabService from '@/shared/services/reuse-tab.service';
import { IReusetTabItem, IReReusetTabItem } from '@/shared/states/modules/reuse-tab.state';

class MenuService {

    /** 菜单源数据 */
    private _sourceMenus: IMenu[];
    /** 菜单key集合 */
    private _mapMenus: IMapMenu[];

    /** 设置菜单 */
    setMenus(menus: IMenu[]): void {
        this._sourceMenus = menus;
        this.reSetMenus();
    }

    /** 刷新,重置菜单 */
    reSetMenus(): void {
        this._mapMenus = [];
        let newMenus: IMenu[] = [];
        if (this._sourceMenus && Array.isArray(this._sourceMenus)) {
            newMenus = this.processMenus(this._sourceMenus);
        }
        this.privateSetMenus(newMenus);

        // 重置菜单,刷新标签
        let documentTitle = appService.getTitle();
        let mapMenu = this.getMapMenu(documentTitle.name);
        documentTitle.title = mapMenu ? mapMenu.text : documentTitle.title;
        appService.changeTitle(documentTitle);
        reuseTabService.renderer({
            name: documentTitle.name,
            text: documentTitle.title,
            icon: mapMenu ? mapMenu.icon : null,
        });
    }

    /** 获取标题 */
    getTitle(name: string): string {
        if (!this._mapMenus) {
            return name;
        }
        let tmpMenuMap = this._mapMenus.find(o => o.name === name);
        if (!tmpMenuMap) {
            return name;
        }
        return tmpMenuMap.text;
    }

    /** 获取映射菜单 */
    getMapMenu(name: string): IMapMenu {
        if (!this._mapMenus) {
            return null;
        }
        let menuMap = this._mapMenus.find(o => o.name === name);
        return menuMap;
    }

    /** 重新组织映射菜单 */
    private processMenus(menus: IMenu[]): IMenu[] {
        if (!menus) {
            return null;
        }
        let resultMenus: IMenu[] = [];
        for (let index = 0; index < menus.length; index++) {
            let menuItem = menus[index];
            // 校验权限
            if (!this.checkACL(menuItem)) {
                continue;
            }
            // 校验重复
            if (this._mapMenus.find(o => o.name === menuItem.name)) {
                abp.log.info(`Duplicate menu key "${menuItem.name}", menu will be ignored`)
                continue;
            }

            // 映射菜单
            let resultMenuItem: IMenu = {
                name: menuItem.name,
                text: menuItem.i18n ? abpService.l(menuItem.i18n) : menuItem.text, // 处理本地化
                link: menuItem.link,
                icon: menuItem.icon
            };

            // 添加映射
            this._mapMenus.push({
                name: resultMenuItem.name,
                text: resultMenuItem.text,
                link: resultMenuItem.link,
                icon: resultMenuItem.icon
            });

            // 映射子项
            resultMenuItem.children = this.processMenus(menuItem.children);
            resultMenus.push(resultMenuItem);
        }
        return resultMenus.length === 0 ? null : resultMenus;
    }

    /**校验权限 */
    private checkACL(menuItem: IMenu): boolean {
        // 校验权限
        if (menuItem.acl) {
            if (Array.isArray(menuItem.acl)) {
                switch (menuItem.aclType) {
                    case 'any':
                        if (!abpService.isAnyGranted(...menuItem.acl)) {
                            return false;
                        }
                        break;
                    default:
                    case 'all':
                        if (!abpService.isAllGranted(...menuItem.acl)) {
                            return false;
                        }
                        break;
                }

            } else {
                if (!abpService.isGranted(menuItem.acl)) {
                    return false;
                }
            }
        }
        return true;
    }

    /** 实际的修改菜单 */
    private privateSetMenus(menus: IMenu[]) {
        rootStore.commit('menu/setMenu', menus);
    }
}

const menuService = new MenuService();
export default menuService;