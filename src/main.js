// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import store from './store/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/style/normalize.css'
import '../static/style/self_element.css'
import * as filters from './filters/filter'
import VueResource from 'vue-resource'

import apiLib from '../static/script/lib/lib.js'
import Axios from 'axios'
import rules from '../static/script/lib/rules'
Vue.prototype.$sysUrl = apiLib._GetQueryString('url')
//alert(apiLib._GetQueryString('url'))
Vue.prototype.$axios = apiLib
Vue.prototype.$rules = rules
Vue.config.productionTip = false

Vue.use(router)
Vue.use(vuex)
Vue.use(ElementUI)
Vue.use(ElementUI,{ size: 'mini' })
Vue.use(VueResource);


/*******************************************************************/
/**
 * 配置信息,部署不同的环境要修改这里
 * */
var basePath = Axios.defaults.baseURL + '/api/';
/**
 * my vue-resource object
 * @type {{}}
 */
Vue.prototype.$AJAX = {};

Vue.prototype.$AJAX.formatParam = function(realURL, params) {
  return formatParam(realURL, params);
};

var formatParam = function(realURL, params) {
  if (typeof(params) === 'string') {
    params=JSON.parse(params);
  }
  if (typeof(params) == "object") {
    var paramArray = [];
    for (var key in params) {
      paramArray.push(key + "=" + params[key])
    }

    if (realURL.indexOf("?") > -1) {
      realURL += "&" + paramArray.join("&");
    } else {
      realURL += "?" + paramArray.join("&");
    }
  }

  return realURL;
}

function getTicket(){
  // var ticket;
  // var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  // if(!loginInfo){
  //   window.location.href = "#/login";
  // }else{
  //   ticket = loginInfo.ticket;
  //   if(!ticket){
  //     window.location.href = "#/login";
  //   }else{
  //     return ticket;
  //   }
  // }
  return window.sessionStorage.getItem("token");
}

/**
 * my vue-resource put request
 * @param vm
 * @param uri
 * @param success
 * @constructor
 */
Vue.prototype.$AJAX.GET = function (vm, uri, params, success){
  vm.btnLoading = true;
  vm.tabLoading = true;

  var ticket = getTicket();

  var url;
  if(params == null){
    url = basePath + uri;
  }else{
    url = formatParam(basePath + uri, params);
  }

  vm.$http({
    url: url,
    method: 'GET',
    // 设置请求头
    headers: {
      'accessToken': ticket
    }
  }).then(function (response) {
    // 请求成功回调
    if(response.body.result == '1'){
      // vm.$message.success(response.body.msg);
      success(response);
    }else{
      if(response.body.errorCode == 401){
      window.location.href = "#/login";
    }else if(response.body.errorCode == "0000") {
        vm.$message.error("系统异常，请联系管理员");
     }else
      vm.$message.error(response.body.msg);
    }
    vm.tabLoading = false;
    vm.btnLoading = false;
  }, function (response) {
    // 请求失败回调
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.btnLoading = false;
    vm.tabLoading = false;
  });
}


Vue.prototype.$AJAX.GET2 = function (vm, uri, params, successFn){
  vm.btnLoading = true;
  vm.tabLoading = true;

  var url;
  if(params == null){
    url = basePath2 + uri;
  }else{
    url = formatParam(basePath2 + uri, params);
  }
  vm.$http.get(url, []).then((response) => {
    if(response.body.result == '1'){
      // vm.$message.success(response.body.msg);
      successFn(response);
    }else{
      if(response.body.errorCode == 401){
        window.location.href = "#/login";
      }else if(response.body.errorCode == "0000") {
        vm.$message.error("系统异常，请联系管理员");
      }else
        vm.$message.error(response.body.msg);
    }
    vm.tabLoading = false;
    vm.btnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.btnLoading = false;
    vm.tabLoading = false;
  });
}


/**
 * my vue-resource post request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.POST = function (vm, param, uri, isShowSuccessMsg, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();
  vm.$http.post(url, param, {headers: {'accessToken': ticket}}).then((response) => {
    if(response.body.result == '1'){
      vm.$message.success(response.body.msg);
      successFn(response);
    }else{
      if(response.body.errorCode == 401){
        window.location.href = "#/login";
      }else if(response.body.errorCode == "0000") {
        vm.$message.error("系统异常，请联系管理员");
      }else
        vm.$message.error(response.body.msg);
    }
    vm.winBtnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

/**
 * my vue-resource put request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.PUT = function (vm, param, uri, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();
  vm.$http.put(url, param, {headers: {'accessToken': ticket}}).then((response) => {
    if(response.body.result == '1'){
      vm.$message.success(response.body.msg);
      successFn(response);
    }else{
      if(response.body.errorCode == 401){
        window.location.href = "#/login";
      }else if(response.body.errorCode == "0000") {
        vm.$message.error("系统异常，请联系管理员");
      }else
        vm.$message.error(response.body.msg);
    }
    vm.winBtnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

/**
 * my vue-resource delete request
 * @param vm
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.DELETE = function (vm, uri, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();

  vm.$http({
    url: url,
    method: 'DELETE',
    // 设置请求头
    headers: {
      'accessToken': ticket
    }
  }).then(function (response) {
    // 请求成功回调
    if(response.body.result == '1'){
      vm.$message.success(response.body.msg);
      successFn(response);
    }else{
      if(response.body.errorCode == 401){
        window.location.href = "#/login";
      }else if(response.body.errorCode == "0000") {
        vm.$message.error("系统异常，请联系管理员");
      }else
        vm.$message.error(response.body.msg);
    }
    vm.winBtnLoading = false;
  }, function (response) {
    // 请求失败回调
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

Vue.prototype.$OPTIONS = function(value, options){
  if(!options){
    return "";
  }
  for(var i=0;i<options.length;i++){
    var option = options[i];
    if(option.value == value){
      var label = option.label;
      return label;
    }
  }
}

Vue.prototype.$OPTIONS2 = function(values, options){
  if(!values){
    return "";
  }
  var arr = values.split(',');
  var texts = "";
  for(var i=0;i<arr.length;i++){
    var key = arr[i];
    if(options){
      for(var j=0;j<options.length;j++){
        var obj = options[j];
        if(obj.value == key){
          var text = obj.label;
          texts += text;
          if(i<arr.length-1){
            texts += ",";
          }
        }
      }
    }
  }
  return texts;
}

Vue.prototype.$RESET = function(vm){
  for(var p in vm.searchParam){
    if(p != 'start' && p != 'length'){
      vm.searchParam[p] = '';
    }
  }
  vm.search();
}
/*******************************************************************/


/*
  登录超时回登录页
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
    if (store.state.token||window.sessionStorage.token=="1") {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {    //如果没有权限,重定向到登录页,进行登录
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else { //不需要权限 直接跳转
    next();
  }
})


Vue.prototype.$OPTIONS = function(value, options){
  if(!options){
    return "";
  }
  for(var i=0;i<options.length;i++){
    var option = options[i];
    if(option.value == value){
      var label = option.label;
      return label;
    }
  }
}

Vue.prototype.$MONEY_FORMAT = function(number, decimals, dec_point, thousands_sep, sign){
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return sign + s.join(dec);
}

Date.prototype.format =function(format)
{
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4- RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Object.keys(filters).forEach(key => {
  //console.log(key)
  Vue.filter(key, filters[key])
})
