webpackJsonp([30],{"0haB":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"sysPermission2",props:["vm","pids","plabels"],data:function(){return{fn:"sysPermission",rootId:0,ids:"",labels:"",treeData:[],defaultExpandedKeys:[0],winBtnLoading:!1}},watch:{filterText:function(e){this.$refs.tree2.filter(e)}},methods:{filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},initTree:function(){var e=this;e.treeData=[],e.$AJAX.GET(this,e.fn+"/getTree",null,function(t){e.treeData.push(t.body.data),e.initNodes()})},initNodes:function(){var e=this;if(void 0!=this.pids||null!=this.pids){for(var t=this.pids.split(","),s=[],i=0;i<t.length;i++)s[i]=parseInt(t[i]);setTimeout(function(){e.$refs.tree2.setCheckedKeys(s)},500)}},handleCheckChange:function(e,t,s){for(var i=this.$refs.tree2.getCheckedNodes(),a="",n="",l=0;l<i.length;l++){var r=i[l];a+=r.id,n+=r.label,l<i.length-1&&(a+=",",n+=",")}this.ids=a,this.labels=n,this.vm.resourceIds=a}},mounted:function(){this.initTree()}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-row",[s("el-col",{attrs:{span:12}},[s("div",{staticStyle:{width:"98%","margin-left":"1%"}},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",{staticStyle:{"font-size":"14px"}},[s("i",{staticClass:"el-icon-menu"}),e._v(" 角色授权")])]),e._v(" "),s("div",{staticClass:"grid-content bg-purple",staticStyle:{height:"300px",overflow:"auto"}},[s("el-tree",{ref:"tree2",attrs:{data:e.treeData,"default-expanded-keys":e.defaultExpandedKeys,"filter-node-method":e.filterNode,"show-checkbox":"","node-key":"id","highlight-current":"",accordion:"",draggable:""},on:{"check-change":e.handleCheckChange}})],1)])],1)]),e._v(" "),s("el-col",{attrs:{span:12}},[s("div",{staticStyle:{width:"98%","margin-left":"1%"}},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",{staticStyle:{"font-size":"14px"}},[s("i",{staticClass:"el-icon-location"}),e._v(" 权限展示")])]),e._v(" "),s("div",{staticClass:"grid-content bg-purple",staticStyle:{height:"300px",overflow:"auto"}},[e._v("\n          "+e._s(e.labels)+"\n        ")])])],1)])],1)},staticRenderFns:[]},n=s("vSla")(i,a,!1,null,null,null);t.default=n.exports}});