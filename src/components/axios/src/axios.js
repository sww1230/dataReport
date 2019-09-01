"use strict";

import Vue from 'vue';
import axios from "axios";
import {ajax,m} from './ajax';


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
function initAjax (apiList, errorCallback, successCallback){
    let config = {
      // baseURL: process.env.baseURL || process.env.apiUrl || ""
      // timeout: 60 * 1000, // Timeout
      // withCredentials: true, // Check cross-site Access-Control
    };

    const _axios = axios.create(config);

    _axios.interceptors.request.use(
      function(config) {
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
    _axios.interceptors.response.use(
      function(response) {
        successCallback && successCallback(response)
        return response.data;
      },
      function(error) {
        errorCallback && errorCallback(error)
        return Promise.reject(error);
      }
    );

    // 扩展methods
    let _ajax = ajax(_axios)

    // 注册插件
    Plugin.install = function(Vue) {
      Vue.$ajax = _ajax;
      window.$ajax = _ajax;
      Object.defineProperties(Vue.prototype, {
        $ajax: {
          get() {
            return _ajax;
          }
        },
      });
    };
    Vue.use(Plugin)

    // 初始化api接口
    _ajax.init = (moduleAll) => {
      Object.keys(moduleAll).map(group=>{
        let _apiList = moduleAll[group](m)
        _ajax[group] = {}
        Object.keys(_apiList).map(meth => {
          Object.keys(_apiList[meth]).map(apiName=>{
            let url = _apiList[meth][apiName]
            _ajax[group][apiName] = (params) => {
              return _ajax[meth](url, params)
            }
          })
        })
      })
    }

    _ajax.init(apiList)
}


export default initAjax