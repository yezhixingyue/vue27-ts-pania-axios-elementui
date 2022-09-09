import axios from 'axios';
import type { IMPAxiosInstance } from './types/type';
import { Handler } from './utils';

const instance: IMPAxiosInstance = axios.create({}); // baseURL: '/', timeout: 15000,

instance.interceptors.request.use(
  (config) => {
    try {
      Handler.setLoading(config);
      Handler.setCancelToken(config);
      Handler.setToken(config);
      
    } catch (error) {
      Handler.backToLogin();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    Handler.closeLading(response.config);
    Handler.removeCancelToken(response.config);
    Handler.handleFailToast(response);

    return response;
  },
  (error) => {
    Handler.closeLading(error.config);
    Handler.removeCancelToken(error.config);
    Handler.handleErrorToast(error);

    return Promise.reject(error);
  },
);

export default instance;
