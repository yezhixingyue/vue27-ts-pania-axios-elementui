import { Loading } from "element-ui";
import type { ElLoadingComponent } from "element-ui/types/loading";

class LoadingHandler {
  count = 0

  loadingInstance: ElLoadingComponent | null = null

  display() {
    this.count += 1;
    this.loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.3)',
      customClass: 'mp-general-loading-box',
    });
  }

  hidden() {
    this.count -= 1;
    if (this.count < 0) this.count = 0;
    if (this.count === 0 && this.loadingInstance) this.loadingInstance.close();
  }
}

export const loadingHandler = new LoadingHandler();
