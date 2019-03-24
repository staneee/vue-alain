import AppConsts from '../AppConsts';
import Util from '../utils/util';

export class SignalRAspNetCoreHelper {
    static initSignalR() {
        var encryptedAuthToken = abp.utils.getCookieValue(AppConsts.authorization.encrptedAuthTokenName);

        (<any>abp.signalr) = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken),
            url: AppConsts.remoteServiceBaseUrl + '/signalr'
        };

        Util.loadScript(AppConsts.appBaseUrl + '/dist/abp.signalr-client.js');
    }
}