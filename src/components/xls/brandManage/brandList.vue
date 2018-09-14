<template>
    <div>
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px" :model="queryForm">
          <el-col :offset="1" :span="4">
            <el-form-item label="品牌名称">
              <el-input maxlength="20" v-model="queryForm.name" type="text" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="品牌英文名">
              <el-input maxlength="20" v-model="queryForm.englishName" type="text" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否已删除">
              <el-select v-model="queryForm.state" filterable clearable placeholder="请选择品类" style="width: 100%;">
                <el-option label="是" value="4"></el-option>
                <el-option label="否" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="3">
            <el-button @click="queryList" size="mini" type="info">查询</el-button>
            <el-button @click="open(null)" size="mini" type="info">新增</el-button>
          </el-col>
        </el-form>
      </el-row>

      <div class="list">
        <el-row>
          <el-table
            :data="tableData3"
            stripe
            border
            height="500"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              v-if="false"
              prop="id"
              label="id"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="品牌名称"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="nameFirst"
              label="品牌首字母"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="englishName"
              label="品牌英文名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="cateId"
              label="关联品类"
              :formatter="cateFmt"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              label="是否删除"
              :formatter="stateFmt"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="180"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="open(scope.row)" type="primary" size="mini">修改</el-button>
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
            :current-page="queryForm.page"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>
        <el-dialog
          :title="type=='0'?'新增品牌':'修改品牌'"
          :visible.sync="dialogVisible"
          :before-close="handleClose">
          <el-row>
            <el-form label-width="90px">
              <el-col :span="24">
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
              </el-col>
              <el-col :span="24">
                <el-form-item label="品牌名称">
                  <el-input v-model="addForm.name" maxlength="50" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="品牌英文">
                  <el-input v-model="addForm.englishName" maxlength="50" placeholder="请输入品牌英文"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="品牌首字母">
                  <el-input maxlength="1" v-model="addForm.nameFirst" placeholder="请输入品牌首字母"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{dialogVisible=false; type=='0'?add():update()}">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  import moment from 'moment'
  import contentHeader from '../../contentHeader'
    export default {
        data() {
            return {
              type:'0',//0 新增 1修改
              dialogVisible:false,
              dialogVisibleDel: false,
              tmpDelId: '',
              totalPages:0,
              tableData3: [],
              addForm:{
                id:'',
                englishName:'',
                name:'',
                nameFirst:'',
                productCateId:''
              },
              queryForm:{
                page:1,
                pageSize:10,
                englishName:'',
                name:'',
                state:''
              },
              options: {
                state: [
                  // {value:0, label:'默认'},
                  // {value:1, label:'提交审核'},
                  // {value:2, label:'显示中'},
                  // {value:3, label:'审核失败'},
                  // {value:4, label:'删除'},
                  {value:0, label:'否'},
                  {value:1, label:'否'},
                  {value:2, label:'否'},
                  {value:3, label:'否'},
                  {value:4, label:'是'},
                ],
                brand: [],
                cate: []
              },
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
          this.queryList();
          this.initCateOptions();
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
              this.addForm.englishName = row.englishName;
              this.addForm.name = row.name;
              this.addForm.nameFirst = row.nameFirst;
              this.addForm.productCateId = row.cateId;
            }else{  // 新增
              this.type='0';
              this.dialogVisible=true;
              this.addForm.id = '';
              this.addForm.englishName = '';
              this.addForm.name = '';
              this.addForm.nameFirst = '';
              this.addForm.productCateId = '';
            }
          },
          add(){
            this.dialogVisible = false;
            this.$axios.HttpPost('/api/product/brand/create',
              this.addForm,
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'新增成功'
                });
                this.queryList();
              });
          },
          update(){
            this.dialogVisible = false;
            this.$axios.HttpPut('/api/product/brand/update',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功'
                });
                this.queryList();
              });
          },
          handleCurrentChange(val){
            this.queryForm.page = val
            this.queryList()
          },
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/product/brand/delete/'+ this.tmpDelId,
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
          queryList(){
            this.$axios.HttpGet('/api/product/brand/list',
              this.queryForm
            )
              .then((data) => {
                this.totalPages = data.data.total;
                this.tableData3 = data.data.list;
              });
          },
          initCateOptions() {
            this.$axios.HttpGet('/api/product/cate/options',
              {}
            )
              .then((data) => {
                this.options.cate = data.data;
              });
          },
          cateFmt(row, column) {
            return this.$OPTIONS(row.cateId, this.options.cate);
          },
          stateFmt(row, column) {
            return this.$OPTIONS(row.state, this.options.state);
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
