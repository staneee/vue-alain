import { Modal, notification } from 'ant-design-vue'

export class MessageExtension {

    /** 覆写abp自带的消息弹出框 */
    static overrideAbpMessageByModal(): void {
        abp.message.info = (message: string, title?: string, isHtml?: boolean) => {
            Modal.info({
                title: title,
                content: message,
                zIndex: 999999999,
            })
        };

        abp.message.success = (message: string, title?: string, isHtml?: boolean) => {
            Modal.success({
                title: title,
                content: message,
                zIndex: 999999999,
            })
        };

        abp.message.warn = (message: string, title?: string, isHtml?: boolean) => {
            Modal.warn({
                title: title,
                content: message,
                zIndex: 999999999,
            })
        };

        abp.message.error = (message: string, title?: string, isHtml?: boolean) => {
            Modal.error({
                title: title,
                content: message,
                zIndex: 999999999,
            })
        };

        abp.message.confirm = this.confirm;
    }

    /** 覆写abp自带通知 */
    static overrideAbpNotify(): void {
        abp.notify.info = (message: string, title?: string, options?: any) => {
            if (!options) {
                options = {};
            }
            options.message = title;
            options.description = message;
            notification.info(options);
        }
        abp.notify.success = (message: string, title?: string, options?: any) => {
            if (!options) {
                options = {};
            }
            options.message = title;
            options.description = message;
            notification.success(options);
        }

        abp.notify.warn = (message: string, title?: string, options?: any) => {
            if (!options) {
                options = {};
            }
            options.message = title;
            options.description = message;
            notification.success(options);
        }
        abp.notify.error = (message: string, title?: string, options?: any) => {
            if (!options) {
                options = {};
            }
            options.message = title;
            options.description = message;
            notification.error(options);
        }
    }

    private static confirm(
        message: string,
        callback?: (result: boolean) => void,
    ): any;

    private static confirm(
        message: string,
        title?: string,
        callback?: (result: boolean) => void,
    ): any;

    private static confirm(
        message: string,
        titleOrCallBack?: string | ((result: boolean) => void),
        callback?: (result: boolean) => void,
    ): any {
        if (typeof titleOrCallBack === 'string') {
            Modal.confirm({
                title: titleOrCallBack,
                content: message,
                zIndex: 999999999,
                onOk() {
                    if (callback)
                        callback(true);
                },
                onCancel() {
                    if (callback)
                        callback(false);
                },
            });
        } else {
            Modal.confirm({
                title: abp.localization.localize(
                    'MessageConfirmOperation',
                    abp.localization.defaultSourceName,
                ),
                content: message,
                zIndex: 999999999,
                onOk() {
                    if (titleOrCallBack)
                        titleOrCallBack(true);
                },
                onCancel() {
                    if (titleOrCallBack)
                        titleOrCallBack(false);
                },
            });
        }
    }
}