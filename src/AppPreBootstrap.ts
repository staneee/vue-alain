import httpClient from './shared/utils/http-client';
import AppConsts from '@/shared/AppConsts';
import { UrlHelper } from './shared/helpers/UrlHelper';
import { TokenAuthServiceProxy, SessionServiceProxy } from '@/shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import momentTz from 'moment-timezone';
import moment from 'moment';
import { MessageExtension } from './shared/helpers/message.extension';
import abpService from '@/shared/services/abp.service';

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
        await abpService.getApplicationConfig();

        // 获取queryString
        let queryStringObj = UrlHelper.getQueryParameters();

        if (queryStringObj.impersonationToken) {// 模拟登陆
            abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
            await abpService.impersonatedAuthenticate(queryStringObj.impersonationToken);

        } else if (queryStringObj.switchAccountToken) {// 切换关联账号
            abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
            await abpService.linkedAccountAuthenticate(queryStringObj.switchAccountToken);
        }

        await abpService.getUserConfiguration();

        await abpService.getCurrentLoginInformations();
    }
}