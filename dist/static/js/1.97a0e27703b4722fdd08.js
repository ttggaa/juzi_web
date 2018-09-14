webpackJsonp([1],{dAjm:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"ElRow",componentName:"ElRow",props:{tag:{type:String,default:"div"},gutter:Number,type:String,justify:{type:String,default:"start"},align:{type:String,default:"top"}},computed:{style(){const t={};return this.gutter&&(t.marginLeft=`-${this.gutter/2}px`,t.marginRight=t.marginLeft),t}},render(t){return t(this.tag,{class:["el-row","start"!==this.justify?`is-justify-${this.justify}`:"","top"!==this.align?`is-align-${this.align}`:"",{"el-row--flex":"flex"===this.type}],style:this.style},this.$slots.default)}},n={name:"ElCol",props:{span:{type:Number,default:24},tag:{type:String,default:"div"},offset:Number,pull:Number,push:Number,xs:[Number,Object],sm:[Number,Object],md:[Number,Object],lg:[Number,Object],xl:[Number,Object]},computed:{gutter(){let t=this.$parent;for(;t&&"ElRow"!==t.$options.componentName;)t=t.$parent;return t?t.gutter:0}},render(t){let e=[],i={};return this.gutter&&(i.paddingLeft=this.gutter/2+"px",i.paddingRight=i.paddingLeft),["span","offset","pull","push"].forEach(t=>{(this[t]||0===this[t])&&e.push("span"!==t?`el-col-${t}-${this[t]}`:`el-col-${this[t]}`)}),["xs","sm","md","lg","xl"].forEach(t=>{if("number"==typeof this[t])e.push(`el-col-${t}-${this[t]}`);else if("object"==typeof this[t]){let i=this[t];Object.keys(i).forEach(s=>{e.push("span"!==s?`el-col-${t}-${s}-${i[s]}`:`el-col-${t}-${i[s]}`)})}}),t(this.tag,{class:["el-col",e],style:i},this.$slots.default)}},a={name:"ElButton",inject:{elForm:{default:""},elFormItem:{default:""}},props:{type:{type:String,default:"default"},size:String,icon:{type:String,default:""},nativeType:{type:String,default:"button"},loading:Boolean,disabled:Boolean,plain:Boolean,autofocus:Boolean,round:Boolean,circle:Boolean},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},buttonSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},buttonDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},methods:{handleClick:function(t){this.$emit("click",t)}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"el-button",class:[t.type?"el-button--"+t.type:"",t.buttonSize?"el-button--"+t.buttonSize:"",{"is-disabled":t.buttonDisabled,"is-loading":t.loading,"is-plain":t.plain,"is-round":t.round,"is-circle":t.circle}],attrs:{disabled:t.buttonDisabled||t.loading,autofocus:t.autofocus,type:t.nativeType},on:{click:t.handleClick}},[t.loading?i("i",{staticClass:"el-icon-loading"}):t._e(),t._v(" "),t.icon&&!t.loading?i("i",{class:t.icon}):t._e(),t._v(" "),t.$slots.default?i("span",[t._t("default")],2):t._e()])},staticRenderFns:[]},o=i("vSla")(a,l,!1,null,null,null).exports,r={render:function(){var t=this.$createElement;return(this._self._c||t)("main",{staticClass:"el-main"},[this._t("default")],2)},staticRenderFns:[]},u=i("vSla")({name:"ElMain",componentName:"ElMain"},r,!1,null,null,null).exports,c={name:"ElContainer",componentName:"ElContainer",props:{direction:String},computed:{isVertical:function(){return"vertical"===this.direction||"horizontal"!==this.direction&&(!(!this.$slots||!this.$slots.default)&&this.$slots.default.some(function(t){var e=t.componentOptions&&t.componentOptions.tag;return"el-header"===e||"el-footer"===e}))}}},d={render:function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"el-container",class:{"is-vertical":this.isVertical}},[this._t("default")],2)},staticRenderFns:[]},h={components:{ElContainer:i("vSla")(c,d,!1,null,null,null).exports,ElMain:u,ElButton:o,ElCol:n,ElRow:s},data:function(){return{tabMenus:[],isCollapse:!1,editableTabsValue:"",editableTabs:[],tabIndex:2,options:[],value:"",permissionTree:{},user:{code:"",nickName:"",realName:"",roleNames:""}}},mounted:function(){this.tabMenus=this.$store.state.menuNo,this.autodivheight(),window.onresize=this.autodivheight,this.initPermissionTree()},computed:{},methods:{autodivheight:function(){var t=0;window.innerHeight?t=window.innerHeight:document.body&&document.body.clientHeight&&(t=document.body.clientHeight),document.documentElement&&document.documentElement.clientHeight&&(t=document.documentElement.clientHeight),document.getElementById("container").style.height=t+"px",document.getElementsByClassName("el-menu-vertical")[0].style.height=t-60+"px"},tglShow:function(){var t=this;this.isCollapse=!this.isCollapse,this.isCollapse||setTimeout(function(){t.autodivheight()},500)},addTab:function(t,e){var i=event.currentTarget.getAttribute("data"),s=event.currentTarget.getAttribute("name"),n=this.editableTabs,a=!0;this.$store.commit("changeSys",t),this.$store.commit("changeMenu",e),n.forEach(function(t,e){t.name===i&&(a=!1)}),a&&this.editableTabs.push({title:s,name:i}),this.editableTabsValue=i},removeTab:function(t){var e=this.editableTabs,i=this.editableTabsValue;i===t&&e.forEach(function(s,n){if(s.name===t){var a=e[n+1]||e[n-1];a&&(i=a.name)}}),1==e.length?this.$router.push("/"):this.$router.push(i),this.editableTabsValue=i,this.editableTabs=e.filter(function(e){return e.name!==t})},switchTabs:function(t){var e=t.$options.propsData.name;this.$router.push({path:e})},logout:function(){localStorage.removeItem("token"),this.$router.push("/login")},initPermissionTree:function(){var t=JSON.parse(localStorage.getItem("loginInfo"));if(t){var e=t.permissionTree;e&&(this.permissionTree=e),this.user.code=t.userInfo.code,this.user.nickName=t.userInfo.nickName,this.user.realName=t.userInfo.realName;this.user.roleNames=""}}}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",{attrs:{id:"container"}},[s("el-header",[s("el-row",[s("el-col",{attrs:{span:18}},[s("span",{staticClass:"logo"},[t._v("新零售后台管理系统  "),s("span",{staticStyle:{"font-size":"28px"}})])]),t._v(" "),s("el-col",{attrs:{span:4}}),t._v(" "),s("el-col",{attrs:{span:1}},[s("el-button",{staticClass:"main-button",attrs:{type:"primary",size:"small"},on:{click:t.logout}},[t._v("退出")]),t._v(" "),s("svg",{staticClass:"icon",attrs:{"data-v-7908b6e3":"","aria-hidden":"true"}},[s("use",{attrs:{"data-v-7908b6e3":"","xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#icon-tuichudenglu"}})])],1)],1)],1),t._v(" "),s("el-container",{staticClass:"index-container"},[s("el-aside",{class:{asideClose:t.isCollapse}},[s("el-card",{staticClass:"box-card"},[s("img",{staticStyle:{"border-radius":"50%","margin-left":"25px"},attrs:{src:i("rtF3"),height:"80",width:"80"}}),t._v(" "),s("p",{staticClass:"titleP"},[s("span",[t._v(t._s(t.user.realName))]),s("br"),t._v(" "),s("span",[t._v(t._s(t.user.nickName))]),s("br"),t._v(" "),s("span",{staticStyle:{"font-size":"8px"}},[t._v(t._s(t.user.code))]),s("br"),t._v(" "),s("span",[t._v(t._s(t.user.roleNames))]),s("br")])]),t._v(" "),s("el-menu",{staticClass:"el-menu-vertical",attrs:{collapse:t.isCollapse}},[s("div",{staticClass:"tgl-order",on:{click:t.tglShow}},[t.isCollapse?s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-daohangzhankai"}})]):s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-daohangzhedie"}})])]),t._v(" "),t._l(t.permissionTree.children,function(e){return t.permissionTree.children?s("div",{key:e.id},["branch"==e.type?s("el-submenu",{attrs:{index:e.id+""}},[s("template",{slot:"title"},[s("i",{staticClass:"el-icon-document"}),t._v(" "),s("span",{staticStyle:{"font-size":"12px"}},[t._v(t._s(e.label))])]),t._v(" "),t._l(e.children,function(i){return e.children?s("div",{key:i.id},[s("router-link",{attrs:{to:i.url}},["leaf"==i.type?s("el-menu-item",{attrs:{index:i.id+"",data:i.url,name:i.label},on:{click:function(e){t.addTab(e)}}},[s("i",{class:i.icon}),t._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(i.label))])]):t._e()],1)],1):t._e()})],2):t._e()],1):t._e()})],2)],1),t._v(" "),s("el-main",[s("el-tabs",{attrs:{type:"card",closable:""},on:{"tab-click":t.switchTabs,"tab-remove":t.removeTab},model:{value:t.editableTabsValue,callback:function(e){t.editableTabsValue=e},expression:"editableTabsValue"}},[t._l(t.editableTabs,function(t,e){return s("el-tab-pane",{key:t.name,attrs:{label:t.title,name:t.name}})}),t._v(" "),"/index"==this.$route.path?s("div",{staticClass:"welcome"},[s("h2",[t._v("欢迎使用，系统初始化平台")])]):t._e(),t._v(" "),s("router-view")],2)],1)],1)],1)},staticRenderFns:[]};var p=i("vSla")(h,m,!1,function(t){i("ncN/")},"data-v-1f60ea8a",null);e.default=p.exports},"ncN/":function(t,e){},rtF3:function(t,e,i){t.exports=i.p+"static/img/sf.f78611f.jpg"}});