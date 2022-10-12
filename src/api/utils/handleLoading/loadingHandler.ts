import type Dialog from "@/assets/js/MpMessage/dialog";
import message from "@/assets/js/MpMessage/message";
// import 'element-ui/lib/theme-chalk/loading.css';
import { Loading } from "element-ui";
import type { ElLoadingComponent } from "element-ui/types/loading";

class LoadingHandler {
  count = 0

  // loadingInstance: Dialog | null = null
  loadingInstance: ElLoadingComponent | null = null

  display() {
    this.count += 1;
    // this.loadingInstance = message.loading();
    console.log(0, this.count);
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
