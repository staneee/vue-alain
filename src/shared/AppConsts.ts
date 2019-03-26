const AppConsts = {
    userManagement: {
        defaultAdminUserName: 'admin'
    },
    localization: {
        defaultLocalizationSourceName: 'ABPFreeVue'
    },
    authorization: {
        encrptedAuthTokenName: 'enc_auth_token'
    },
    appBaseUrl: '',
    remoteServiceBaseUrl: process.env.NODE_ENV === 'production' ? 'https://yourdomain' : 'http://localhost:21021',

    /** 本地化 */
    l: (key: string, ...args: any[]): string => {
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
export default AppConsts