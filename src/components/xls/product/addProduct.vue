<template>
    <div class="category">
      <contentHeader :queryTitle="`基本信息`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-col :offset="1" :span="15">
          <el-form label-width="220px">
            <el-form-item label="店铺名称">
              <el-select v-model="addForm.sellerId" filterable remote :remote-method="querySellerOptions" clearable placeholder="请选择店铺类型" style="width: 100%;">
                <el-option
                  v-for="item in options.seller"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品类">
              <el-select v-model="addForm.productCateId" filterable clearable placeholder="请选择品类" style="width: 100%;">
                <el-option
                  v-for="item in options.cate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌">
              <el-select v-model="addForm.productBrandId" filterable clearable placeholder="请选择品牌" style="width: 100%;">
                <el-option
                  v-for="item in options.brand"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input maxlength="30" type="text" v-model="addForm.name1"></el-input>
            </el-form-item>
            <el-form-item label="商品短标题">
              <el-input maxlength="30" v-model="addForm.shortName" type="text" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input maxlength="30" v-model="addForm.keyword" type="text" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="售价">
              <el-input type="text" maxlength="30" v-model="addForm.mallPcPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="货源描述">
              <el-input type="text" maxlength="30" v-model="addForm.sourceDescription" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品标识">
              <el-select v-model="addForm.identification" placeholder="请选择">
                <el-option
                  v-for="item in options.identification"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <contentHeader :queryTitle="`商品详情`"></contentHeader>
      <el-row>
        <el-col :offset="1" :span="15">
          <el-form label-width="220px">
            <el-form-item style="margin: 2rem 0" label="商品描述">
              <el-input v-model="addForm.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 2rem" label="售后保障">
              <el-input v-model="addForm.afterSales" type="textarea"></el-input>
            </el-form-item>
            <!--<el-form-item label="商品图片">-->
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-preview="handlePreview"-->
                <!--:on-remove="handleRemove"-->
                <!--:file-list="fileList2"-->
                <!--list-type="picture">-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，图片建议像素(或保持比例):宽800x高800</div>-->
              <!--</el-upload>-->
            <!--</el-form-item>-->
            <el-form-item label="">
              <el-button @click="()=>{type=='0'?add():update()}" type="primary">提交</el-button>
              <router-link to="/allProduct">
                <el-button>返回</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import contentHeader from '../../contentHeader'
    export default {
        data() {
            return {
              type: '0',//0新增  1修改
              addForm: {
                id: '',
                sellerId: '',
                productCateId: '',
                productBrandId: '',
                name1: '',
                shortName: '',
                keyword: '',
                mallPcPrice: '',
                sourceDescription: '',
                identification: '',
                description: '',
                afterSales: ''
              },
              options: {
                seller: [],
                cate: [],
                brand: [],
                identification: [
                  {value: 0, label: '一期健身'},
                  {value: 1, label: '二期店中店商'},
                  {value: 2, label: '三期网约车'},
                ]
              },
              optionsExtend: {
                cateClean: true,
                brandClean: true
              }
            }
        },
        props: {
            // 父组件传过来的值
            someValue: String
        },
        components: {
            // 引入其他组件
          contentHeader,
        },
        beforeCreate: function () {
            // 组件创建前
        },
        created: function () {
            // 组件创建时执行
        },
        beforeMount: function () {
        },
        mounted: function () {
            // 组件挂载结束
          this.init();
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
        watch: {
          'addForm.sellerId': function (val) {
            if(this.optionsExtend.cateClean == true){
              this.addForm.productCateId = '';
            }
            if(val){
              this.initCateOptions(val);
            }else{
              this.options.cate = [];
            }
          },
          'addForm.productCateId': function (val) {
            if(this.optionsExtend.brandClean == true){
              this.addForm.productBrandId = '';
            }
            if(val){
              this.initBrandOptions(val);
            }else{
              this.options.brand = [];
            }
          }
        },
        methods: {
            // 自定义方法
          init(){
            this.type = this.$route.params.type;
            // 新增
            if(this.type == '0'){

            }
            // 修改
            if(this.type == '1'){
              this.addForm.id = this.$route.params.id;
              this.queryById();
            }
          },
          reset(){

          },
          handleClose(){

          },
          queryById(){
            this.$axios.HttpGet('/api/goods/' + this.addForm.id,
              {}
            )
              .then((data) => {
                var item=  data.data;
                this.optionsExtend.brandClean = false;
                this.optionsExtend.cateClean = false;
                this.addForm.sellerId = item.sellerId;
                this.querySellerOptionsById(item.sellerId);
                this.addForm.productCateId = item.productCateId;
                this.addForm.productBrandId = item.productBrandId ;
                this.addForm.name1 = item.name1;
                this.addForm.shortName = item.shortName;
                this.addForm.keyword = item.keyword;
                this.addForm.mallPcPrice = item.mallPcPrice;
                this.addForm.sourceDescription = item.sourceDescription;
                this.addForm.identification = item.identification;
                this.addForm.description = item.description;
                this.addForm.afterSales = item.afterSales;
              });
          },
          add(){
            this.$axios.HttpPost('/api/goods/add',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'新增成功'
                });
                window.location.href = "#/allProduct";
              });
          },
          update(){
            this.$axios.HttpPut('/api/goods/update',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功'
                });
                window.location.href = "#/allProduct";
              });
          },
          initCateOptions(val) {
            this.$axios.HttpGet('/api/product/cate/options/by/'+val,
              {}
            )
              .then((data) => {
                this.options.cate = data.data;
                this.optionsExtend.cateClean = true;
              });
          },
          initBrandOptions(val) {
            this.$axios.HttpGet('/api/product/brand/options/'+val,
              {}
            )
              .then((data) => {
                this.options.brand = data.data;
                this.optionsExtend.brandClean = true;
              });
          },
          querySellerOptions(query) {
            if(query !== ''){
              this.$axios.HttpGet('/api/seller/options?name='+query,
                {}
              )
                .then((data) => {
                  this.loading = false;
                  this.options.seller = data.data;
                });
            }
          },
          querySellerOptionsById(id) {
            if(id){
              this.$axios.HttpGet('/api/seller/options?id='+id,
                {}
              )
                .then((data) => {
                  this.loading = false;
                  this.options.seller = data.data;
                });
            }
          },
        }
    }
</script>
<style scoped>
  .product-btn .el-button--info{
    width: 88px;
    background-color: #E8E8E8;
    border-color: #E8E8E8;
    color: #4A4A4A;
  }
  .product-btn .el-button--info:hover{
    width: 88px;
    background-color: #4a83ff;
    border-color: #4a83ff;
    color: #fff;
  }
  .list{
    margin-top: .5rem;
  }
  .category .el-form-item{
    margin-bottom:0;
  }
</style>
