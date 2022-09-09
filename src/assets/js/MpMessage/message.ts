import Dialog from "./dialog";
import type { IDialogOptions } from "./dialog/types";

interface IMessageOptions {
  message?: string
  title: string
  width?: string
  onOk?: (close:Function) => void
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  showSubmit?: boolean
  showCancel?: boolean
}

interface IMessageType {
  iconColor: string
  iconClass: string
  submitText: string
  cancelText: string
  showSubmit: boolean
  showCancel: boolean
  isCancelDefaultStyle: boolean
  closeWhenCancel?:boolean
}

class Message {
  private _create(options: IDialogOptions) {
    const dialog = new Dialog();
    dialog.create(options);
  }
  private _toast(options: IMessageOptions, type: IMessageType) {
    const { iconColor, iconClass, showSubmit, showCancel, submitText, cancelText, isCancelDefaultStyle, closeWhenCancel } = type;
    let main = `
      <h2 class='message-box-title ft-16 is-black'>
        <i class='iconfont ${iconClass} ft-f-34 ${iconColor}'></i>
        <span>${options.title}</span>
      </h2>
    `;
    if (options.message) {
      main += `<div class='message-box-content'>${options.message}</div>`;
    }
    const { onOk, onCancel } = options;
    const handleOkClick = (close: Function) => {
      if (onOk) onOk(close);
      close();
    };
    const width = options.width || !options.message ? '320px' : '380px';
    this._create({ width, showClose: false, showHeader: false, main, onOk: handleOkClick, onClose: onCancel, minHeight: '180px', showSubmit, submitText, showCancel, cancelText, isCancelDefaultStyle, closeWhenCancel });
  }
  warn(options: IMessageOptions) {
    const showSubmit = typeof options.showSubmit === 'boolean' ? options.showSubmit : false;
    const showCancel = typeof options.showCancel === 'boolean' ? options.showCancel : true;
    const type: IMessageType = {
      showSubmit,
      showCancel,
      cancelText: options.cancelText || '确定',
      submitText: options.submitText || '确定',
      iconColor: 'warning',
      iconClass: 'icon-warn',
      isCancelDefaultStyle: true
    };
    this._toast({ ...options, showSubmit, showCancel }, type);
  }
  success(options: IMessageOptions) {
    const showSubmit = typeof options.showSubmit === 'boolean' ? options.showSubmit : false;
    const showCancel = typeof options.showCancel === 'boolean' ? options.showCancel : true;
    const type: IMessageType = {
      showSubmit,
      showCancel,
      cancelText: options.cancelText || '确定',
      submitText: options.submitText || '确定',
      iconColor: 'success',
      iconClass: 'icon-success',
      isCancelDefaultStyle: false,
    };
    this._toast({ ...options, showSubmit, showCancel }, type);
  }
  error(options: IMessageOptions) {
    const showSubmit = typeof options.showSubmit === 'boolean' ? options.showSubmit : false;
    const showCancel = typeof options.showCancel === 'boolean' ? options.showCancel : true;
    const type: IMessageType = {
      showSubmit,
      showCancel,
      cancelText: options.cancelText || '确定',
      submitText: options.submitText || '确定',
      iconColor: 'danger',
      iconClass: 'icon-fail',
      isCancelDefaultStyle: true,
    };
    this._toast({ ...options, showSubmit, showCancel }, type);
  }
  confirm(options: IMessageOptions) {
    const showSubmit = typeof options.showSubmit === 'boolean' ? options.showSubmit : true;
    const showCancel = typeof options.showCancel === 'boolean' ? options.showCancel : true;
    const type: IMessageType = {
      showSubmit,
      showCancel,
      cancelText: options.cancelText || '取消',
      submitText: options.submitText || '确定',
      iconColor: 'warning',
      iconClass: 'icon-warn',
      isCancelDefaultStyle: true
    };
    this._toast({ ...options, showSubmit, showCancel }, type);
  }
  loading() {
    const dialog = new Dialog();
    return dialog.loading();
  }
}

export const message = new Message();

export default message;