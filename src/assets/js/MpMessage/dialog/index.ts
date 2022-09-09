import imgSrc from './assets/loading.png';
import { classNameHandler, delay } from '../utils';
import { mergeIDialogOptions } from './assets/utils';
import type { ICloseOptions, IDialogOptions } from './types';
import './assets/index.scss';
import './assets/icon/iconfont.css'
import { ElementDragHandler } from '../utils';

let zIndexNum = 1000;

export default class Dialog {
  private mask: null | HTMLDivElement = null

  private content: null | HTMLElement = null

  private option: Required<IDialogOptions> | null = null

  private createMask() {
    const dom = document.createElement('div');
    dom.className = 'mp-check-file-dialog-mask-wrap';
    dom.style.zIndex = `${zIndexNum ++}`;
    
    dom.addEventListener('click', (e) => {
      if (e.target === dom && this.option?.['close-on-click-modal']) {
        // 点击蒙层可关闭
        this.close({ onClose: this.option.onClose, onClosed: this.option.onClosed });
      }
    });

    if (!this.option?.canScroll) document.documentElement.style.overflow = 'hidden'

    dom.onwheel = (e) => {
      e.preventDefault();
      return false;
    }

    document.body.appendChild(dom);
    this.mask = dom;

    dom.offsetHeight;
    dom.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }
  
  private createConetnt(isReflow = false) {
    if (!this.option) return;
    if (!this.mask) {
      this.createMask();
    }
    const dom = document.createElement('section');
    
    dom.style.width = this.option.width;
    dom.style.height = this.option.height;
    dom.style.marginTop = this.option.top;
    
    dom.style.minWidth = this.option.minWidth;
    dom.style.maxWidth = this.option.maxWidth;
    dom.style.minHeight = this.option.minHeight;
    dom.style.maxHeight = this.option.maxHeight;

    if (this.option.isFullScreen) {
      this.fullScreen(dom);
    }


    dom.className = this.option.className;

    const createHeader = () => {
      if (!this.option?.showHeader || (!this.option?.header && !this.option?.title)) return;
      const header = document.createElement('header');
      if (this.option?.header) {
        if (this.option?.header instanceof HTMLElement) {
          header.appendChild(this.option?.header);
        } else {
          header.innerHTML = this.option?.header;
        }
      } else if (this.option?.title) {
        const span = document.createElement('span');
        span.innerHTML = this.option?.title;
        header.appendChild(span);
      }
      if (this.option?.showHeaderPoint) {
        classNameHandler.add(header, 'point');
      }
      if (this.option.drag && this.mask) {
        ElementDragHandler(header, dom, true);
      }
      dom.appendChild(header);
    }

    const cancel = () => {
      this.close({ onClose: this.option?.onClose, onClosed: this.option?.onClosed });
    }

    const createCloseBtn = () => {
      if (!this.option?.showClose) return;
      const i = document.createElement('i');
      i.className = 'close-btn iconfont icon-close';
      i.addEventListener('click', cancel)
      dom.appendChild(i);
    }
    const createMain = () => {
      if (!this.option) return;
      const main = document.createElement('main');
      if (typeof this.option.main === 'string') {
        main.innerHTML = this.option.main;
      } else {
        main.appendChild(this.option.main);
      }
      
      dom.appendChild(main);
    }
    const createFooter = () => {
      if (!this.option || !this.option.showFooter) return;
      const footer = document.createElement('footer');
      if (this.option.footer) {
        if (this.option.footer instanceof HTMLElement) {
          footer.appendChild(this.option.footer);
        } else {
          footer.innerHTML = this.option.footer;
        }
      } else {
        if (this.option.showSubmit) {
          const submitBtn = document.createElement('button');
          submitBtn.innerText = this.option.submitText;
          submitBtn.addEventListener('click', () => {
            this.option?.onOk && this.option.onOk(this.close.bind(this))
          });
          footer.appendChild(submitBtn);
        }
        if (this.option.showCancel) {
          const cancelBtn = document.createElement('button');
          cancelBtn.innerText = this.option.cancelText;
          if (this.option.isCancelDefaultStyle) cancelBtn.className = 'default';
          cancelBtn.addEventListener('click', () => {
            this.option?.onCancel && this.option.onCancel(this.close.bind(this));
            if (this.option?.closeWhenCancel) cancel();
          });
          footer.appendChild(cancelBtn);
        }
      }
      dom.appendChild(footer);
    }

    createHeader();
    createCloseBtn();
    createMain();
    createFooter();

    this.content = dom;
    this.mask?.appendChild(dom);

    if (isReflow) {
      dom.style.opacity = '1';
      dom.style.transform = 'translateY(0px)';
    }

    dom.offsetHeight;
    dom.style.opacity = '1';
    dom.style.transform = 'translateY(0px)';
  }

  public create(option?: IDialogOptions) {
    this.option = mergeIDialogOptions(option || {});
    this.createMask();
    this.createConetnt();
  }
  
  public async close({ onClose, onClosed }: ICloseOptions = {}) {
    if (onClose) onClose();
    if (this) {
      if (this.mask) {
        this.mask.style.backgroundColor = 'rgba(0,0,0,0)';
        if (this.content) {
          this.content.style.transform = 'translateY(-20px)';
          this.content.style.opacity = '0';
        }
        await delay(200);
        try {
          if (this.mask) document.body.removeChild(this.mask);
        // eslint-disable-next-line no-empty
        } catch (err) {
        }
      }
      this.mask = null;
      this.content = null;
      document.documentElement.style.overflow = '';
      if (onClosed) onClosed();
    }
    
  }

  public loading() {
    if (this.mask) {
      this.close();
    }
    this.option = mergeIDialogOptions({ ['close-on-click-modal']: false });
    this.createMask();
    if (this.mask) this.mask.style.backgroundColor = 'rgba(255,255,255,0.4)';
    const box = document.createElement('div');
    box.className = 'loading-box';

    const img = new Image();
    img.src = imgSrc;

    const p = document.createElement('p');
    p.innerText = 'loading';

    box.appendChild(img);
    box.appendChild(p);

    this.mask?.appendChild(box);

    box.offsetHeight;
    box.style.opacity = '1';

    return this;
  }

  public fullScreen(dom?: HTMLElement) {
    if (!this.content && !dom) return;
    const changeSize = (el: HTMLElement) => {
      el.style.width = '100%';
      el.style.height = 'calc(100% - 20px)';
      el.style.marginTop = '20px';
      el.style.left = '0px';
      el.style.top = '0px';
      
      el.style.maxWidth = '100%';
      el.style.maxHeight = '100%';
    }
    const t = dom || this.content;
    if (t) changeSize(t);
  }
  public returnOriginSize() {
    if (!this.content || !this.option) return;
    this.content.style.width = this.option.width;
    this.content.style.height = this.option.height;
    this.content.style.marginTop = this.option.top;
    
    this.content.style.maxWidth = this.option.maxWidth;
    this.content.style.maxHeight = this.option.maxHeight;
  }

  public reflow(option?: IDialogOptions) {
    this.option = mergeIDialogOptions(option || {});
    let origin = null;
    if (this.content) {
      origin = {
        left: 0,
        top: 0,
      };
      origin.left = this.content.style.left ? +this.content.style.left.replace('px', '') : 0;
      origin.top = this.content.style.top ? +this.content.style.top.replace('px', '') : 0;
    }
    
    if (this.content) this.mask?.removeChild(this.content);
    this.content = null;
    this.createConetnt(true);

    if (origin && this.content) {
      const dom = this.content as HTMLElement;
      dom.style.left = `${origin.left}px`;
      dom.style.top = `${origin.top}px`;
    }
  }
}

