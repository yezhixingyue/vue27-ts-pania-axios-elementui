import type { IDialogOptions } from "../types";

export const mergeIDialogOptions = (options: IDialogOptions) => {
  const _options: Required<IDialogOptions> = {
    width: 'auto',
    height: '',
    top: '23vh',
    minWidth: '320px',
    maxWidth: '600px',
    minHeight: '240px',
    maxHeight: '',
    header: '',
    title: '标题',
    footer: '',
    showClose: true,
    showHeader: true,
    showHeaderPoint: true,
    showFooter: true,
    showSubmit: true,
    showCancel: true,
    submitText: '保存',
    cancelText: '取消',
    isCancelDefaultStyle: true,
    ['close-on-click-modal']: true,
    onOk: () => Promise.resolve(),
    onCancel: () => Promise.resolve(),
    onClose: () => {},
    onClosed: () => {},
    main: '内容区域',
    ...options,
    canScroll: typeof options.canScroll === 'boolean' ? options.canScroll : true,
    closeWhenCancel: typeof options.closeWhenCancel === 'boolean' ? options.closeWhenCancel : true,
    isFullScreen: typeof options.isFullScreen === 'boolean' ? options.isFullScreen : false,
    drag: typeof options.drag === 'boolean' ? options.drag : false,
    className: options.className ? `mp-check-file-dialog-content-wrap ${options.className}` : 'mp-check-file-dialog-content-wrap',
  }
  return _options;
}
