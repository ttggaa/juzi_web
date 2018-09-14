<template>
    <div class="login-wrapper bg">
      <el-container>
        <el-header>
          <h1>新零售系统</h1>
        </el-header>
        <el-main>
          <el-row type="flex" >
            <el-col class="login-content" :offset="14" :span="6">
              <el-card class="box-card">
                <h4>账户登录</h4>
                <el-form @keyup.enter.native="login" :rules="$rules" ref="lgForm" size="small" :model="loginForm">
                  <el-form-item label-width="80px" label="用户名" prop="userName">
                    <el-input auto-complete="true" maxlength="30" v-model="loginForm.userName" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label-width="80px" label="密码" prop="passWord">
                    <el-input maxlength="30" type="password" v-model="loginForm.passWord" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label-width="80px" label="验证码">
                    <el-input maxlength="4" v-model="loginForm.validateCode" size="small"></el-input>
                    <img ref="vcode" class="vimg" width="80px" @click="changeImg" alt="验证码"/>
                  </el-form-item>
                  <el-form-item label-width="80px">
                    <el-button v-bind:disabled="lgbtF" style="width: 100%" type="primary" @click="login">登录</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>
<script>
    import crypto from 'crypto'
    import Axios from 'axios'
    export default {
        data() {
            return {
              ms:0,
              lgbtF:false,
              loginForm:{
                "userName":"",
                "passWord":"",
                "validateCode":"",
                "uuid":""
              },
            }
        },
        props: {
            // 父组件传过来的值
            someValue: String
        },
        components: {
            // 引入其他组件
        },
        beforeCreate: function () {
            // 组件创建前
        },
        created: function () {
            // 组件创建时执行
          console.log("Component: login.vue, Method: created, baseURL:" + Axios.defaults.baseURL);
        },
        beforeMount: function () {
        },
        mounted: function () {
            // 组件挂载结束
          this.autodivheight();
          this.changeImg()
        },
        beforeUpdate: function () {
            // 组件挂载结束
        },
        updated: function () {
            // 组件挂载结束
        },
        beforeDestroy: function () {
            // 组件挂载结束
        },
        destroyed: function () {
        },
        computed: {
            // 计算属性
        },
        methods: {
            // 自定义方法
          autodivheight(){
            //函数：获取尺寸
            //获取浏览器窗口高度
            let winHeight=0;
            if (window.innerHeight)
              winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
              winHeight = document.body.clientHeight;
            //通过深入Document内部对body进行检测，获取浏览器窗口高度
            if (document.documentElement && document.documentElement.clientHeight)
              winHeight = document.documentElement.clientHeight;
            //DIV高度为浏览器窗口的高度
            document.getElementsByClassName("login-wrapper")[0].style.height= winHeight +"px";
          },
          changeImg(){
            // 改用ajax请求
            var url = Axios.defaults.baseURL+'/pictureCheck';
            this.$http.get(url, []).then((response) => {
              this.$refs.vcode.src= response.body.img;
              this.loginForm.uuid = response.body.uuid;
            }, (response) => {
              this.$message.error('请求图形验证码异常');
            });

          },
          msF(){
            this.ms =Math.random()
            return this.ms
          },
          toMd5(data){
              // 加入字符编码
              let md5 = crypto.createHash('md5').update(data+"1QAZ2WSX!!", 'utf-8').digest('hex');
              return md5.toUpperCase();
          },
          login(){
            let _this=this

            this.$refs['lgForm'].validate((valid) => {
              if (valid) {
                let fd = new FormData();
                fd.append('password', this.loginForm.passWord)
                fd.append('userName', this.loginForm.userName)
                fd.append('checkCode', this.loginForm.validateCode)
                fd.append('uuid', this.loginForm.uuid)
                Axios.post('/login',fd)
                  .then(function(res){
                    if(res.data.result=="1"){
                      var loginInfo = res.data.data;
                      _this.$store.commit("saveToken",loginInfo.ticket)
                      _this.$axios.setHeaderToken(loginInfo.ticket)
                      localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
                      console.log(loginInfo);
                      _this.$message({
                        message: '登录成功',
                        type: 'success'
                      });
                      _this.$router.push('/index')
                    } else{
                      _this.$message({
                        type:"warning",
                        message:res.data.msg
                      })
                    }
                    _this.changeImg()
                  })
                  .catch(function(err){
                    _this.$message({
                      type:'warning',
                      message:'网络错误'
                    })
                  });
              } else {
                console.log('请检查输入内容');
                return false;
              }
            });
          }
        }
    }
</script>
<style scoped>
  .login-wrapper{
    width: 100%;
    height: 100%;
    background: #0b5dff;
  }
  .login-content{
    margin-top: 12%;
  }
  .el-header{
    background: #ebeef5;
  }
  h1{
    font-size: 30px;
    font-weight: 700;
    color: #1b51bd;
  }
  h4{
    font-size: 18px;
    color: #4a4a4a;
    text-align: center;
    margin-bottom: .5rem;
  }
  .vimg{
    position: absolute;
    top: 1px;
    right: 0;
  }
  .bg{
    position: absolute;
    background: url(../assets/img/bg.jpg) no-repeat fixed center;
    background-size: cover;
    width: 100%;
    height: 100%;
    background-clip:border-box;
    background-origin:content-box;
  }
  .el-main{
    padding: 0;
  }
</style>
