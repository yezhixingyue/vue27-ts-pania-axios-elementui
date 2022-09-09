import instance from './axios';

const api = {
  getLogin(data: any) {
    return instance.post('/Api/Staff/Login', data, { withoutToken: true });
  },
  getUser<T = any>() {
    return instance.get<T>('/Api/Customer/Detail');
  },
};

export default api;
