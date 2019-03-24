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
}
export default AppConsts