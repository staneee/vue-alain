import httpClient from './shared/utils/http-client';
import AppConsts from '@/shared/AppConsts';
import { UrlHelper } from './shared/helpers/UrlHelper';
import { TokenAuthServiceProxy, SessionServiceProxy } from '@/shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import momentTz from 'moment-timezone';
import moment from 'moment';
import { MessageExtension } from './shared/helpers/message.extension';

/**
 * 程序启动服务
 */
export default class AppPreBootstrap {

    /**
     * 初始化应用
     */
    static async bootstrap() {

        // 覆写默认abp的弹出框和消息通知
        MessageExtension.overrideAbpMessageByModal();
        MessageExtension.overrideAbpNotify();

        // 初始化基本参数
        await this.getApplicationConfig();

        // 获取queryString
        let queryStringObj = UrlHelper.getQueryParameters();

        if (queryStringObj.impersonationToken) {// 模拟登陆
            abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
            await this.impersonatedAuthenticate(queryStringObj.impersonationToken);

        } else if (queryStringObj.switchAccountToken) {// 切换关联账号
            abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
            await this.linkedAccountAuthenticate(queryStringObj.switchAccountToken);
        }

        await this.getUserConfiguration();

        await this.getCurrentLoginInformations();
    }

    /** 获取应用的配置 */
    static async getApplicationConfig() {
        let envName = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
        let url = `/assets/appconfig.${envName}.json`;
        let result = await httpClient.get(url, {
            baseURL: ''
        });
        AppConsts.momentLocaleMappings = result.data.momentLocaleMappings;
    }

    /** 获取abp的系统配置 */
    static async getUserConfiguration() {
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
    }

    /** 切换到关联用户 */
    static async linkedAccountAuthenticate(switchAccountToken: string) {
        let result = await this.getTokenAuthService()
            .linkedAccountAuthenticate(switchAccountToken);
        abp.auth.setToken(result.accessToken);
        this.setEncryptedTokenCookie(result.encryptedAccessToken);
    }

    /** 模拟登陆用户 */
    static async impersonatedAuthenticate(impersonationToken: string) {
        let result = await this.getTokenAuthService()
            .impersonatedAuthenticate(impersonationToken);
        abp.auth.setToken(result.accessToken);
        this.setEncryptedTokenCookie(result.encryptedAccessToken);
    }

    /** 加载当前(未)登陆的信息 */
    static async getCurrentLoginInformations() {
        var result = await (new SessionServiceProxy(undefined, httpClient).getCurrentLoginInformations());


    }

    /** 获取当前提示提供者 */
    private static getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {

        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }

        return abp.timing.localClockProvider;
    }

    /** 设置加密过的token */
    private static setEncryptedTokenCookie(encryptedToken: string) {
        abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName,
            encryptedToken,
            new Date(new Date().getTime() + 365 * 86400000), //1 year
            abp.appPath,
        )
    }

    /** 获取tokenAuthService */
    private static getTokenAuthService(): TokenAuthServiceProxy {
        return new TokenAuthServiceProxy(undefined, httpClient);
    }

    /** 将ABP多语言转换为moment多语言 */
    private static convertAbpLocaleToMomentLocale(locale: string): string {
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