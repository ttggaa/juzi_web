<template>
    <div>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px" :model="queryForm">
          <el-col :span="5">
            <el-form-item label="订单号">
              <el-input maxlength="20" v-model="queryForm.orderSn" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="店铺名称">
              <el-input maxlength="20" v-model="queryForm.sellerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="买家姓名">
              <el-input maxlength="20" v-model="queryForm.buyerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号">
              <el-input maxlength="20" v-model="queryForm.mobile" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="订单类型">
              <el-select v-model="queryForm.orderType" placeholder="全部" clearable>
                <el-option
                  v-for="item in options.orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="订单状态">
              <el-select v-model="queryForm.orderState" placeholder="全部" clearable>
                <el-option
                  v-for="item in options.orderState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品名称">
              <el-input maxlength="20" v-model="queryForm.productName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品品类">
              <el-input maxlength="20" v-model="queryForm.cateName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品品牌">
              <el-input maxlength="20" v-model="queryForm.brandName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="城市">
              <el-input maxlength="20" v-model="queryForm.showCity" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="下单渠道">
              <el-select v-model="queryForm.source" placeholder="全部" clearable>
                <el-option
                  v-for="item in options.source"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="下单日期">
              <el-date-picker
                v-model="datePick.confirmTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="发货日期">
              <el-date-picker
                v-model="datePick.deliverTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="5" :span="5">
            <el-button @click="queryList" size="mini" type="info">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
        <el-row>
            <el-table
              :data="tableData3"
              tooltip-effect="dark"
              size="mini"
              style="width: 100%"
            >
            <el-table-column
              fixed="left"
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="orderSn"
              label="订单号"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sellerName"
              label="店铺名称"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="buyerName"
              label="买家姓名"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="orderType"
              :formatter="orderTypeFmt"
              label="订单类型"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="orderState"
              :formatter="orderStateFmt"
              label="订单状态"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="商品名称"
              width="250"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productCateName"
              label="商品品类"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="productBrandName"
              label="商品品牌"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="moneyPrice"
              label="单价"
              :formatter="moneyPriceFmt"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="moneyOrder"
              label="订单总金额"
              :formatter="moneyOrderFmt"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="downpaymentAmount"
              label="首付"
              :formatter="downpaymentAmountFmt"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="term"
              label="分期数"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="monthlyAmount"
              label="月供"
              :formatter="monthlyAmountFmt"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="showCity"
              label="城市"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="source"
              label="下单渠道"
              :formatter="sourceFmt"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="confirmTime"
              label="下单时间"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="deliverTime"
              label="发货时间"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="capitalId"
              label="资方"
              :formatter="capitalFmt"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="page-choose" type="flex" justify="center" align="middle">
          <el-pagination
            :page-size="queryForm.pageSize"
            @current-change="handleCurrentChange"
            :current-page="this.queryForm.page"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>
      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
    export default {
        data() {
            return {
              dialogVisible:false,
              options: {
                orderState: [
                  {value:'100',label:'待确认'},
                  {value:'110',label:'用户已确认,待支付'},
                  {value:'130',label:'交易复核中'},
                  {value:'140',label:'交易复核通过，待资匹'},
                  {value:'150',label:'交易复核失败'},
                  {value:'155',label:'资匹成功，待交货'},
                  {value:'160',label:'已收货'},
                  {value:'170',label:'分期还款中'},
                  {value:'180',label:'已完成'},
                  {value:'200',label:'已取消'},
                  {value:'210',label:'退货处理中'},
                  {value:'220',label:'已退货'},
                  {value:'230',label:'退货失败'}
                ],
                orderType: [
                  {value:'1',label:'普通订单'},
                  {value:'2',label:'限时抢购订单'},
                  {value:'3',label:'团购订单'},
                  {value:'4',label:'竞价定金订单'},
                  {value:'5',label:'竞价尾款订单'},
                  {value:'6',label:'积分商城订单'},
                  {value:'6',label:'企业购订单'}
                ],
                source: [
                  {value:'1',label:'PC'},
                  {value:'2',label:'H5'},
                  {value:'3',label:'IOS'},
                  {value:'4',label:'ANDROID'},
                  {value:'5',label:'微信商城'}
                ]
              },
              totalPages:0,
              queryForm:{
                  page: 1,
                  pageSize: 10,
                  orderSn: '',
                  sellerName: '',
                  buyerName: '',
                  mobile: '',
                  orderType: '',
                  orderState: '',
                  productName: '',
                  cateName: '',
                  brandName: '',
                  showCity: '',
                  source: '',
                  confirmTimeBegin: '',
                  confirmTimeEnd: '',
                  deliverTimeBegin: '',
                  deliverTimeEnd: ''
              },
              datePick:{
                confirmTime: '',
                deliverTime: ''
              },
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
              tableData3: []
            }
        },
      watch: {
        'datePick.confirmTime': function (val) {
          if(val){
            this.queryForm.confirmTimeBegin = val[0].format("yyyy-MM-dd");
            this.queryForm.confirmTimeEnd = val[1].format("yyyy-MM-dd");
          }else{
            this.queryForm.confirmTimeBegin = '';
            this.queryForm.confirmTimeEnd = '';
          }
        },
        'datePick.deliverTime': function (val) {
          if(val){
            this.queryForm.deliverTimeBegin = val[0].format("yyyy-MM-dd");
            this.queryForm.deliverTimeEnd = val[1].format("yyyy-MM-dd");
          }else{
            this.queryForm.deliverTimeBegin = '';
            this.queryForm.deliverTimeEnd = '';
          }
        },
      },
        methods: {
          handleCurrentChange(val){
            this.queryForm.page = val
            this.queryList()
          },
          queryList(){
            this.$axios.HttpGet('/api/order/list',
              this.queryForm
            )
              .then((data) => {
                this.totalPages = data.data.total
                this.tableData3 = data.data.list
              });
          },
          orderTypeFmt(row, column) {
            return this.$OPTIONS(row.orderType, this.options.orderType);
          },
          orderStateFmt(row, column) {
            return this.$OPTIONS(row.orderState, this.options.orderState);
          },
          moneyPriceFmt(row, column) {
            return this.$MONEY_FORMAT(row.moneyPrice, 2, '.', ',','￥');
          },
          moneyOrderFmt(row, column) {
            return this.$MONEY_FORMAT(row.moneyOrder, 2, '.', ',','￥');
          },
          downpaymentAmountFmt(row, column) {
            return this.$MONEY_FORMAT(row.downpaymentAmount, 2, '.', ',','￥');
          },
          monthlyAmountFmt(row, column) {
            return this.$MONEY_FORMAT(row.monthlyAmount, 2, '.', ',','￥');
          },
          sourceFmt(row, column) {
            return this.$OPTIONS(row.source, this.options.source);
          },
          capitalFmt(row, column) {
            var capitalId = row.capitalId;
            var capitalText = '';
            switch (capitalId) {
              case 0:
                capitalText = '自营';
                break;
              case 1:
                capitalText = '海航';
                break;
              case 2:
                capitalText = '海尔';
                break;
              case 3:
                capitalText = '众网';
                break;
              case 4:
                capitalText = '悦才';
                break;
              case 5:
                capitalText = '蜂贷';
                break;
              case 6:
                capitalText = '小雨点';
                break;
              case 7:
                capitalText = '富士康';
                break;
              case 13:
                capitalText = '邦信';
                break;
            }
            return capitalText;
          }
        },
        mounted: function () {
          // 组件挂载结束
          this.queryList()
        },
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
