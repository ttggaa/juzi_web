<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-form label-width="90px">
        <el-row style="margin-top: 1rem">
          <el-col :span="5">
            <el-form-item label="环节标识">
              <el-input maxlength="30" type="text" v-model="queryForm.flag" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="3">
            <el-button @click="queryList" size="mini" type="info">查询</el-button>
            <el-button @click="open(null)" size="mini" type="info">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="list">
        <!--<contentHeader :queryTitle="`角色列表`"></contentHeader>-->
        <el-row>
          <el-table
            :data="tableData3"
            tooltip-effect="dark"
            size="mini"
            style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              prop="flag"
              label="校验环节标识"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="校验环节说明"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="isOpen"
              label="是否开启"
              align="center"
              :formatter="isOpenFmt"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="isGlobal"
              label="是否全局校验"
              align="center"
              :formatter="isGlobalFmt"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="range"
              label="验证公里范围"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="260"
              align="center"
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
          :title="type=='0'?'新增GPS校验规则':'修改GPS校验规则'"
          :visible.sync="dialogVisible">
          <el-form label-width="100px">

            <el-form-item label="校验环节标识" margin-top="20px">
              <el-input v-model="addForm.flag" placeholder="请输入校验环节标识"></el-input>
            </el-form-item>
            <el-form-item label="校验环节描述" margin-top="20px">
              <el-input v-model="addForm.description" placeholder="请输入校验环节描述"></el-input>
            </el-form-item>
            <el-form-item label="是否开启" margin-top="20px">
              <el-radio-group size="small" v-model="addForm.isOpen">
                <el-radio label="1" border>开启</el-radio>
                <el-radio label="0" border>未开启</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否全局" margin-top="20px">
              <el-radio-group size="small" v-model="addForm.isGlobal">
                <el-radio label="1" border>全局</el-radio>
                <el-radio label="0" border>非全局</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="验证公里范围" margin-top="20px">
              <el-input v-model="addForm.range" placeholder="请输入验证公里范围" type="number"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{type=='0'?add():update()}">确 定</el-button>
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
              currentRow:{},//当前选择的审核数据
              type:'0',//0新增  1修改
              dialogVisible:false,
              dialogVisibleDel: false,
              tmpDelId: '',
              addForm:{
                id: '',
                flag:'',
                description:'',
                isOpen:'',
                isGlobal:'',
                range: ''
              },
              queryForm:{
                page:1,
                pageSize:10,
                flag: ''
              },
              totalPages:0,
              tableData3: [],
              options: {
                isOpen:[
                  {value:1, label:'开启'},
                  {value:0, label:'未开启'},
                ],
                isGlobal:[
                  {value:1, label:'全局'},
                  {value:0, label:'非全局'},
                ],
              },
            }
        },
        props: {
            // 父组件传过来的值
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
          open(row) {
            if (row) {  // 修改
              this.type = '1';
              this.dialogVisible = true;
              this.addForm.id = row.id;
              this.addForm.flag = row.flag;
              this.addForm.description = row.description;
              this.addForm.isOpen = row.isOpen + '';
              this.addForm.isGlobal = row.isGlobal + '';
              this.addForm.range = row.range;
            } else {  // 新增
              this.type = '0';
              this.dialogVisible = true;
              this.addForm.id = '';
              this.addForm.flag = '';
              this.addForm.description = '';
              this.addForm.isOpen = '';
              this.addForm.isGlobal = '';
              this.addForm.range = '';
            }
          },
          add(){
            this.dialogVisible = false;
            this.$axios.HttpPost('/api/gps/check/rule/create',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'创建成功'
                });
                this.queryList();
              });
          },
          deleteRow(){

          },

          update(){
            this.dialogVisible = false;
            this.$axios.HttpPut('/api/gps/check/rule/update',
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
          reset(){

          },
          handleClose(){

          },
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/gps/check/rule/delete/'+ this.tmpDelId,
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
            this.$axios.HttpGet('/api/gps/check/rule/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },

          isOpenFmt(row, column) {
            return this.$OPTIONS(row.isOpen, this.options.isOpen);
          },

          isGlobalFmt(row, column) {
            return this.$OPTIONS(row.isGlobal, this.options.isGlobal);
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
