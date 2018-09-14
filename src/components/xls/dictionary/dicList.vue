<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :span="4">
            <el-form-item label="参数编码">
              <el-input maxlength="30" v-model="queryForm.dictCode" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="参数类型">
              <el-input maxlength="30" v-model="queryForm.dictType" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="参数名称">
              <el-input maxlength="30" v-model="queryForm.dictName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="创建人">
              <el-input maxlength="30" v-model="queryForm.createUser" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="padding-top:6px;margin-left:10px;">
            <el-button size="mini" type="info" @click="queryList">查询</el-button>
            <el-button @click="open(null)" size="mini" type="info">新增</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
        <el-row>
          <el-table
            :data="tableData3"
            size="mini"
            style="width: 100%">
            <el-table-column
              v-if="false"
              label="id"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
              prop="dictCode"
              label="参数编码"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dictType"
              label="参数类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dictName"
              label="参数名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dictVal"
              label="参数值"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="参数说明"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="创建人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="200"
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
          :title="type=='0'?'新增参数':'修改参数'"
          :visible.sync="dialogVisible">
          <el-form label-width="90px">
            <el-form-item label="参数编码">
              <el-input v-model="addForm.dictCode" placeholder="请输入参数编码"></el-input>
            </el-form-item>
            <el-form-item label="参数名称">
              <el-input v-model="addForm.dictName" placeholder="请输入参数名称"></el-input>
            </el-form-item>
            <el-form-item label="参数值">
              <el-input v-model="addForm.dictVal" placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-form-item label="参数类型">
              <el-input v-model="addForm.dictType" placeholder="请输入参数类型"></el-input>
            </el-form-item>
            <el-form-item label="参数说明">
              <el-input v-model="addForm.description" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="type=='0'?add():update()">确 定</el-button>
          </span>
        </el-dialog>
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
              type:"0",//0新增 1修改
              addForm:{
                id: '',
                dictCode:'',
                dictType:'',
                dictName:'',
                dictVal:'',
                description:'',
              },
              queryForm:{
                page:1,
                pageSize:10,
                createUser:'',
                dictCode:'',
                dictName:'',
                dictType:''
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
          open(row){
            if(row){  // 修改
              this.type='1';
              this.dialogVisible=true;
              this.addForm.id = row.id;
              this.addForm.dictCode = row.dictCode;
              this.addForm.dictType = row.dictType;
              this.addForm.dictName = row.dictName;
              this.addForm.dictVal = row.dictVal;
              this.addForm.description = row.description;
            }else{  // 新增
              this.type='0';
              this.dialogVisible=true;
              this.addForm.id = '';
              this.addForm.dictCode = '';
              this.addForm.dictType = '';
              this.addForm.dictName = '';
              this.addForm.dictVal = '';
              this.addForm.description = '';
            }
          },
          add(){
            this.dialogVisible=false
            this.$axios.HttpPost('/api/dictionary/create',
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
            this.dialogVisible=false
            this.$axios.HttpPut('/api/dictionary/update',
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
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/dictionary/delete/'+ this.tmpDelId,
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
            this.$axios.HttpGet('/api/dictionary/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
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
