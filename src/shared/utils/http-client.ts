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

let vm = new Vue({});

// response error interceptor
httpClient.interceptors.response.use((response) => {
    if (response.data['__abp']) {
        response.data = response.data.result;
    }
    return response;
}, (error) => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
        alert('1 ' + error.response.data.error.message);
        // vm.$Modal.error({ title: error.response.data.error.message, content: error.response.data.error.details })
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
        alert('2 ' + error.response.data.error.message);
        // vm.$Modal.error()
    } else if (!error.response) {
        alert('3 UnknownError');
    }
    return Promise.reject(error);
})
export default httpClient;