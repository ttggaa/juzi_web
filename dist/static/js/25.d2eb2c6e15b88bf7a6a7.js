webpackJsonp([25],{oAGF:function(t,e){},vP8U:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("Hzmg"),r={data:function(){return{type:"0",addForm:{id:"",sellerId:"",productCateId:"",productBrandId:"",name1:"",shortName:"",keyword:"",mallPcPrice:"",sourceDescription:"",identification:"",description:"",afterSales:""},options:{seller:[],cate:[],brand:[],identification:[{value:0,label:"一期健身"},{value:1,label:"二期店中店商"}]},optionsExtend:{cateClean:!0,brandClean:!0}}},props:{someValue:String},components:{contentHeader:o.a},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.init()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},computed:{},watch:{"addForm.sellerId":function(t){1==this.optionsExtend.cateClean&&(this.addForm.productCateId=""),t?this.initCateOptions(t):this.options.cate=[]},"addForm.productCateId":function(t){1==this.optionsExtend.brandClean&&(this.addForm.productBrandId=""),t?this.initBrandOptions(t):this.options.brand=[]}},methods:{init:function(){this.type=this.$route.params.type,this.type,"1"==this.type&&(this.addForm.id=this.$route.params.id,this.queryById())},reset:function(){},handleClose:function(){},queryById:function(){var t=this;this.$axios.HttpGet("/api/goods/"+this.addForm.id,{}).then(function(e){var a=e.data;t.optionsExtend.brandClean=!1,t.optionsExtend.cateClean=!1,t.addForm.sellerId=a.sellerId,t.querySellerOptionsById(a.sellerId),t.addForm.productCateId=a.productCateId,t.addForm.productBrandId=a.productBrandId,t.addForm.name1=a.name1,t.addForm.shortName=a.shortName,t.addForm.keyword=a.keyword,t.addForm.mallPcPrice=a.mallPcPrice,t.addForm.sourceDescription=a.sourceDescription,t.addForm.identification=a.identification,t.addForm.description=a.description,t.addForm.afterSales=a.afterSales})},add:function(){var t=this;this.$axios.HttpPost("/api/goods/add",this.addForm).then(function(e){t.$message({type:"success",message:"新增成功"}),window.location.href="#/allProduct"})},update:function(){var t=this;this.$axios.HttpPut("/api/goods/update",this.addForm).then(function(e){t.$message({type:"success",message:"修改成功"}),window.location.href="#/allProduct"})},initCateOptions:function(t){var e=this;this.$axios.HttpGet("/api/product/cate/options/by/"+t,{}).then(function(t){e.options.cate=t.data,e.optionsExtend.cateClean=!0})},initBrandOptions:function(t){var e=this;this.$axios.HttpGet("/api/product/brand/options/"+t,{}).then(function(t){e.options.brand=t.data,e.optionsExtend.brandClean=!0})},querySellerOptions:function(t){var e=this;""!==t&&this.$axios.HttpGet("/api/seller/options?name="+t,{}).then(function(t){e.loading=!1,e.options.seller=t.data})},querySellerOptionsById:function(t){var e=this;t&&this.$axios.HttpGet("/api/seller/options?id="+t,{}).then(function(t){e.loading=!1,e.options.seller=t.data})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category"},[a("contentHeader",{attrs:{queryTitle:"基本信息"}}),t._v(" "),a("el-row",{staticStyle:{"margin-top":"1rem"}},[a("el-col",{attrs:{offset:1,span:15}},[a("el-form",{attrs:{"label-width":"220px"}},[a("el-form-item",{attrs:{label:"店铺名称"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"","remote-method":t.querySellerOptions,clearable:"",placeholder:"请选择店铺类型"},model:{value:t.addForm.sellerId,callback:function(e){t.$set(t.addForm,"sellerId",e)},expression:"addForm.sellerId"}},t._l(t.options.seller,function(t){return a("el-option",{key:t.label,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"品类"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",placeholder:"请选择品类"},model:{value:t.addForm.productCateId,callback:function(e){t.$set(t.addForm,"productCateId",e)},expression:"addForm.productCateId"}},t._l(t.options.cate,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"品牌"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",placeholder:"请选择品牌"},model:{value:t.addForm.productBrandId,callback:function(e){t.$set(t.addForm,"productBrandId",e)},expression:"addForm.productBrandId"}},t._l(t.options.brand,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{maxlength:"30",type:"text"},model:{value:t.addForm.name1,callback:function(e){t.$set(t.addForm,"name1",e)},expression:"addForm.name1"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商品短标题"}},[a("el-input",{attrs:{maxlength:"30",type:"text","auto-complete":"off"},model:{value:t.addForm.shortName,callback:function(e){t.$set(t.addForm,"shortName",e)},expression:"addForm.shortName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关键字"}},[a("el-input",{attrs:{maxlength:"30",type:"text","auto-complete":"off"},model:{value:t.addForm.keyword,callback:function(e){t.$set(t.addForm,"keyword",e)},expression:"addForm.keyword"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"售价"}},[a("el-input",{attrs:{type:"text",maxlength:"30","auto-complete":"off"},model:{value:t.addForm.mallPcPrice,callback:function(e){t.$set(t.addForm,"mallPcPrice",e)},expression:"addForm.mallPcPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"货源描述"}},[a("el-input",{attrs:{type:"text",maxlength:"30","auto-complete":"off"},model:{value:t.addForm.sourceDescription,callback:function(e){t.$set(t.addForm,"sourceDescription",e)},expression:"addForm.sourceDescription"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商品标识"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.addForm.identification,callback:function(e){t.$set(t.addForm,"identification",e)},expression:"addForm.identification"}},t._l(t.options.identification,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1)],1)],1),t._v(" "),a("contentHeader",{attrs:{queryTitle:"商品详情"}}),t._v(" "),a("el-row",[a("el-col",{attrs:{offset:1,span:15}},[a("el-form",{attrs:{"label-width":"220px"}},[a("el-form-item",{staticStyle:{margin:"2rem 0"},attrs:{label:"商品描述"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.addForm.description,callback:function(e){t.$set(t.addForm,"description",e)},expression:"addForm.description"}})],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"2rem"},attrs:{label:"售后保障"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.addForm.afterSales,callback:function(e){t.$set(t.addForm,"afterSales",e)},expression:"addForm.afterSales"}})],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:function(){"0"==t.type?t.add():t.update()}}},[t._v("提交")]),t._v(" "),a("router-link",{attrs:{to:"/allProduct"}},[a("el-button",[t._v("返回")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var n=a("vSla")(r,l,!1,function(t){a("oAGF")},"data-v-22377bd9",null);e.default=n.exports}});