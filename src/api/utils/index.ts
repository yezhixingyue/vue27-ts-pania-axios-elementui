import router from "@/router";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import CancelRequestHandler from "./handleCancel/CancelRequestHandler";
import { handleErrorToast } from "./handleToast/handleErrorToast";
import { handleFailToast } from "./handleToast/handleFailToast";
import { loadingHandler } from "./handleLoading/loadingHandler";
import TokenClass from "./handleToken/TokenClass";
import { handleToken } from "./handleToken/tokenHandler";


export const localCancelToken = new CancelRequestHandler();

export class Handler {
  /**
   * 请求开始时 打开loading展示
   *
   * @static
   * @param {AxiosRequestConfig} config
   * @memberof Utils
   */
  static setLoading(config: AxiosRequestConfig) {
    if (config.loading !== false) { // 展示loading
      loadingHandler.display();
    }
  }

  /**
   * 请求完成后关闭loading展示
   *
   * @static
   * @param {AxiosRequestConfig} config
   * @memberof Utils
   */
  static closeLading(config: AxiosRequestConfig) {
    if (config.loading !== false) { // 关闭loading
      loadingHandler.hidden();
    }
  }

  /**
   * 为请求头添加token信息
   *
   * @static
   * @param {AxiosRequestConfig} config
   * @memberof Utils
   */
  static setToken(config: AxiosRequestConfig) {
    handleToken(config); // 处理token携带
  }

  /**
   * 请求发出时，记录取消请求方法
   *
   * @static
   * @param {AxiosRequestConfig} config
   * @memberof Utils
   */
  static setCancelToken(config: AxiosRequestConfig) {
    localCancelToken.setCancelToken(config);
  }

  /**
   * 请求完成后 从记录中删除取消请求方法
   *
   * @static
   * @param {AxiosRequestConfig} config
   * @memberof Utils
   */
  static removeCancelToken(config: AxiosRequestConfig) {
    localCancelToken.removeCancelToken(config || '');
  }

  /**
   * 处理失败请求
   *
   * @static
   * @param {AxiosResponse} response
   * @memberof Utils
   */
  static handleFailToast(response: AxiosResponse) {
    handleFailToast(response);
  }

  /**
   * 处理错误请求
   *
   * @static
   * @param {*} error
   * @memberof Utils
   */
  static handleErrorToast(error: any) {
    handleErrorToast(error);
  }

  /**
   * 授权验证失败 返回登录页面
   *
   * @static
   * @memberof Utils
   */
  static backToLogin() {
    TokenClass.removeToken();
    localCancelToken.cancelAllRequest();
    router.replace('/login');
  }
}