import type { AxiosRequestConfig } from "axios";
import TokenClass from "./TokenClass";

export const handleToken = (config: AxiosRequestConfig) => {
  const token = TokenClass.getToken();
  if (!token && !config.withoutToken) {
    throw new Error('请重新登录');
  }

  if (config.headers && !config.withoutToken) config.headers.Authorization = `Bearer ${token}`;
}
