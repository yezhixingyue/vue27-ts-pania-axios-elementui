// import { MessageBox } from "element-ui";
// import 'element-ui/lib/theme-chalk/message.css';
// import 'element-ui/lib/theme-chalk/message-box.css';
// import '../css/message.scss';

// interface IOptions {
//   title?: string
//   message?: string
//   onOk?: () => void
//   onCancel?: () => void
//   showCancel?: boolean
//   cancelText?: string
//   showSubmit?: boolean
//   submitText?: string
// }

// type MessageType = 'error' | 'warn' | 'success';

// class MpMessage {
//   private getMessageTypeInfo(type: MessageType) { // 获取提示类型相关信息
//     let icon;
//     let className ;
//     switch (type) {
//       case 'warn':
//         icon = 'el-icon-warning warning';
//         className = 'warn';
//         break;
//       case 'success':
//         icon = 'el-icon-success success';
//         className = 'success';
//         break;
//       default:
//         icon = 'el-icon-error danger';
//         className = 'error';
//         break;
//     }
//     return { icon, className };
//   }

//   private getMessageContent(icon: string, title?: string, message?: string) { // 获取提示内容
//     return `
//       <section class='mp-message-box-content'>
//         <header>
//           <i class='${icon} ft-36'></i>
//           <span>${title || '提示'}</span>
//         </header>
//         <main>
//           <div>${message || ''}</div>
//         </main>
//       </section>
//     `;
//   }

//   private alertHandler(options: IOptions, type: MessageType) { // 弹出消息提示
//     const { title, message, showCancel: showCancelButton, cancelText, showSubmit: showConfirmButton, submitText: confirmButtonText, onOk, onCancel } = options;

//     const { icon, className } = this.getMessageTypeInfo(type);

//     const content = this.getMessageContent(icon, title, message);
    
//     MessageBox({
//       showClose: true,
//       title: '',
//       message: content,
//       showCancelButton,
//       cancelButtonText: cancelText,
//       showConfirmButton,
//       confirmButtonText,
//       center: true,
//       dangerouslyUseHTMLString: true,
//       cancelButtonClass: 'cancel',
//       customClass: `mp-message-box ${className}`,
//     }).then(() => onOk && onOk()).catch(() => onCancel && onCancel());
//   }

//   confirm(options: IOptions) {
//     const _options: IOptions = {
//       showCancel: true,
//       cancelText: '取消',
//       showSubmit: true,
//       submitText: '确定',
//       ...options,
//     }
//     this.alertHandler(_options, 'warn');
//   }

//   warn(options: IOptions) {
//     const _options: IOptions = {
//       showCancel: false,
//       cancelText: '取消',
//       showSubmit: true,
//       submitText: '确定',
//       ...options,
//     }
//     this.alertHandler(_options, 'warn');
//   }

//   error(options: IOptions) {
//     const _options: IOptions = {
//       showCancel: true,
//       cancelText: '关闭',
//       showSubmit: false,
//       submitText: '确定',
//       ...options,
//     }
//     this.alertHandler(_options, 'error');
//   }

//   success(options: IOptions) {
//     const _options: IOptions = {
//       showCancel: true,
//       cancelText: '关闭',
//       showSubmit: false,
//       submitText: '确定',
//       ...options,
//     }
//     this.alertHandler(_options, 'success');
//   }
// }

// export const message = new MpMessage();