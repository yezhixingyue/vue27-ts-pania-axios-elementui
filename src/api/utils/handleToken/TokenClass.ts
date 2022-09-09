import api from '@/api/index';
import type { IUser } from '../../types/type';

enum labelNameEnum {
  token = 'converterToken',
  user = 'converterUser'
}

/**
 * 获取到今天24点时的时间戳
 */
const getTodayTimeStampIn24Am = () => {
  const date = new Date();
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(999);
  return date.getTime();
};

export default class TokenClass {
  static removeToken() {
    localStorage.removeItem(labelNameEnum.token);
    localStorage.removeItem(labelNameEnum.user);
  }

  static setToken(token: string) {
    if (!token) return;
    this.removeToken();
    const timeStamp = getTodayTimeStampIn24Am();
    const temp = {
      token,
      timeStamp,
    };
    localStorage.setItem(labelNameEnum.token, JSON.stringify(temp));
  }

  static getToken() {
    let token;
    const temp = localStorage.getItem(labelNameEnum.token);
    const tokenObj = temp ? JSON.parse(temp) : null; // 2.1 获取到token信息，可能为undefined
    if (tokenObj) {
      if (tokenObj.timeStamp && tokenObj.timeStamp > Date.now()) {
        token = tokenObj.token;
      } else {
        localStorage.removeItem(labelNameEnum.token);
        localStorage.removeItem(labelNameEnum.user);
      }
    }
    return token;
  }

  static async getUser(token: string): Promise<IUser | Error> { // 获取用户信息
    const temp = localStorage.getItem(labelNameEnum.user);
    if (!temp) {
      const res = await api.getUser().catch(() => null);
      if (res && res.status === 200 && res.data.Status === 1000) {
        localStorage.setItem(labelNameEnum.user, JSON.stringify(res.data.Data));
        return res.data.Data;
      }
      return new Error(res && res.data ? res.data.Message : '获取账号信息失败，请刷新重试');
    }
    const data = JSON.parse(temp);
    if (data.Token === token) return data;
    localStorage.removeItem(labelNameEnum.user);
    return this.getUser(token);
  }
}
