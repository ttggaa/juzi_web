<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :span="4">
            <el-form-item label="品类名称">
              <el-input maxlength="30" v-model="queryForm.name" type="text" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否显示">
              <el-select v-model="queryForm.visible" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options.visible"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
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
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="品类名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="visible"
              label="是否显示"
              :formatter="visibleFmt"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
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
            :current-page="queryForm.pageNum"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>
        <el-dialog
          :title="type=='0'?'新增品类':'修改品类'"
          :visible.sync="dialogVisible">
          <el-form label-width="90px">
            <el-form-item label="品类名称">
              <el-input v-model="addForm.name" maxlength="20" placeholder="请输入品类名称"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-select v-model="addForm.visible" placeholder="请选择">
                <el-option
                  v-for="item in options.visible"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{dialogVisible=false; type=='0'?add():update()}">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import contentHeader from '../../contentHeader'
  import moment from 'moment'
    export default {
        data() {
            return {
              type:'0',//0 新增 1修改
              dialogVisible:false,
              dialogVisibleDel: false,
              tmpDelId: '',
              addForm:{
                id: '',
                name:'',
                visible:'',
              },
              queryForm:{
                page:1,
                pageSize:10,
                name:'',
                visible: ''
              },
              totalPages:0,
              tableData3: [],
              options:{
                visible:[
                  {value:1, label:'是'},
                  {value:2, label:'否'},
                ]
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
          open(row){
            if(row){  // 修改
              this.type='1';
              this.dialogVisible=true;
              this.addForm.id = row.id;
              this.addForm.name = row.name;
              this.addForm.visible = row.visible;
            }else{  // 新增
              this.type='0';
              this.dialogVisible=true;
              this.addForm.id = '';
              this.addForm.name = '';
              this.addForm.visible = '';
            }
          },
          add(){
            this.dialogVisible = false;
            this.$axios.HttpPost('/api/product/cate/create',
              this.addForm
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
            this.$axios.HttpPut('/api/product/cate/update',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功',
                });
                this.queryList();
              });
          },
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/product/cate/delete/'+ this.tmpDelId,
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
            this.$axios.HttpGet('/api/product/cate/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total;
                  this.tableData3 = data.data.list;
              });
          },
          visibleFmt(row, column) {
            return this.$OPTIONS(row.visible, this.options.visible);
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
