<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :offset="1" :span="6">
            <el-form-item label="店铺名称">
              <el-input maxlength="30" v-model="queryForm.roleName" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺类型">
              <el-select v-model="queryForm.systemNo" placeholder="请选择">
                <el-option
                  label="item.systemName"
                  value="item.systemNo">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="product-btn">
        <el-col :offset='1' :span="3">
          <el-button size="mini" type="info">查询</el-button>
        </el-col>
      </el-row>
      <div class="list">
        <!--<contentHeader :queryTitle="`角色列表`"></contentHeader>-->
        <el-row>
          <el-table
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              label="店铺ID"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
              prop="dictName"
              label="店铺名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dictCode"
              label="店铺类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="enableFlag"
              label="状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dictType"
              label="账期"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="客服qq"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="联系人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="联系人电话"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="平台操作人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="操作时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="check(scope.row.roleNo)" type="primary" size="mini">单笔授信</el-button>
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
          title="单笔授信"
          :visible.sync="dialogVisible">
          <el-form label-width="90px">
            <el-form-item label="店铺ID">
              <el-input placeholder="请输入参数编码"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称">
              <el-input placeholder="请输入参数名称"></el-input>
            </el-form-item>
            <el-form-item label="店铺类型">
              <el-input placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-form-item label="店铺状态">
              <el-input placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-form-item label="单笔授信">
              <el-radio-group size="small">
                <el-radio label="1" border>开启</el-radio>
                <el-radio label="2" border disabled>关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
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
              value:"",
              addForm:{
                name:'',
                visible:'',
              },
              queryForm:{
                page:1,
                pageSize:10,
                search:{
                  id:'',
                  name:'',
                  visible:''
                }
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
          add(){
            this.dialogVisible = false;
            this.$axios.HttpPost('/api/product/cate/create?accessToken='+this.$store.state.token,
              this.addForm
            )
              .then((data) => {

              });
          },
          reset(){

          },
          handleClose(){

          },
          queryList(){
            this.$axios.HttpPost('/api/product/cate/list?accessToken='+this.$store.state.token,
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
