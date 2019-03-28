const AppConsts = {
    loginUrl: "/account/login",
    userManagement: {
        defaultAdminUserName: 'admin'
    },
    localization: {
        defaultSourceName: 'YoyoCmsTemplate'
    },
    authorization: {
        encrptedAuthTokenName: 'enc_auth_token'
    },
    appBaseUrl: '',
    remoteServiceBaseUrl: process.env.NODE_ENV === 'production' ? 'https://yourdomain' : 'http://localhost:6297',

    /** 本地化 */
    l: (key: string, ...args: any[]): string => {
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
    },
    /** 后端本地化和moment.js本地化映射 */
    momentLocaleMappings: null,
}
export default AppConsts