import message from "@/assets/js/MpMessage/message";
import { Handler } from "..";
// import { Message } from 'element-ui';
// import { message } from "@/assets/js/message";

const getErrorTitle = (error:any) => {
  let title = error?.response?.data?.Message;
  if (title && ![401, 403, 404].includes(error?.response?.status)) return title;
  switch (error?.response?.status) {
    case 401:
      title = '401 | 请重新登录';
      break;
    case 403:
      title = '403 | 请重新登录';
      break;
    case 404:
      title = '404 | 资源未找到';
      break;
    case 500:
      title = '500 | 服务器内部错误';
      break;
    case 501:
      title = '501 | 服务器无法识别请求';
      break;
    case 502:
      title = '502 | 网关错误';
      break;
    case 503:
      title = '503 | 服务不可用';
      break;
    case 504:
      title = '504 | 网关超时';
      break;
    case 505:
      title = '505 | HTTP 版本不受支持';
      break;
    default:
      title = error?.message || '请求发生错误';
      break;
  }
  return title;
}

export const handleErrorToast = (error: any) => {
  const title = getErrorTitle(error);
    
  // if ([401, 403].includes(error?.response?.status)) {
  //   Message.error(title);
  //   Handler.backToLogin();
  //   return;
  // }

  const cb = () => {
    if ([401, 403].includes(error?.response?.status)) {
      Handler.backToLogin();
    }
  }

  message.error({ title, onCancel: cb, onOk: cb });
}