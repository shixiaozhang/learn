import moment from "moment";
import { MessageBox } from 'element-ui';
import { Notification } from 'element-ui';
import { i18n } from '../../i18n/lang';
export default {
    formatDateTime(value, formatValue) {
        if (!value) return '--';
        return moment(value).format(formatValue);
    },
    confirmMessage(message) {
        return new Promise((resolve, reject) => {
            MessageBox.confirm(message, i18n.tc("common.tips"), {
                confirmButtonText: i18n.tc("btn.confirm"),
                cancelButtonText: i18n.tc("btn.cancel"),
                type: "warning",
            }).then(() => {
                resolve(true)
            })
                .catch(() => {
                    reject('canceled')
                });
        })
    },
    notifySuccess(message) {
        Notification.success({
            title: "操作成功",
            message: message,
        });
    },
    notifyError(message) {
        Notification.error({
            title: "操作成功",
            message: message,
        });
    },
    notifyWarning(message) {
        Notification.warning({
            title: "操作成功",
            message: message,
        });
    },
    notifyInfo(message) {
        Notification.info({
            title: "操作成功",
            message: message,
        });
    }
}