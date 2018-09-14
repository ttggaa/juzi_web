<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :offset="1" :span="6">
            <el-form-item label="订单编号">
              <el-input maxlength="30" v-model="queryForm.search" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="3">
            <el-button @click="queryList()" size="mini" type="info">查询</el-button>
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
              prop="orderId"
              label="订单id"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="orderSn"
              label="订单编号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建日期"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              :formatter="orderStatusFmt"
              label="订单状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="content"
              label="备注"
              show-overflow-tooltip>
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
              currentRow:{},//当前选择的审核数据
              type:'0',//0新增  1修改
              dialogVisible:false,
              dialogVisibleDel: false,
              tmpDelId: '',
              options: {
                orderStatus: [
                  {value:100, label:'待确认'},
                  {value:110, label:'用户已确认,待支付'},
                  {value:120, label:'待支付'},
                  {value:130, label:'支付成功且未推送风控'},
                  {value:135, label:'支付成功且推送进件成功'},
                  {value:140, label:'交易复核通过,待资匹'},
                  {value:150, label:'交易复核失败'},
                  {value:155, label:'资匹成功,待交货'},
                  {value:160, label:'已收货分期还款中'},
                  {value:170, label:'已收货分期还款中'},
                  {value:180, label:'已完成'},
                  {value:200, label:'已取消'},
                  {value:210, label:'退货处理中'},
                  {value:220, label:'已退货'},
                  {value:230, label:'退货失败'}
                ],
                seller: []
              },
              queryForm:{
                page:1,
                pageSize:10,
                search:''
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
            this.$axios.HttpPost('/select/log/orderLog',
              this.queryForm
            )
              .then((data) => {

                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          orderStatusFmt(row, column) {
            return this.$OPTIONS(row.orderStatus, this.options.orderStatus);
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
