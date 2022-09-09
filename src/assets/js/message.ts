import { MessageBox } from "element-ui";
import '../css/message.scss';

interface IOptions {
  title?: string
  message?: string
  onOk?: () => void
  onCancel?: () => void
  showCancelButton?: boolean
  cancelButtonText?: string
  showConfirmButton?: boolean
  confirmButtonText?: string
}

class MpMessage {
  private toast(options: IOptions, type: 'error' | 'warn' | 'success') {
    const { title, message, showCancelButton, cancelButtonText, showConfirmButton, confirmButtonText, onOk, onCancel } = options;
    let icon = 'el-icon-error danger';
    let className = 'error';
    switch (type) {
      case 'warn':
        icon = 'el-icon-warning warning';
        className = 'warn';
        break;
      case 'success':
        icon = 'el-icon-success success';
        className = 'success';
        break;
      default:
        break;
    }
    const content = `
      <section class='mp-message-box-content'>
        <header>
          <i class='${icon} ft-36'></i>
          <span>${title}</span>
        </header>
        <main>
          <div>${message || ''}</div>
        </main>
      </section>
    `;
    MessageBox({
      showClose: true,
      title: '',
      message: content,
      showCancelButton,
      cancelButtonText,
      showConfirmButton,
      confirmButtonText,
      center: true,
      dangerouslyUseHTMLString: true,
      cancelButtonClass: 'cancel',
      customClass: `mp-message-box ${className}`,
    }).then(() => onOk && onOk()).catch(() => onCancel && onCancel());
  }

  confirm(options: IOptions) {
    const _options: IOptions = {
      showCancelButton: true,
      cancelButtonText: '取消',
      showConfirmButton: true,
      confirmButtonText: '确定',
      ...options,
    }
    this.toast(_options, 'warn');
  }

  warn(options: IOptions) {
    const _options: IOptions = {
      showCancelButton: false,
      cancelButtonText: '取消',
      showConfirmButton: true,
      confirmButtonText: '确定',
      ...options,
    }
    this.toast(_options, 'warn');
  }

  error(options: IOptions) {
    const _options: IOptions = {
      showCancelButton: true,
      cancelButtonText: '关闭',
      showConfirmButton: false,
      confirmButtonText: '确定',
      ...options,
    }
    this.toast(_options, 'error');
  }

  success(options: IOptions) {
    const _options: IOptions = {
      showCancelButton: true,
      cancelButtonText: '关闭',
      showConfirmButton: false,
      confirmButtonText: '确定',
      ...options,
    }
    this.toast(_options, 'success');
  }
}

export const message = new MpMessage();