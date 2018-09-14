<template>
    <div>
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="110px" :model="queryForm">
          <el-col :span="6">
            <el-form-item label="商户名称">
              <el-input maxlength="20" v-model="queryForm.sellerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="6" style="padding-top:5px;">
            <el-button @click="queryList" size="mini" type="info">查询</el-button>
            <el-button @click="open(null)" size="mini" type="info">新增</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
        <!--<contentHeader :queryTitle="`用户列表`"></contentHeader>-->
        <el-row>
          <el-table
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              prop="sellerName"
              label="商户名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="settlePoint"
              label="扣点比例(%)"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="180"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="open(scope.row)" type="primary" size="mini">扣点设置</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="page-choose" type="flex" justify="center" align="middle">
          <el-pagination
            :page-size="queryForm.pageSize"
            @current-change="handleCurrentChange"
            :current-page="this.queryForm.pageNum"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>
        <el-dialog
          :title="type=='0'?'新增':'扣点设置'"
          :visible.sync="dialogVisible"
          :before-close="handleClose">
          <el-row>
            <el-form label-width="120px">
              <el-col :span="24">
                <el-form-item label="商户名称">
                  <el-select v-model="addForm.sellerId" filterable remote :remote-method="querySellerOptions" clearable placeholder="请选择店铺类型" style="width: 100%;">
                    <el-option
                      v-for="item in options.seller"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="扣点比例(%)">
                  <el-input v-model="addForm.settlePoint" type="number" placeholder="请输入扣点比例"></el-input>
                </el-form-item>

              </el-col>

            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{dialogVisible=false;type=='0'?add():update()}">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  import contentHeader from '../../contentHeader'
    export default {
        data() {
            return {
              type:'0',//0 新增 1修改
              value:'',
              dialogVisible:false,
              options:{
                seller: []
              },
              totalPages:0,
              addForm:{
                id: '',
                sellerId:'',
                settlePoint:''
              },
              queryForm:{
                page:1,
                pageSize:10,
                sellerName:''
              },
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
          handleClose(){
            this.dialogVisible =false;
          },
          open(row){
            if(row){  // 修改
              this.type='1';
              this.dialogVisible=true;
              this.addForm.id = row.id;
              this.addForm.sellerId = row.sellerId;
              this.querySellerOptions2(this.addForm.sellerId);
              this.addForm.settlePoint = row.settlePoint;
            }else{  // 新增
              this.type='0';
              this.dialogVisible=true;
              this.addForm.id = '';
              this.addForm.sellerId='';
              this.addForm.settlePoint = '';
            }

          },
          add(){
            this.$axios.HttpPost('/api/SellerSettlePoint/create',
              this.addForm,
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'新增成功'
                })
                this.queryList()
              });
          },
          update(){
            this.$axios.HttpPut('/api/SellerSettlePoint/update',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                this.queryList()
              });
          },
          reset(){

          },
          handleCurrentChange(val){
            this.queryForm.page = val
            this.queryList()
          },
          deleteById(id){
            this.$axios.HttpDel('/api/SellerSettlePoint/delete/'+id,
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.queryList()
              });
          },
          queryList(){
            this.$axios.HttpGet('/api/SellerSettlePoint/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          querySellerOptions(query) {
            if(query !== ''){
              this.$axios.HttpGet('/api/seller/options?name='+query,
                {}
              )
                .then((data) => {
                  this.options.seller = data.data;
                });
            }
          },
          querySellerOptions2(query) {
            if(query !== null){
              this.$axios.HttpGet('/api/seller/options?id='+query,
                {}
              )
                .then((data) => {
                  this.options.seller = data.data;
                });
            }
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
</style>
