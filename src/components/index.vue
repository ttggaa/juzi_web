<template>
<el-container id="container" >
  <el-header>
    <el-row>
      <el-col :span="18"><span class="logo">新零售后台管理系统  <span style="font-size: 28px"></span></span></el-col>
      <el-col :span="4">
        <!--<span class="usr-info">你好, xxx</span>-->
      </el-col>
      <el-col :span="1">
          <el-button @click="logout" class="main-button" type="primary" size="small">退出</el-button>
        <svg data-v-7908b6e3="" aria-hidden="true" class="icon">
          <use data-v-7908b6e3="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tuichudenglu">
          </use>
        </svg>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="index-container">
    <el-aside  :class="{ asideClose : isCollapse }">
      <el-card class="box-card">
        <img src="../assets/img/sf.jpg" style="border-radius:50%;margin-left:25px;" height="80" width="80"/>
        <p class="titleP">
          <span>{{user.realName}}</span><br>
          <span>{{user.nickName}}</span><br>
          <span style="font-size:8px;">{{user.code}}</span><br>
          <span>{{user.roleNames}}</span><br>
        </p>
      </el-card>
     <el-menu class="el-menu-vertical" :collapse="isCollapse">
        <div class="tgl-order" @click="tglShow">
          <svg v-if="isCollapse" class="icon" aria-hidden="true">
            <use xlink:href="#icon-daohangzhankai"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-daohangzhedie"></use>
          </svg>
        </div>
      <!-- 左侧菜单 -->
       <div v-if="permissionTree.children" v-for="item in permissionTree.children" :key="item.id">
         <el-submenu :index="item.id+''" v-if="item.type == 'branch'">
           <template slot="title">
             <i class="el-icon-document"></i>
             <span style="font-size:12px;">{{item.label}}</span>
           </template>
           <div v-if="item.children" v-for="item2 in item.children" :key="item2.id">
             <router-link :to="item2.url">
               <el-menu-item  v-if="item2.type=='leaf'" :index="item2.id+''" :data="item2.url" :name="item2.label" @click="addTab($event)">
                 <i :class="item2.icon"></i>
                 <span slot="title">{{item2.label}}</span>
               </el-menu-item>
             </router-link>
           </div>
         </el-submenu>
       </div>
      </el-menu>
    </el-aside>
    <el-main>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="switchTabs" @tab-remove="removeTab">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name">
        </el-tab-pane>

        <div class="welcome" v-if="this.$route.path=='/index'">
          <h2>欢迎使用，系统初始化平台</h2>
        </div>
        <router-view></router-view>
      </el-tabs>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
  export default {
    components: {
      ElContainer,
      ElMain,
      ElButton,
      ElCol,
      ElRow,
    },
    data() {
      return {
        tabMenus:[],
        isCollapse:false,
        editableTabsValue: '',
        editableTabs: [],
        tabIndex: 2,
        options: [],
        value:'',
        permissionTree: {},
        user:{
          code: '',
          nickName: '',
          realName: '',
          roleNames: ''
        }
      }
    },
    mounted: function () {
      // 组件挂载结束
      /**
       * 适应浏览器窗口高度
       */
      this.tabMenus = this.$store.state.menuNo
      //console.log(this.$store.state.menuNo)
      this.autodivheight()
      window.onresize = this.autodivheight
      this.initPermissionTree();
    },
    computed: {
      // 计算属性
    },
    methods: {
      // 自定义方法
      //动态设置高度
      autodivheight(){
        //函数：获取尺寸
        //获取浏览器窗口高度
        let winHeight=0;
        if (window.innerHeight)
          winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
          winHeight = document.body.clientHeight;
        //获取浏览器窗口高度
        if (document.documentElement && document.documentElement.clientHeight)
          winHeight = document.documentElement.clientHeight;
        //DIV高度为浏览器窗口的高度
        document.getElementById("container").style.height= winHeight +"px";
        document.getElementsByClassName("el-menu-vertical")[0].style.height= winHeight-60 +"px";
      },
      tglShow(){
        this.isCollapse = !this.isCollapse;
        if(!this.isCollapse){
          setTimeout(()=>{
            this.autodivheight()
          },500)
        }
      },
      addTab(sysId,menuNo) {
        let tabId = event.currentTarget.getAttribute('data')// 当前点击id
        let tabName = event.currentTarget.getAttribute('name')// 当前点击id
        let tabs = this.editableTabs;
        let pushFlag = true;
        this.$store.commit('changeSys',sysId)//存储系统编号
        this.$store.commit('changeMenu',menuNo)//存储菜单编号
        tabs.forEach((tab, index) => {
          if (tab.name === tabId) {
            pushFlag = false;
          }
        });
        if(pushFlag){
          this.editableTabs.push({
            title: tabName,
            name: tabId,
            //content: tabName+' content'
          });
        }
        this.editableTabsValue = tabId;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        if(tabs.length == 1){
          this.$router.push('/')
        }else {
          this.$router.push(activeName)
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      switchTabs(tab){
        var targetName = tab.$options.propsData.name
        this.$router.push({path:targetName})
      },
      logout(){
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      initPermissionTree(){
        var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if(loginInfo){
          var permissionTree = loginInfo.permissionTree;
          if(permissionTree){
            this.permissionTree = permissionTree;
          }
          this.user.code = loginInfo.userInfo.code;
          this.user.nickName = loginInfo.userInfo.nickName;
          this.user.realName = loginInfo.userInfo.realName;
          var roleNames = '';
          // if(loginInfo.roleList){
          //   for(var i=0;i<loginInfo.roleList.length;i++){
          //     roleNames += roleList[i].name;
          //     if(i<loginInfo.roleList.length-1){
          //       roleNames +=","
          //     }
          //   }
          // }
          this.user.roleNames = roleNames;
        }
      }
    }
  };
</script>
<style scoped>
  .el-header {
    background-color:#4183FF;
    color: #333;
    line-height: 60px;
    height: 65px;
    font-size: 16px !important;
  }
  .el-aside {
    width: 194px !important;
    height: 100%;
    color: #333;
    z-index: 100;
  }
  .el-menu-item{
    font-size: 14px;
    color: #4A4A4A;
  }
  .is-active{
    font-size: 14px;
    color:#409EFF;
  }
  .child-menu{
    font-size: 14px !important;
    padding-left: 36px !important;
  }

  .logo{
    font-size: 32px;
    color: #FFFFFF;
  }
  .main-button{
    background-color: #4183FF;
    border: solid 1px #fff;
    color:#fff;
    width:80px;
    height:30px;
    border-radius: 2px;
  }
  .main-button:hover{
    background-color: #0B5DFF;
  }
  .usr-info{
    color: #ffffff;
  }
  .tgl-order{
    margin-top: 0.2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .asideClose{
    width: 64px !important;
  }
  .el-main{
    padding:0;
  }
  .el-button .el-button--primary .el-button--small{
    color: #fff !important;
    background-color: #4183FF !important;
    border-color: #fff !important;
    border: solid 1px #fff !important;
  }
  .header-bg{
    position: absolute;
    z-index: 98;
    width: 100%;
    height: 30px;
    background-color: #fff;
  }
  .el-submenu .el-menu-item{
    min-width: 100%;
  }
  a:hover{
    text-decoration: none;
  }
  .index-container .el-tabs__header {
    padding: 0;
    position: absolute;
    margin-left: -194px;
    z-index: 99;
    background-color: #fff;
    width:100%;
  }
  .index-container .el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    position: relative;
    margin-left: 194px;
  }
  .index-container .el-tabs__content {
    overflow: hidden;
    position: relative;
    padding-top: 48px;
  }
  .sub-title{
    padding-left: 76px;
  }
  a:-webkit-any-link{
    text-decoration: none;
  }
  .welcome{
    text-align: center;
    color: #ffffff;
  }
  .box-card {
    width: 218px;
    height: 205px;
    background-color: #e4e7ed;
    margin-left: -1px;
  }
</style>
