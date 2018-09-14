import axios from 'axios'
import {Message,Loading } from "element-ui"
import store from '../../../src/vuex/store'
import router from '../../../src/router'
import crypto from 'crypto'

class Axios{
  constructor(){
    this.init()

  }

  getActives(){
    return [{
      value: 'local',
      label: '本地',
      hostname: 'localhost',
      restUrl: 'http://localhost:8081'
    },
      {
        value: 'test',
        label: '测试',
        hostname: 'test-xls-web.juzifenqi.com',
        restUrl: 'https://test-xls-admin.juzifenqi.com'
      },
      {
        value: 'pre',
        label: '预生产',
        hostname: 'pre-xls-web.juzifenqi.com',
        restUrl: 'https://pre-xls-admin.juzifenqi.com'
      },
      {
        value: 'prd',
        label: '生产',
        hostname: 'xls-web.juzifenqi.com',
        restUrl: 'https://xls-admin.juzifenqi.com'
      }
    ]
  }

  /**
   * 初始化参数
   */
  init(){
    var actives = this.getActives();
    var hostname = document.location.hostname;
    // hostname = 'test-xls-web.juzifenqi.com';  // 手动指定域名
    console.log("==== 当前域名：" + hostname + " ====");
    // 设置访问后台的地址
    var active = this.autoActive(hostname, actives);
    axios.defaults.baseURL = active.restUrl;
    console.log("==== 自动判断环境：" + active.label + "（"+active.value+"） ====");
    console.log("==== 请求后台路径：" + active.restUrl + " ====");
  }

  /**
   * 通过域名判定环境，返回对应环境的地址
   * @param hostname
   * @param actives
   * @returns {*}
   */
  autoActive(hostname, actives){
    if(!hostname){
      alert('系统异常：域名为空');
      return false;
    }
    for(var i=0;i<actives.length;i++){
      if(actives[i].hostname == hostname){
        return actives[i];
      }
    }
    alert('系统异常：域名不正确');
  }

  //设置请求头

  setHeaderToken(token){
    axios.defaults.headers.common['accessToken'] = token;
  };

  _GetQueryString(name) {
    //获取url 参数
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    let context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  }
  _setUserInfo(data){
    // 把请求的数据存入vuex
    store.commit('setUserInfo',data);
  }
  /**
   * 判断是否是登录
   * @param url
   * @returns {boolean}
   * @private
   */
  _isLogin(url){
    if(url != 'dologin'){
      // axios.defaults.headers = {'x-token': store.state.user.user.token.token};
      return false;
    }else{
      return true;
    }
  }
  _toMd5(data){
    // 加入字符编码
    let md5 = crypto.createHash('md5').update(data+"1QAZ2WSX!!", 'utf-8').digest('hex');
    return md5.toUpperCase();
  }
  /**
   * 下载
   */
  DownLoad(fileName){
    //window.open('http://test.credit.chezhubaitiao.com/credit/distributor/down?file=' + fileName);
  }
  /**
   * 判断是否返回数据
   * @param data 接收到的数据
   * @returns {boolean}
   * @private
   */
  _isStatus(data){
    //console.log("data.code=="+data.code)
    if(data.result == "1"){
      return true
    }else{
      if(data.errorCode == "401"){
        Message.warning(data.msg || '请重新登录！');
        router.push('/login')
      }else if(data.errorCode == "0000"){
        Message.error("系统异常，请联系管理员");
      }else {
        Message.warning(data.msg);
      }
      return false
    }
  }
  /**
   * 全局错误处理
   * @param data 传入错误的数据
   * @private
   */
  _error(data){
    console.log(data)
    Message.error('网络错误！');
  }
  /**
   * DELETE 请求 {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */

  /**
   * PUT 请求 {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  HttpPut(url,data) {
    //console.log("get==="+data)
    // 创建一个promise对象
    let _loading = Loading.service({ fullscreen: true ,target:document.getElementById("main")})
    this._isLogin(url)
    this.promise = new Promise((resolve, reject)=> {
      axios.put(url,data)
        .then((data) => {
          _loading.close()
          if(this._isStatus(data.data)){
            resolve(data.data);
          }
        })
        .catch((data) =>{
          _loading.close()
          this._error(data);
        })
    })
    return this.promise;
  };
  /**
   * GET 请求 {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  HttpGet(url,data) {
    //console.log("get==="+data)
    // 创建一个promise对象
    let _loading = Loading.service({ fullscreen: true ,target:document.getElementById("main")})
    this._isLogin(url)
    this.promise = new Promise((resolve, reject)=> {
      axios.get(url,{params:data})
        .then((data) => {
          _loading.close()
          if(this._isStatus(data.data)){
            resolve(data.data);
          }
        })
        .catch((data) =>{
          _loading.close()
          this._error(data);
        })
    })
    return this.promise;
  };

  HttpDel(url,Data,urlData){
    // 判断是否加头部
    //this._isLogin(url);
    // 创建一个promise对象
    let _loading = Loading.service({ fullscreen: true ,target:document.getElementById("main")})
    this.promise = new Promise((resolve, reject)=> {
      /*for(const item in urlData){
        url += '/' + urlData[item];
      };*/
      axios.delete(url,Data)
        .then((data) => {
          _loading.close()
          if(this._isStatus(data.data)){
            resolve(data.data)
          }
          // 是否请求成功
          /*if(this._isStatus(data.data)){
            // 是否需要存数据
            if(this._isLogin(url)){
              this._setUserInfo(data)
            };
            resolve(data)
          };*/
        })
        .catch((data) =>{
          _loading.close()
          this._error(data);
        })
    });
    return this.promise;
  };
  HttpPost(url,Data,urlData){
    // 判断是否加头部
    //this._isLogin(url);
    // 创建一个promise对象
    let _loading = Loading.service({ fullscreen: true ,target:document.getElementById("main")})
    this.promise = new Promise((resolve, reject)=> {
      /*for(const item in urlData){
        url += '/' + urlData[item];
      };*/
      axios.post(url,Data)
        .then((data) => {
          _loading.close()
          if(this._isStatus(data.data)){
            resolve(data.data)
          }
          // 是否请求成功
          /*if(this._isStatus(data.data)){
            // 是否需要存数据
            if(this._isLogin(url)){
              this._setUserInfo(data)
            };
            resolve(data)
          };*/
        })
        .catch((data) =>{
          _loading.close()
          this._error(data);
        })
    });
    return this.promise;
  };
  HttpPostFile(url,e,Data){
    // 判断是否加头部
    //this._isLogin(url);
    // 创建一个promise对象
    console.log("请求数据=="+JSON.stringify(Data))
    let file = e.target.files[0]
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    let param = new FormData() // 创建form对象
    param.append('file', file, file.name) // 通过append向form对象添加数据
    //param.append('file', file, file.name)

    let _loading = Loading.service({ fullscreen: true ,target:document.getElementById("main")})
    this.promise = new Promise((resolve, reject)=> {
      /*for(const item in urlData){
        url += '/' + urlData[item];
      };*/
      axios.post(url,param,config)
        .then((data) => {
          console.log("上传成功="+JSON.stringify(data))
          if(this._isStatus(data.data)){
            resolve(data.data)
          }
          _loading.close()
          // 是否请求成功
          /*if(this._isStatus(data.data)){
            // 是否需要存数据
            if(this._isLogin(url)){
              this._setUserInfo(data)
            };
            resolve(data)
          };*/
        })
        .catch((data) =>{
          _loading.close()
          this._error(data);
        })
    });
    return this.promise;
  };
}
export default new Axios();
