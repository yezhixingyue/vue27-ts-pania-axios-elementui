export const delay = (duration: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(duration);
  }, duration);
});

class ClassNameHandler {
   private _setDomClassName (dom: Element, className: string, type: 'add'|'remove' = 'add') {
    let list = dom.className.split(/\s+/).filter(it => it);
  
    switch (type) {
      case 'add':
        if (className && !list.includes(className)) list.push(className);
        dom.className = list.join(' ');
        break;
      
      case 'remove':
        if (className && list.includes(className)) list = list.filter(it => it !== className);
        dom.className = list.join(' ');
        break;
      default:

        break;
    }
  }

  add(dom: Element, className: string) {
    this._setDomClassName(dom, className, 'add');
  }

  remove(dom: Element, className: string) {
    this._setDomClassName(dom, className, 'remove');
  }
}

export const classNameHandler = new ClassNameHandler();

export const ElementDragHandler = (img: HTMLElement, target: HTMLElement = img, hasScreenBoundary: Boolean = false) => {
  const point = { // 开始点
    x: 0,
    y: 0,
  }
  
  const origin = {
    left: 0,
    top: 0,
  }

  const screenBoundary = {
    minLeft: 0,
    minTop: 0,
    maxLeft: 0,
    maxTop: 0,
  }

  const onMove = (e: MouseEvent) => {
    const diffX = e.pageX - point.x;
    const diffY = e.pageY - point.y;
    
    let left = origin.left + diffX;
    let top = origin.top + diffY;

    if (hasScreenBoundary) {
      if (left > screenBoundary.maxLeft) {
        point.x -= screenBoundary.maxLeft - left;
        left = screenBoundary.maxLeft;
      }
      if (left < screenBoundary.minLeft) {
        point.x -= screenBoundary.minLeft - left;
        left = screenBoundary.minLeft;
      }
      if (top > screenBoundary.maxTop) {
        point.y -= screenBoundary.maxTop - top;
        top = screenBoundary.maxTop;
      }
      if (top < screenBoundary.minTop) {
        point.y -= screenBoundary.minTop - top;
        top = screenBoundary.minTop;
      }
    }

    target.style.left = `${left}px`;
    target.style.top = `${top}px`;

    img.addEventListener('click', onClick);

    e.preventDefault();
    return false;
  }
  const onClick = (e:MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  const onMouseup = () => {
    img.style.cursor = 'auto';
    img.style.cursor = 'unset';
    document.removeEventListener('mousemove', onMove);
    setTimeout(() => {
      img.removeEventListener('click', onClick);
    })
    document.addEventListener('dragstart', onDragstart);
    document.removeEventListener('mouseup', onMouseup);
  }
  const onDragstart = (e: DragEvent) => {
    e.preventDefault();
    return false;
  }

  img.onmousedown = (e: MouseEvent) => {
    origin.left = target.style.left ? +target.style.left.replace('px', '') : 0;
    origin.top = target.style.top ? +target.style.top.replace('px', '') : 0;

    if (hasScreenBoundary) {
      const rect = target.getBoundingClientRect();
      screenBoundary.minLeft = origin.left - rect.left;
      screenBoundary.maxLeft = screenBoundary.minLeft + (document.body.clientWidth - rect.width);
      screenBoundary.minTop = origin.top - rect.top;
      screenBoundary.maxTop = screenBoundary.minTop + (document.documentElement.clientHeight - rect.height);
    }
    
    point.x = e.pageX;
    point.y = e.pageY;

    img.style.cursor = 'move';

    document.addEventListener('mousemove', onMove);

    img.addEventListener('dragstart', onDragstart);
    document.addEventListener('mouseup', onMouseup);
  }

};
