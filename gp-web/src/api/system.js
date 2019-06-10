import axios from 'axios';
import {Message} from 'element-ui'

let baseUrl = 'http://localhost:8090';

// 登陆
export const login = params => { return axios.get(`${baseUrl}/controller/login/login`, { params: params }).then(res => res.data); };

axios.interceptors.request.use(config=> {
    return config;
  }, err=> {
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
  })
  axios.interceptors.response.use(result=> {
    if (result.status && result.status == 200 && result.data.code != '10000') {
      Message.error({message: result.data.msg});
      return result;
    }
    return result;
  }, err=> {
    if (err.response.status == 504||err.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    }else {
      Message.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
  })