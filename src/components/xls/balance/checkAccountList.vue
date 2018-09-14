<template>
  <div>
    <contentHeader :queryTitle="`查询条件`"></contentHeader>
    <el-row style="margin-top: 1rem">
      <el-form label-width="110px" :model="queryForm">
        <el-col :span="7">
          <el-form-item label="订单号">
            <el-input maxlength="20" type="text" v-model="queryForm.orderSn" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="店铺名称">
            <el-input maxlength="20" v-model="queryForm.sellerName" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="发货时间">
            <el-date-picker
              v-model="datePick.orderDeliverTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="6">
          <el-button @click="queryList" size="mini" type="info" style="margin-top:3px;">查询</el-button>
          <el-button @click="exportList" size="mini" type="info">导出</el-button>
        </el-col>
      </el-form>
    </el-row>
    <div class="list">
      <!--<contentHeader :queryTitle="`用户列表`"></contentHeader>-->
      <el-row>
        <el-table
          :data="tableData3"
          tooltip-effect="dark"
          size="mini"
          style="width: 100%">
          <el-table-column
            fixed="left"
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="orderSn"
            label="订单号"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="confirmTime"
            label="下单日期"
            :formatter="confirmTimeFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="true"
            prop="state"
            label="订单状态"
            :formatter="stateFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productNormName"
            label="规格"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderProductNumber"
            label="数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="moneyDiscount"
            label="优惠总价"
            :formatter="moneyDiscountFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="moneyOrder"
            label="订单总金额"
            :formatter="moneyOrderFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="downpaymentAmount"
            label="首付"
            downpaymentAmount="downpaymentAmountFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productCateName"
            label="品类"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productBrandName"
            label="品牌"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="买家"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="accountPeriod"
            label="账期"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sellerName"
            label="商户名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sellerSettlePoint"
            label="商家扣点"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sellerCompanyName"
            label="商户公司名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="开户行"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="bankCode"
            label="银行卡号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderRemark"
            label="订单备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            :formatter="orderTypeFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderDeliverTime"
            label="发货时间"
            :formatter="orderDeliverTimeFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderCodconfirmTime"
            label="确认收货时间"
            :formatter="orderCodconfirmTimeFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productCostPrice"
            label="成本总价"
            :formatter="productCostPriceFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderCapitalId"
            label="资金方id"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderMonthlyAmount"
            label="订单月供"
            :formatter="orderMonthlyAmountFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="settleRealTime"
            label="实际结算时间"
            :formatter="settleRealTimeFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="monthRatio"
            label="月利率"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="consignee"
            label="收件人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="receivingCity"
            label="收货城市"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="term"
            label="期数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="monthlyService"
            label="月服务费"
            :formatter="monthlyServiceFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="balanceAccount(scope.row.orderSn)">确认对账</el-button>
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
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import contentHeader from '../../contentHeader'
  export default {
    data() {
      return {
        dialogVisible:false,
        options: {
          state: [
            {value:'1',label:'待结算'},
            {value:'2',label:'已结算'},
            {value:'3',label:'拒绝'},
            {value:'4',label:'未到结算日'},
            {value:'10',label:'待对账'},
            {value:'20',label:'待核账'},
            {value:'30',label:'待放款'},
            {value:'40',label:'已放款'},
            {value:'50',label:'取消结算'}
          ],
          orderType: [
            {value:'1',label:'扫码店订单'},
            {value:'2',label:'便利店订单'}
          ]
        },
        totalPages:0,
        datePick:{
          orderDeliverTime: ''
        },
        queryForm:{
          orderSn: '',
          sellerName: '',
          state: 10,
          orderDeliverTimeStart: '',
          orderDeliverTimeEnd: ''
        },
        tableData3: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
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
    watch: {
      'datePick.orderDeliverTime': function (val) {
        if(val){
          this.queryForm.orderDeliverTimeStart = val[0].format("yyyy-MM-dd");
          this.queryForm.orderDeliverTimeEnd = val[1].format("yyyy-MM-dd");
        }else{
          this.queryForm.orderDeliverTimeStart = '';
          this.queryForm.orderDeliverTimeEnd = '';
        }
      }
    },
    methods: {
      // 自定义方法
      handleClose(){
        this.dialogVisible =false;
      },
      balanceAccount(orderSn){
        this.$axios.HttpGet('/api/seller/Settlement/balanceAccount/' + orderSn,
          {}
        )
          .then((data) => {
            this.$message({
              type:'success',
              message:'操作成功'
            });
            this.queryList();
          });
      },
      queryList(){
        var url = '/api/seller/Settlement/list?orderSn='+this.queryForm.orderSn+'&sellerName='
          + this.queryForm.sellerName
          + '&state='+this.queryForm.state
          + '&orderDeliverTimeStart=' + this.queryForm.orderDeliverTimeStart
          + '&orderDeliverTimeEnd=' + this.queryForm.orderDeliverTimeEnd;
        this.$axios.HttpGet(url)
          .then((data) => {
            this.totalPages = data.data.total
            this.tableData3 = data.data.list
          });
      },
      exportList(){
        var url = Axios.defaults.baseURL + '/seller/Settlement/export?orderSn='+this.queryForm.orderSn+'&sellerName='
          + this.queryForm.sellerName
          + '&state='+this.queryForm.state
          + '&orderDeliverTimeStart=' + this.queryForm.orderDeliverTimeStart
          + '&orderDeliverTimeEnd=' + this.queryForm.orderDeliverTimeEnd;
        window.location.href = url;
      },
      stateFmt(row, column) {
        return this.$OPTIONS(row.state, this.options.state);
      },
      moneyDiscountFmt(row, column) {
        return this.$MONEY_FORMAT(row.moneyDiscount, 2, '.', ',','￥');
      },
      moneyOrderFmt(row, column) {
        return this.$MONEY_FORMAT(row.moneyOrder, 2, '.', ',','￥');
      },
      downpaymentAmountFmt(row, column) {
        return this.$MONEY_FORMAT(row.downpaymentAmount, 2, '.', ',','￥');
      },
      orderTypeFmt(row, column) {
        return this.$OPTIONS(row.state, this.options.orderType);
      },
      productCostPriceFmt(row, column) {
        return this.$MONEY_FORMAT(row.productCostPrice, 2, '.', ',','￥');
      },
      orderMonthlyAmountFmt(row, column) {
        return this.$MONEY_FORMAT(row.orderMonthlyAmount, 2, '.', ',','￥');
      },
      monthlyServiceFmt(row, column) {
        return this.$MONEY_FORMAT(row.monthlyService, 2, '.', ',','￥');
      },
      confirmTimeFmt(row, column){
        if(!row.confirmTime){
          return '';
        }
        return new Date(row.confirmTime).format("yyyy-MM-dd hh:mm:ss");
      },
      orderDeliverTimeFmt(row, column){
        if(!row.orderDeliverTime){
          return '';
        }
        return new Date(row.orderDeliverTime).format("yyyy-MM-dd hh:mm:ss");
      },
      orderCodconfirmTimeFmt(row, column){
        if(!row.orderCodconfirmTime){
          return '';
        }
        return new Date(row.orderCodconfirmTime).format("yyyy-MM-dd hh:mm:ss");
      },
      settleRealTimeFmt(row, column){
        if(!row.settleRealTime){
          return '';
        }
        return new Date(row.settleRealTime).format("yyyy-MM-dd hh:mm:ss");
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
</style>
