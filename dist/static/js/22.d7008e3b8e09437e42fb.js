webpackJsonp([22],{"26Eg":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});l("aozt");var a=l("Hzmg"),o={data:function(){return{type:"0",value:"",dialogVisible:!1,options:{levelType:[{value:0,label:"国家级"},{value:1,label:"省级"},{value:2,label:"市级"},{value:3,label:"区县级"}]},totalPages:0,queryForm:{page:1,pageSize:10,areaId:"",areaName:"",cityCode:"",zipCode:"",createUser:"",parentName:"",levelType:""},tableData3:[]}},props:{someValue:String},components:{contentHeader:a.a},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.queryList()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},computed:{},methods:{handleClose:function(){this.dialogVisible=!1},reset:function(){},handleCurrentChange:function(e){this.queryForm.page=e,this.queryList()},queryList:function(){var e=this;this.$axios.HttpGet("/api/areas/list",this.queryForm).then(function(t){e.totalPages=t.data.total,e.tableData3=t.data.list})},levelTypeFmt:function(e,t){return this.$OPTIONS(e.levelType,this.options.levelType)}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("contentHeader",{attrs:{queryTitle:"查询条件"}}),e._v(" "),l("el-row",{staticStyle:{"margin-top":"1rem"}},[l("el-form",{attrs:{"label-width":"90px",model:e.queryForm}},[l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"地区编码"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.areaId,callback:function(t){e.$set(e.queryForm,"areaId",t)},expression:"queryForm.areaId"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"地区名称"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.areaName,callback:function(t){e.$set(e.queryForm,"areaName",t)},expression:"queryForm.areaName"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"地区级别"}},[l("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.queryForm.levelType,callback:function(t){e.$set(e.queryForm,"levelType",t)},expression:"queryForm.levelType"}},e._l(e.options.levelType,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"邮编"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.zipCode,callback:function(t){e.$set(e.queryForm,"zipCode",t)},expression:"queryForm.zipCode"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"区号"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.cityCode,callback:function(t){e.$set(e.queryForm,"cityCode",t)},expression:"queryForm.cityCode"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"创建人"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.createUser,callback:function(t){e.$set(e.queryForm,"createUser",t)},expression:"queryForm.createUser"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"上级地区"}},[l("el-input",{attrs:{maxlength:"20",type:"text",clearable:""},model:{value:e.queryForm.parentName,callback:function(t){e.$set(e.queryForm,"parentName",t)},expression:"queryForm.parentName"}})],1)],1),e._v(" "),l("el-col",{attrs:{offset:1,span:3}},[l("el-button",{attrs:{size:"mini",type:"info"},on:{click:e.queryList}},[e._v("查询")])],1)],1)],1),e._v(" "),l("div",{staticClass:"list"},[l("el-row",[l("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData3,"tooltip-effect":"dark",size:"mini"}},[l("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"left",prop:"areaId",label:"地区编码",width:"100","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{fixed:"left",prop:"areaName",label:"地区名称",width:"180","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"parentName",label:"上级地区",width:"180","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"mergerName",label:"地区全名",width:"300","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"shortName",label:"短名称",width:"150","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"mergerShortName",label:"全名短名称",width:"300","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"levelType",label:"地区级别",formatter:e.levelTypeFmt,width:"100","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"cityCode",label:"区号","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"zipCode",label:"邮编",width:"100","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"pinyin",label:"拼音",width:"200","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"jianpin",label:"简拼",width:"100","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"firstChar",label:"首字母",width:"100","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"lng",label:"经度",width:"150","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"lat",label:"纬度",width:"150","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"createUser",label:"创建人",width:"100","show-overflow-tooltip":""}})],1)],1),e._v(" "),l("el-row",{staticClass:"page-choose",attrs:{type:"flex",justify:"center",align:"middle"}},[l("el-pagination",{attrs:{"page-size":e.queryForm.pageSize,"current-page":e.queryForm.page,layout:"total, prev, pager, next, jumper",total:e.totalPages},on:{"current-change":e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var i=l("vSla")(o,r,!1,function(e){l("p8Zn")},"data-v-3373fb36",null);t.default=i.exports},p8Zn:function(e,t){}});