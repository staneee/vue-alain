import httpClient from '@/shared/utils/http-client';
import AppConsts from '@/shared/AppConsts';
import * as _ from 'lodash';
import momentTz from 'moment-timezone';
import moment from 'moment';
import { TokenAuthServiceProxy, SessionServiceProxy } from '@/shared/service-proxies/service-proxies';
import menuService from './menu.service';
import languageService from './language.service';


class AbpService {
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
            if (!this.isGranted(args[index])) {
                return false;
            }
        }
        return true;
    }

    /** 本地化 */
    l(key: string, ...args: any[]): string {
        let localizedText = abp.localization.localize(
            key,
            abp.localization.defaultSourceName
        );

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        return abp.utils.formatString(localizedText, args);
    }

    /** 格式化时间 */
    format(value: any, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        if (!value) {
            return '';
        }

        return moment(value).format(format);
    }

    /** 取相对当前时间 */
    fromNow(value: any): string {
        if (!value) {
            return '';
        }

        return moment(value).fromNow();
    }

    /** 切换语言 */
    async changeLanguage(lang: string) {
        abp.utils.setCookieValue(
            "Abp.Localization.CultureName",
            lang,
            new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
            abp.appPath
        );

        await this.getUserConfiguration();

        menuService.reSetMenus();
    }

    /** 获取应用的配置 */
    async getApplicationConfig() {
        let envName = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
        let url = `/assets/appconfig.${envName}.json`;
        let result = await httpClient.get(url, {
            baseURL: ''
        });
        AppConsts.momentLocaleMappings = result.data.momentLocaleMappings;
    }

    /** 获取abp的系统配置 */
    async getUserConfiguration() {
        let response = await httpClient.get('/api/services/app/Session/GetUserConfigurations');
        let result = response.data;

        _.merge(abp, result);
        abp.localization.defaultSourceName = AppConsts.localization.defaultSourceName;
        abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

        let locale = this.convertAbpLocaleToMomentLocale(abp.localization.currentLanguage.name);

        moment.locale(locale);
        momentTz.locale(locale);
        if (abp.clock.provider.supportsMultipleTimezone) {
            momentTz.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
        }

        // 将多语言信息写入 languageState
        languageService.currentLanguage = <any>abp.localization.currentLanguage;
        languageService.languages = <any>abp.localization.languages;
    }

    /** 切换到关联用户 */
    async linkedAccountAuthenticate(switchAccountToken: string) {
        let result = await this.getTokenAuthService()
            .linkedAccountAuthenticate(switchAccountToken);
        abp.auth.setToken(result.accessToken);
        this.setEncryptedTokenCookie(result.encryptedAccessToken);
    }

    /** 模拟登陆用户 */
    async impersonatedAuthenticate(impersonationToken: string) {
        let result = await this.getTokenAuthService()
            .impersonatedAuthenticate(impersonationToken);
        abp.auth.setToken(result.accessToken);
        this.setEncryptedTokenCookie(result.encryptedAccessToken);
    }

    /** 加载当前(未)登陆的信息 */
    async getCurrentLoginInformations() {
        var result = await (new SessionServiceProxy(undefined, httpClient).getCurrentLoginInformations());


    }

    /** 获取当前提示提供者 */
    private getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {

        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }

        return abp.timing.localClockProvider;
    }

    /** 设置加密过的token */
    private setEncryptedTokenCookie(encryptedToken: string) {
        abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName,
            encryptedToken,
            new Date(new Date().getTime() + 365 * 86400000), //1 year
            abp.appPath,
        )
    }

    /** 获取tokenAuthService */
    private getTokenAuthService(): TokenAuthServiceProxy {
        return new TokenAuthServiceProxy(undefined, httpClient);
    }

    /** 将ABP多语言转换为moment多语言 */
    private convertAbpLocaleToMomentLocale(locale: string): string {
        let defaultLocale = "zh-CN";
        if (!AppConsts.momentLocaleMappings) {
            return defaultLocale;
        }
        let localeMapings = _.filter(AppConsts.momentLocaleMappings, { from: locale });
        if (localeMapings && localeMapings.length) {
            return localeMapings[0]['to'];
        }
        return defaultLocale;
    }
}

const abpService = new AbpService();
export default abpService;