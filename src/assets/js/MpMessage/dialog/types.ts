export interface IDialogOptions {
  width?: string

  height?: string

  top?: string

  className?: string

  minHeight?: string

  maxHeight?: string

  minWidth?: string

  maxWidth?: string

  header?: string | HTMLElement
  
  title?:string

  footer?: string | HTMLElement

  showClose?: boolean

  showHeader?: boolean

  showHeaderPoint?: boolean

  showFooter?: boolean

  showSubmit?: boolean

  showCancel?: boolean

  closeWhenCancel?: boolean

  canScroll?: boolean

  submitText?: string

  cancelText?: string

  main?: string | HTMLElement

  isFullScreen?: boolean

  ['close-on-click-modal']?: boolean

  drag?: boolean

  onOk?: Function

  onCancel?: Function

  onClose?: () => void

  onClosed?: () => void

  isCancelDefaultStyle?: boolean
}

export interface ICloseOptions {
  onClose?: () => void

  onClosed?: () => void
}
