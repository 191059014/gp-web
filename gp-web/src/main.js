// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { getCookie } from '@/util/cookieUtils.js'
import 'font-awesome/css/font-awesome.min.css'
import '@/util/global.js';

/**
 * axios相关设置
 */
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem(USER_SESSION_KEY)
axios.defaults.withCredentials = true// 让ajax携带cookie
Vue.prototype.$axios = axios

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  return config;
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  return response;
}, function (error) {
  // 处理响应失败
  return Promise.reject(error);
});
