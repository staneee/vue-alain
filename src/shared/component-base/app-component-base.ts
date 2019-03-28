import { Component, Vue, Inject } from 'vue-property-decorator';
import AppConsts from '../AppConsts';
import moment from 'moment';
import modalService, { ModalService } from '../services/modal.service';
import abpService from '@/shared/services/abp.service';

export default class AppComponentBase extends Vue {

    /** model */
    public modal: ModalService;
    constructor() {
        super();
        this.modal = modalService;
    }

    /** 校验权限 */
    isGranted(permissionName: string): boolean {
        return abpService.isGranted(permissionName);
    }

    /** 校验一组权限,其中之一通过表示校验成功 */
    isAnyGranted(...args: string[]): boolean {
        return abpService.isAnyGranted(...args);
    }

    /** 校验一组权限,全部通过表示校验成功 */
    isAllGranted(...args: string[]): boolean {
        return abpService.isAllGranted(...args);
    }

    /** 本地化 */
    l(key: string, ...args: any[]): string {
        return abpService.l(key, ...args);
    }

    /** 格式化时间 */
    format(value: any, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        return abpService.format(value, format);
    }

    /** 取相对当前时间 */
    fromNow(value: any): string {
        return abpService.fromNow(value);
    }
}

