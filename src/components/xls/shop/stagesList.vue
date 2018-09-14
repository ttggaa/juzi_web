<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :offset="1" :span="6">
            <el-form-item label="店铺名称">
              <el-input maxlength="30" v-model="queryForm.sellerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="3">
            <el-button @click="queryList()" size="mini" type="info">查询</el-button>
            <el-button @click="open()" size="mini" type="info">新增</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
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
              prop="term"
              label="期数"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="monthRate"
              label="月利率"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="discount"
              label="折扣（%）"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="afterDiscountRate"
              label="折后费率"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              width="260"
              label="操作">
              <template slot-scope="scope">
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
          title="新增"
          :visible.sync="dialogVisible"
          radioState=this.currentRow.term>
          <el-form label-width="120px">
            <el-form-item label="店铺名称">
              <el-select v-model="addForm.sellerId" filterable remote :remote-method="querySellerOptions" clearable placeholder="请选择店铺名称" style="width: 100%;">
                <el-option
                  v-for="item in options.seller"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期数">
              <el-select v-model="addForm.term" filterable clearable placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in options.term"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月利率">
              <el-select v-model="addForm.monthRate" filterable clearable placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in options.monthRate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="折扣百分比(%)">
              <el-select v-model="addForm.discount" filterable clearable placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in options.discount"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="折后费率">
              <el-select v-model="addForm.afterDiscountRate" filterable clearable placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in options.afterDiscountRate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="add" type="primary">确 定</el-button>
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
              options: {
                auditStatus: [
                  {value:1, label:'待审核'},
                  {value:2, label:'审核通过'},
                  {value:3, label:'冻结'},
                  {value:4, label:'创建'},
                  {value:5, label:'审核失败'},
                  {value:501, label:'销售，企业，结算全失败'}
                ],
                term: [
                  {value:1, label:'1期'},
                  {value:3, label:'3期'},
                  {value:6, label:'6期'},
                  {value:9, label:'9期'},
                  {value:12, label:'12期'},
                  {value:24, label:'24期'},
                  {value:36, label:'36期'}
                ],
                seller: [],
                monthRate: [],
                discount: [],
                afterDiscountRate: []
              },
              addForm:{
                sellerId:'',
                term:'',
                monthRate:'',
                afterDiscountRate:'',
                discount:''
              },
              queryForm:{
                page:1,
                pageSize:10,
                sellerName:''
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
          this.queryList();
          this.initMonthRate();
          this.initDiscount();
          this.initAfterDiscountRate();
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
            this.queryForm.page = val;
            this.queryList();
          },
          open(){
            this.type='0';
            this.dialogVisible=true;
            this.addForm.sellerId = '';
            this.addForm.term = '';
            this.addForm.monthRate = '';
            this.addForm.afterDiscountRate = '';
            this.addForm.discount = '';
          },
          add(){
            this.dialogVisible = false;
            this.$axios.HttpPost('/api/seller/term/create',
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
          openDel(id){
            this.tmpDelId = id;
            this.dialogVisibleDel = true;
          },
          deleteById(){
            this.$axios.HttpDel('/api/seller/term/delete/'+ this.tmpDelId,
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

          reset(){

          },
          handleClose(){

          },
          queryList(){
            this.$axios.HttpGet('/api/seller/term/list',
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
          initMonthRate(){
            this.options.monthRate = [];
            this.$axios.HttpGet('/api/dictionary/code/MONTH_RATE',
              {}
            )
              .then((data) => {
                var arr = data.data.dictVal.split(',');
                for(var i=0;i<arr.length;i++){
                  var obj = {};
                  obj.value = arr[i];
                  obj.label = arr[i];
                  this.options.monthRate.push(obj);
                }
              });
          },
          initDiscount(){
            this.options.discount = [];
            this.$axios.HttpGet('/api/dictionary/code/DISCOUNT',
              {}
            )
              .then((data) => {
                var arr = data.data.dictVal.split(',');
                for(var i=0;i<arr.length;i++){
                  var obj = {};
                  obj.value = arr[i];
                  obj.label = arr[i];
                  this.options.discount.push(obj);
                }
              });
          },
          initAfterDiscountRate(){
            this.options.afterDiscountRate = [];
            this.$axios.HttpGet('/api/dictionary/code/AFTER_DISCOUNT_RATE',
              {}
            )
              .then((data) => {
                var arr = data.data.dictVal.split(',');
                for(var i=0;i<arr.length;i++){
                  var obj = {};
                  obj.value = arr[i];
                  obj.label = arr[i];
                  this.options.afterDiscountRate.push(obj);
                }
              });
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
