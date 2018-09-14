<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :span="5">
            <el-form-item label="商品分类">
              <el-input maxlength="30" v-model="queryForm.productCateName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品品牌">
              <el-input maxlength="30" v-model="queryForm.productBrandName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品名称">
              <el-input maxlength="30" type="text" v-model="queryForm.productName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品状态">
              <el-select v-model="queryForm.productStatus" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options.state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商家名称">
              <el-input maxlength="30" v-model="queryForm.sellerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="5" style="padding-top:10px;">
            <el-button size="mini" type="info" @click="queryList">查询</el-button>
            <router-link to="/addProduct/0/0">
              <el-button size="mini" type="info">新增</el-button>
            </router-link>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
        <!--<contentHeader :queryTitle="`角色列表`"></contentHeader>-->
        <el-row>
          <el-table
            :data="tableData3"
            tooltip-effect="dark"
            size="mini"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              v-if="false"
              prop="id"
              label="ID"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="name1"
              label="商品名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerName"
              label="商家名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productCateName"
              label="商品分类"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productBrandName"
              label="商品品牌"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="mallPcPrice"
              :formatter="mallPcPriceFmt"
              label="售价"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productCateState"
              :formatter="statusFmt"
              label="商品状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <router-link :to="'/addProduct/1/' + scope.row.id">
                  <el-button type="primary" size="mini">修改</el-button>
                </router-link>
                <el-button type="danger" @click="openDel(scope.row.id)" size="mini">删除</el-button>
                <el-dialog title="提示" :visible.sync="dialogVisibleDel" @close="dialogVisibleDel = false" width="30%" append-to-body>
                  <span>确定删除？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleDel = false" >取 消</el-button>
                    <el-button type="primary" @click="deleteById">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="page-choose" type="flex" justify="center" align="middle">
          <el-pagination
            :page-size="queryForm.pageSize"
            @current-change="handleCurrentChange"
            :current-page="queryForm.pageNum"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>
      </div>
    </div>
</template>
<script>
  import contentHeader from '../../contentHeader'
    export default {
        data() {
            return {
              dialogVisible:false,
              dialogVisibleDel: false,
              tmpDelId: '',
              value:"",
              options: {
                state: [
                  {value:1, label:'刚创建'},
                  {value:2, label:'提交审核'},
                  {value:3, label:'审核通过'},
                  {value:4, label:'申请驳回'},
                  {value:5, label:'商品删除'},
                  {value:6, label:'上架'},
                  {value:7, label:'下架'}
                ],
                brand: [],
                cate: []
              },
              addForm:{
                name:'',
                visible:'',
              },
              queryForm:{
                page:1,
                pageSize:10,
                productCateName: '',
                productBrandName: '',
                productName: '',
                productStatus: '',
                sellerName: ''
              },
              totalPages:0,
              tableData3: [],
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
          this.queryList()
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
          handleCurrentChange(val){
            //分页翻页
            this.queryForm.page = val
            this.queryList()
          },

          reset(){

          },
          handleClose(){

          },
          queryList(){
            this.$axios.HttpGet('/api/goods/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/goods/delete/'+ this.tmpDelId,
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'删除成功'
                });
                this.tmpDelId = '';
                this.dialogVisibleDel = false;
                this.queryList();
              });
          },
          statusFmt(row, column) {
            return this.$OPTIONS(row.state, this.options.state);
          },
          mallPcPriceFmt(row, column) {
            return this.$MONEY_FORMAT(row.mallPcPrice, 2, '.', ',','￥');
          }
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
