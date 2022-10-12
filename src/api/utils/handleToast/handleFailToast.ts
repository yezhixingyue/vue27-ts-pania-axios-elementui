import type { AxiosResponse, AxiosRequestConfig } from "axios";
import type { IMpResponse } from "../../types/type";
import { Handler } from "..";
import { toastConfig } from "./toast.config";
// import message from "@/assets/js/MpMessage/message";
import { message } from "@/assets/js/message";


const getApiFailTitle = (config: AxiosRequestConfig) => {
  let title = '操作失败';  
  const t = toastConfig.apiMapErrorTitleList.find(it => it.url === config.url);
  if (t) {
    title = t.title;
  }

  return title;
};

export const handleFailToast = (response: AxiosResponse<IMpResponse<any>>) => {

  if (!toastConfig.statusWithoutToast.includes(response.data.Status) && !response.config.closeTip) { // 此时需要提示
    const cb = () => {
      if ([7025, 8037].includes(response.data.Status)) {
        Handler.backToLogin();
      }
    };
    message.error({
      title: getApiFailTitle(response.config),
      message: `[ ${response.data.Message} ]`,
      onOk: cb,
      onCancel: cb,
    })
  }
}
