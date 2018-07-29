import Vue from 'vue';
import App from './App';
import router from './router';

//引入element文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局的样式
import './assets/index.css';

// 引入axios

import axios from 'axios';

// 在vue的原型上添加方法
Vue.prototype.$http = axios;

//配置公共路径

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 所有请求之前都要执行的操作
  // console.log('axios 的请求拦截器', config)

  // 如果是login，不添加header
  if (config.url.indexOf('login') <= -1) {
    // 给请求头中添加 Authorization 请求头：
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

//主要是插件，需要use
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App></App>'
})
