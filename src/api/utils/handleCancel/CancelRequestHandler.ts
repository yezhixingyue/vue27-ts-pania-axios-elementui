import axios, { type AxiosRequestConfig, type Canceler } from 'axios';
import qs from 'qs';

interface IRecordItem {
  [key: string]: Canceler
}

export default class CancelToken {
  recordList:IRecordItem[] = []

  static getFullUrlByQs(config: AxiosRequestConfig) {
    const {
      method, url, params, data,
    } = config;
    return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
  }

  setCancelToken(config: AxiosRequestConfig) {
    const _config = config;
    const fullUrl = CancelToken.getFullUrlByQs(config);
    _config.cancelToken = new axios.CancelToken(c => {
      this.recordList.push({ [fullUrl]: c });
    });
  }

  removeCancelToken(config: AxiosRequestConfig) {
    if (!config) return;
    const fullUrl = CancelToken.getFullUrlByQs(config);
    const i = this.recordList.findIndex(it => Object.keys(it)[0] === fullUrl);
    if (i > -1) this.recordList.splice(i, 1);
  }

  cancelAllRequest() {
    if (this.recordList.length > 0) {
      this.recordList.forEach(it => {
        const key = Object.keys(it)[0];
        it[key]();
      });
      this.recordList = [];
    }
  }
}
