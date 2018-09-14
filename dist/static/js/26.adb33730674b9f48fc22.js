webpackJsonp([26],{"00+Q":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});l("aozt");var a=l("Hzmg"),o={data:function(){return{type:"0",value:"",dialogVisible:!1,options:[],totalPages:0,addForm:{},queryForm:{page:1,pageSize:10},tableData3:[]}},props:{someValue:String},components:{contentHeader:a.a},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.queryList()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},computed:{},methods:{handleClose:function(){this.dialogVisible=!1},add:function(){},update:function(){},reset:function(){},handleCurrentChange:function(e){this.queryForm.page=e,this.queryList()},deleteById:function(e){},queryList:function(){}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("contentHeader",{attrs:{queryTitle:"查询条件"}}),e._v(" "),l("el-row",{staticStyle:{"margin-top":"1rem"}},[l("el-form",{attrs:{"label-width":"110px",model:e.queryForm}},[l("el-col",{attrs:{offset:1,span:5}},[l("el-form-item",{attrs:{label:"商家名称"}},[l("el-input",{attrs:{maxlength:"20",type:"text","auto-complete":"off"},model:{value:e.queryForm.name,callback:function(t){e.$set(e.queryForm,"name",t)},expression:"queryForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"打款状态"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.queryForm.enableFlag,callback:function(t){e.$set(e.queryForm,"enableFlag",t)},expression:"queryForm.enableFlag"}},[l("el-option",{attrs:{label:"全部",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"打款成功",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"打款失败",value:"2"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"业务流水号"}},[l("el-input",{attrs:{maxlength:"20",type:"text","auto-complete":"off"},model:{value:e.queryForm.name,callback:function(t){e.$set(e.queryForm,"name",t)},expression:"queryForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"类型"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.queryForm.enableFlag,callback:function(t){e.$set(e.queryForm,"enableFlag",t)},expression:"queryForm.enableFlag"}},[l("el-option",{attrs:{label:"全部",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"售后",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"打款",value:"2"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:5}},[l("el-form-item",{attrs:{label:"交易时间"}},[l("el-input",{attrs:{maxlength:"20",type:"text","auto-complete":"off"},model:{value:e.queryForm.name,callback:function(t){e.$set(e.queryForm,"name",t)},expression:"queryForm.name"}})],1)],1)],1)],1),e._v(" "),l("el-row",{staticClass:"product-btn"},[l("el-col",{attrs:{offset:1,span:3}},[l("el-button",{attrs:{size:"mini",type:"info"},on:{click:e.queryList}},[e._v("查询")])],1)],1),e._v(" "),l("div",{staticClass:"list"},[l("el-row",[l("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData3,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{type:"index",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{label:"业务流水号","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.name))]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"类型","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"交易金额","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"打款状态","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"商家名称","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"交易流水号","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"loginName",label:"交易时间","show-overflow-tooltip":""}})],1)],1),e._v(" "),l("el-row",{staticClass:"page-choose",attrs:{type:"flex",justify:"center",align:"middle"}},[l("el-pagination",{attrs:{"page-size":e.queryForm.pageSize,"current-page":this.queryForm.pageNum,layout:"total, prev, pager, next, jumper",total:e.totalPages},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),l("el-dialog",{attrs:{title:"0"==e.type?"新增品牌":"修改品牌",visible:e.dialogVisible,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-row",[l("el-form",{attrs:{"label-width":"90px"}},[l("el-col",{attrs:{span:10}},[l("el-form-item",{attrs:{label:"品牌名称"}},[l("el-input",{attrs:{placeholder:"请输入品牌名称"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"品牌首字母"}},[l("el-input",{attrs:{maxLenght:"1",placeholder:"请输入品牌首字母"},model:{value:e.addForm.nameFirst,callback:function(t){e.$set(e.addForm,"nameFirst",t)},expression:"addForm.nameFirst"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"排序号"}},[l("el-input",{attrs:{placeholder:"请输入排序号"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"品牌英文"}},[l("el-input",{attrs:{placeholder:"请输入品牌英文"},model:{value:e.addForm.englishName,callback:function(t){e.$set(e.addForm,"englishName",t)},expression:"addForm.englishName"}})],1)],1),e._v(" "),l("el-col",{attrs:{offset:2,span:12}},[l("el-form-item",{attrs:{label:"品牌别名"}},[l("el-input",{attrs:{placeholder:"请输入品牌别名"},model:{value:e.addForm.alias,callback:function(t){e.$set(e.addForm,"alias",t)},expression:"addForm.alias"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"展示方式"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[l("el-option",{attrs:{label:"电脑端",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"手机端",value:"1"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"是否推荐"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[l("el-option",{attrs:{label:"是",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"否",value:"1"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"关联品类"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[l("el-option",{attrs:{label:"是",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(){e.dialogVisible=!1,"0"==e.type?e.add():e.update()}}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var n=l("vSla")(o,r,!1,function(e){l("BOdL")},"data-v-0f7a793e",null);t.default=n.exports},BOdL:function(e,t){}});