import axios from 'axios'
import Vue from 'vue'
import AppConsts from '../AppConsts';

const httpClient = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    timeout: 30000
});

// request interceptor
httpClient.interceptors.request.use(function (config) {
    if (!!abp.auth.getToken()) {
        config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken() || '';
    }
    config.headers.common[".AspNetCore.Culture"] = abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"] = abp.multiTenancy.getTenantIdCookie() || '';
    return config;

}, function (error) {

    return Promise.reject(error);
});

import { Modal } from 'ant-design-vue'
let vm = new Vue({});

// response error interceptor
httpClient.interceptors.response.use((response) => {
    if (response.data['__abp']) {
        response.data = response.data.result;
    }
    return response;
}, (error) => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
        Modal.error({
            title: error.response.data.error.message,
            content: error.response.data.error.details
        })
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
        Modal.error({
            title: abp.localization.localize("LoginFailed",AppConsts.localization.defaultLocalizationSourceName),
            ontent: error.response.data.error.message
        })
    } else if (!error.response) {
        Modal.error({
            content: abp.localization.localize('UnknownError', AppConsts.localization.defaultLocalizationSourceName)
        });
    }

    return Promise.reject(error);
})
export default httpClient;