import type { AxiosRequestConfig } from "axios";
import { TokenClass } from "yezhixingyue-js-utils-4-mpzj";
import api from "@/api/index";

export const tokenHandler = new TokenClass({
  labelName: {
    token: 'converterToken',
    user: 'converterUser',
  },
  getUserInfoFunc: () => api.getUser(),
});

export const handleToken = (config: AxiosRequestConfig) => {
  const token = tokenHandler.getToken();
  if (!token && !config.withoutToken) {
    throw new Error('请重新登录');
  }

  if (config.headers && !config.withoutToken) config.headers.Authorization = `Bearer ${token}`;
}
