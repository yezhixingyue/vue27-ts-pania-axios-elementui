import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean; // 是否展示loading： 传递false时不展示  其它情况均展示
    closeTip?: boolean; // 是否展示错误提示： 默认展示，传递true时不展示
    withoutToken?: boolean; // 不需要token即可进行数据请求
    // [自定义属性声明]
  }
}