<template>
    <div>
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="110px" :model="queryForm">
          <el-col :offset="1" :span="5">
            <el-form-item label="商家名称">
              <el-input maxlength="20" v-model="queryForm.name" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="product-btn">
        <el-col :offset='1' :span="3">
          <el-button @click="queryList" size="mini" type="info">查询</el-button>
        </el-col>
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
              label="商家名称"
              prop="sellerName"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="merchantAccount"
              label="账户余额"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="200"
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="open(scope.row.sellerCode, scope.row.sellerName, scope.row.merchantAccount)">打款</el-button>
                <el-button type="danger" size="mini" @click="accountStatement(scope.row.sellerCode)">查询账户流水</el-button>
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
          :title="type=='0'?'新增品牌':'修改品牌'"
          :visible.sync="dialogVisible"
          :before-close="handleClose">
          <el-row>
            <el-form label-width="90px">
              <el-col :span="10">
                <el-form-item label="品牌名称">
                  <el-input v-model="addForm.name" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌首字母">
                  <el-input maxLenght="1" v-model="addForm.nameFirst" placeholder="请输入品牌首字母"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                  <el-input placeholder="请输入排序号"></el-input>
                </el-form-item>
                <el-form-item label="品牌英文">
                  <el-input v-model="addForm.englishName" placeholder="请输入品牌英文"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="12">
                <el-form-item label="品牌别名">
                  <el-input v-model="addForm.alias" placeholder="请输入品牌别名"></el-input>
                </el-form-item>
                <el-form-item label="展示方式">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      label="电脑端"
                      value="0">
                    </el-option>
                    <el-option
                      label="手机端"
                      value="1">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否推荐">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      label="是"
                      value="0">
                    </el-option>
                    <el-option
                      label="否"
                      value="1">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关联品类">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      label="是"
                      value="0">
                    </el-option>
                    <el-option
                      label="否"
                      value="1">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{dialogVisible=false;type=='0'?add():update()}">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="账户流水"
          :visible.sync="dialogVisible2"
          width="90%"
          :before-close="handleClose2">
          <el-table
            :data="tableData4"
            tooltip-effect="dark"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              label="提现业务流水号"
              prop="withdrawId"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerName"
              label="商户名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="amount"
              label="提现金额"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="出款的商户号"
              prop="merchant"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              label="提现结果"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="failReason"
              label="失败原因"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="transNum"
              label="支付流水号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="打款发起时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="finishTime"
              label="打款结束时间"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">关 闭</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="提现"
          :visible.sync="dialogVisible3"
          width="30%"
          :before-close="handleClose3">
          <el-form label-width="110px" :model="withdrawCashReq">
            <el-row>
              <el-col>
                <el-form-item label="商户编码">
                  <el-input maxlength="20" v-model="withdrawCashReq.sellerCode" type="text" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="商户名称">
                  <el-input maxlength="20" v-model="withdrawCashReq.sellerName" type="text" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="提现金额">
                  <el-input maxlength="20" v-model="withdrawCashReq.amount" type="text" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="出款商户">
                  <el-select v-model="withdrawCashReq.merchant" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in options.merchant"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="withdrawCash">确 定</el-button>
            <el-button @click="dialogVisible3 = false">取 消</el-button>
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
              dialogVisible2:false,
              dialogVisible3:false,
              options: {
                merchant: [
                  {
                    value:'360080004005254829',
                    label:'桔子分期'
                  },
                  {
                    value:'360080004006431442',
                    label:'辽宁商贸'
                  }
                ]
              },
              totalPages:0,
              totalPages4:0,
              addForm:{

              },
              queryForm:{
                page:1,
                pageSize:10,
                sellerName: ''
              },
              tableData3: [],
              tableData4: [],
              withdrawCashReq:{
                amount: '',
                sellerCode: '',
                sellerName: '',
                merchant: ''
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
          handleClose(){
            this.dialogVisible =false;
          },
          handleClose2(){
            this.dialogVisible2 =false;
            this.totalPages4 = 0;
            this.tableData4 = [];
          },
          handleClose3(){
            this.dialogVisible3 =false;
            this.withdrawCashReq.sellerCode = '';
            this.withdrawCashReq.sellerName = '';
            this.withdrawCashReq.amount = '';
            this.withdrawCashReq.merchant = '';
          },
          add(){

          },
          update(){

          },
          reset(){

          },
          handleCurrentChange(val){
            this.queryForm.page = val
            this.queryList()
          },
          deleteById(id){

          },
          queryList(){
            this.$axios.HttpGet('/api/seller/Settlement/accountList',
              this.queryForm
            )
              .then((data) => {
                this.totalPages = data.data.total;
                this.tableData3 = data.data.list;
              });
          },
          accountStatement(sellerCode){
            this.dialogVisible2 =true;
            this.$axios.HttpGet('/api/withdrawRecode/list?sellerCode=' + sellerCode,
              {}
            )
              .then((data) => {
                this.totalPages4 = data.data.total;
                this.tableData4 = data.data.list;
              });
          },
          open(sellerCode,sellerName,amount){
            this.dialogVisible3 = true;
            this.withdrawCashReq.sellerCode = sellerCode;
            this.withdrawCashReq.sellerName = sellerName;
            this.withdrawCashReq.amount = amount;
          },
          withdrawCash(){
            this.dialogVisible3 =false;
            this.$axios.HttpPost('/api/seller/Settlement/withdrawCash',
              this.withdrawCashReq,
            )
              .then((data) => {
                this.$message({
                  type:'success',
                  message:'操作成功'
                });
                this.queryList();
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
</style>
