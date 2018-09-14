<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px" :model="queryForm">
          <el-col :offset="1" :span="6">
            <el-form-item label="店铺名称">
              <el-input maxlength="20" v-model="queryForm.name" type="text" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input maxlength="11" v-model="queryForm.name" type="text" auto-complete="off"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺类型">
              <el-select v-model="queryForm.state" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.dicValue"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="queryForm.enableFlag" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.dicValue"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input maxlength="20" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="product-btn">
        <el-col :offset='1' :span="3">
          <el-button size="mini" type="info">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button @click="()=>{type='0';dialogVisible=true}" size="mini" type="info">新增</el-button>
        </el-col>
      </el-row>
      <div class="list">
        <!--<contentHeader :queryTitle="`角色列表`"></contentHeader>-->
        <el-row>
          <el-table
            :data="tableData3"
            tooltip-effect="dark"
            size="mini"
            style="width: 100%">
            <el-table-column
              v-if="false"
              prop="id"
              label="id"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerName"
              label="店铺名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerStyle"
              label="店铺类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerStatus"
              label="状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="brandId"
              label="联系人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="areasId"
              label="联系电话"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="intervalPriceMin"
              label="平台操作人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="intervalPriceMax"
              label="操作时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="260"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="()=>{type='1';dialogVisible=true}" type="primary" size="mini">审核通过</el-button>
                <el-button @click="deleteRow(scope.row.id)" size="mini">驳回</el-button>
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
          title="选择品牌"
          :visible.sync="brandVisible">
          <el-table
            highlight-current-row
          >
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="品牌名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="品牌英文名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="关联品类"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="审核状态"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="brandVisible = false">取 消</el-button>
            <el-button type="primary" @click="brandVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :title="type=='0'?'新增规则':'修改规则'"
          :visible.sync="dialogVisible">
          <el-form label-width="90px">
            <el-form-item label="品类名称">
              <el-select v-model="addForm.cateId" placeholder="请选择">
                <el-option
                  label="品类1"
                  value="0">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌名称">
              <el-input v-model="addForm.brandId" placeholder="请输入品牌名称">
                <el-button @click="brandVisible=true" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="排序号">
              <el-input placeholder="请输入排序号"></el-input>
            </el-form-item>
            <el-form-item label="城市区域">
              <el-select v-model="addForm.areasId" placeholder="请选择">
                <el-option
                  label="大连市"
                  value="0">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格区间">
              <el-col :span="10">
                <el-input v-model="addForm.intervalPriceMin" placeholder="最低价格"></el-input>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-input v-model="addForm.intervalPriceMax" placeholder="最高价格"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="审核"
          :visible.sync="shVisible">
          <el-form label-width="90px">
            <el-form-item label="品类名称">
              {{this.currentRow.cateId}}
            </el-form-item>
            <el-form-item label="品牌名称">
              {{this.currentRow.brandId}}
            </el-form-item>
            <el-form-item label="城市区域">
              {{this.currentRow.areasId}}
            </el-form-item>
            <el-form-item label="价格区间">
              {{this.currentRow.intervalPriceMin}} -- {{this.currentRow.intervalPriceMax}}
            </el-form-item>
            <el-form-item label="审核意见">
              <el-radio-group size="small" v-model="radioState">
                <el-radio label="success" border>审核通过</el-radio>
                <el-radio label="fail" border>驳回</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="">
              <el-input type="textarea">

              </el-input>
            </el-form-item>
          </el-form>
          <el-form-item label="审核意见">
            <el-input type="textarea">

            </el-input>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="shVisible = false">取 消</el-button>
            <el-button @click="approve" type="primary">确 定</el-button>
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
              radioState:'',
              currentRow:{},//当前选择的审核数据
              options:[],
              type:'0',//0新增  1修改
              shVisible:false,
              dialogVisible:false,
              brandVisible:false,
              value:"",
              addForm:{
                areasId:'',
                brandId:'',
                cateId:'',
                intervalPriceMax:'',
                intervalPriceMin:'',
              },
              queryForm:{
                page:1,
                pageSize:10,
                areasId:'',
                brandId	:'',
                cateId:'',
                id:'',
                status:'',
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
            this.$axios.HttpPost('/api/rule/create',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'创建成功'
                })
              });
          },
          deleteRow(){

          },
          approve(){
            this.shVisible = false;
            this.$axios.HttpPut('/api/rule/operation/auditing',
              {
                id:this.currentRow.id,
                opt:this.radioState
              }
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'审核提交成功'
                })
              });
          },
          update(){
            this.dialogVisible = false;
            this.$axios.HttpPut('/api/rule/update',
              this.addForm
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
              });
          },
          reset(){

          },
          handleClose(){

          },
          queryList(){
            this.$axios.HttpGet('/api/seller/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data
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
