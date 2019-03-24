import httpClient from './shared/utils/http-client';
/**
 * 程序启动服务
 */
class AppPreBootstrap {

    /** 获取应用的配置 */
    static getApplicationConfig(): any {
        let envName = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
        let url = `/assets/appconfig.${envName}.json`;
        return httpClient.get(url,{
            baseURL:''
        });
    }

    /** 获取abp的系统配置 */
    static getUserConfiguration(): any {
        return httpClient.get('/AbpUserConfiguration/GetAll');
    }


}

export default AppPreBootstrap;
