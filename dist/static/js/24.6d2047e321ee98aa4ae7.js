webpackJsonp([24],{Lf9U:function(t,e){},TDJl:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Hzmg"),o={data:function(){return{dialogVisible:!1,dialogVisibleDel:!1,tmpDelId:"",type:"0",addForm:{id:"",dictCode:"",dictType:"",dictName:"",dictVal:"",description:""},queryForm:{page:1,pageSize:10,createUser:"",dictCode:"",dictName:"",dictType:""},totalPages:0,tableData3:[]}},props:{someValue:String},components:{contentHeader:a.a},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.queryList()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},computed:{},methods:{handleCurrentChange:function(t){this.queryForm.page=t,this.queryList()},open:function(t){t?(this.type="1",this.dialogVisible=!0,this.addForm.id=t.id,this.addForm.dictCode=t.dictCode,this.addForm.dictType=t.dictType,this.addForm.dictName=t.dictName,this.addForm.dictVal=t.dictVal,this.addForm.description=t.description):(this.type="0",this.dialogVisible=!0,this.addForm.id="",this.addForm.dictCode="",this.addForm.dictType="",this.addForm.dictName="",this.addForm.dictVal="",this.addForm.description="")},add:function(){var t=this;this.dialogVisible=!1,this.$axios.HttpPost("/api/dictionary/create",this.addForm).then(function(e){t.$message({type:"success",message:"新增成功"}),t.queryList()})},update:function(){var t=this;this.dialogVisible=!1,this.$axios.HttpPut("/api/dictionary/update",this.addForm).then(function(e){t.$message({type:"success",message:"修改成功"}),t.queryList()})},openDel:function(t){this.tmpDelId=t,this.dialogVisibleDel=!0},deleteById:function(){var t=this;this.$axios.HttpDel("/api/dictionary/delete/"+this.tmpDelId).then(function(e){t.$message({type:"success",message:"删除成功"}),t.tmpDelId="",t.dialogVisibleDel=!1,t.queryList()})},queryList:function(){var t=this;this.$axios.HttpGet("/api/dictionary/list",this.queryForm).then(function(e){t.totalPages=e.data.total,t.tableData3=e.data.list})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"category"},[i("contentHeader",{attrs:{queryTitle:"查询条件"}}),t._v(" "),i("el-row",{staticStyle:{"margin-top":"1rem"}},[i("el-form",{attrs:{"label-width":"90px"}},[i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"参数编码"}},[i("el-input",{attrs:{maxlength:"30",type:"text",clearable:""},model:{value:t.queryForm.dictCode,callback:function(e){t.$set(t.queryForm,"dictCode",e)},expression:"queryForm.dictCode"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"参数类型"}},[i("el-input",{attrs:{maxlength:"30",type:"text",clearable:""},model:{value:t.queryForm.dictType,callback:function(e){t.$set(t.queryForm,"dictType",e)},expression:"queryForm.dictType"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"参数名称"}},[i("el-input",{attrs:{maxlength:"30",type:"text",clearable:""},model:{value:t.queryForm.dictName,callback:function(e){t.$set(t.queryForm,"dictName",e)},expression:"queryForm.dictName"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"创建人"}},[i("el-input",{attrs:{maxlength:"30",type:"text",clearable:""},model:{value:t.queryForm.createUser,callback:function(e){t.$set(t.queryForm,"createUser",e)},expression:"queryForm.createUser"}})],1)],1),t._v(" "),i("el-col",{staticStyle:{"padding-top":"6px","margin-left":"10px"},attrs:{span:3}},[i("el-button",{attrs:{size:"mini",type:"info"},on:{click:t.queryList}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(e){t.open(null)}}},[t._v("新增")])],1)],1)],1),t._v(" "),i("div",{staticClass:"list"},[i("el-row",[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData3,size:"mini"}},[t._e(),t._v(" "),i("el-table-column",{attrs:{prop:"dictCode",label:"参数编码","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"dictType",label:"参数类型","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"dictName",label:"参数名称","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"dictVal",label:"参数值","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"description",label:"参数说明","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"createUser",label:"创建人","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{width:"200",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.open(e.row)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.openDel(e.row.id)}}},[t._v("删除")]),t._v(" "),i("el-dialog",{attrs:{title:"提示",visible:t.dialogVisibleDel,width:"30%","append-to-body":""},on:{"update:visible":function(e){t.dialogVisibleDel=e},close:function(e){t.dialogVisibleDel=!1}}},[i("span",[t._v("确定删除？")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisibleDel=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.deleteById}},[t._v("确 定")])],1)])]}}])})],1)],1),t._v(" "),i("el-row",{staticClass:"page-choose",attrs:{type:"flex",justify:"center",align:"middle"}},[i("el-pagination",{attrs:{"page-size":t.queryForm.pageSize,"current-page":t.queryForm.pageNum,layout:"total, prev, pager, next, jumper",total:t.totalPages},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"0"==t.type?"新增参数":"修改参数",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{attrs:{"label-width":"90px"}},[i("el-form-item",{attrs:{label:"参数编码"}},[i("el-input",{attrs:{placeholder:"请输入参数编码"},model:{value:t.addForm.dictCode,callback:function(e){t.$set(t.addForm,"dictCode",e)},expression:"addForm.dictCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"参数名称"}},[i("el-input",{attrs:{placeholder:"请输入参数名称"},model:{value:t.addForm.dictName,callback:function(e){t.$set(t.addForm,"dictName",e)},expression:"addForm.dictName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"参数值"}},[i("el-input",{attrs:{placeholder:"请输入参数值"},model:{value:t.addForm.dictVal,callback:function(e){t.$set(t.addForm,"dictVal",e)},expression:"addForm.dictVal"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"参数类型"}},[i("el-input",{attrs:{placeholder:"请输入参数类型"},model:{value:t.addForm.dictType,callback:function(e){t.$set(t.addForm,"dictType",e)},expression:"addForm.dictType"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"参数说明"}},[i("el-input",{attrs:{type:"textarea"},model:{value:t.addForm.description,callback:function(e){t.$set(t.addForm,"description",e)},expression:"addForm.description"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){"0"==t.type?t.add():t.update()}}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var r=i("vSla")(o,l,!1,function(t){i("Lf9U")},"data-v-2b27670b",null);e.default=r.exports}});