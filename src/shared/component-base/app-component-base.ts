import { Component, Vue, Inject } from 'vue-property-decorator';
import  AppConsts  from '../AppConsts';

export default class AppComponentBase extends Vue {

    /** 校验权限 */
    isGranted(permissionName: string): boolean {
        return abp.auth.isGranted(permissionName);
    }
    /** 校验一组权限,其中之一通过表示校验成功 */
    isAnyGranted(...args: string[]): boolean {
        return abp.auth.isAnyGranted(...args);
    }
    /** 校验一组权限,全部通过表示校验成功 */
    isAllGranted(...args: string[]): boolean {
        for (let index = 0; index < args.length; index++) {
            if (this.isGranted(args[index])) {
                return false;
            }
        }
        return true;
    }

    /** 本地化 */
    l(key: string, ...args: any[]): string {
        let localizedText = abp.localization.localize(
            key,
            AppConsts.localization.defaultLocalizationSourceName
        );

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        return abp.utils.formatString(localizedText, args);
    }
}