<template>
    <div>
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="110px" :model="queryForm">
          <el-col :span="6">
            <el-form-item label="商家名称">
              <el-input maxlength="20" v-model="queryForm.sellerName" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item label="提现结果">
              <el-select v-model="queryForm.state" placeholder="请选择">
                <el-option
                  label="全部"
                  value="0">
                </el-option>
                <el-option
                  label="打款成功"
                  value="1">
                </el-option>
                <el-option
                  label="打款失败"
                  value="2">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item label="提现业务流水号">
              <el-input maxlength="20" v-model="queryForm.withdrawId" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="打款发起时间">
              <el-date-picker
                v-model="datePick.createTime"
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
          <el-col :span="11">
            <el-form-item label="打款结束时间">
              <el-date-picker
                v-model="datePick.finishTime"
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
            <!--<el-table-column-->
              <!--width="200"-->
              <!--label="操作">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button @click="()=>{type='1';dialogVisible=true;addForm=scope.row}" type="primary" size="mini">打款</el-button>-->
                <!--<el-button type="danger" @click="deleteById(scope.row.id)" size="mini">查询账户流水</el-button>-->              <!--</template>-->
            <!--</el-table-column>-->
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
              options:[],
              totalPages:0,
              addForm:{

              },
              queryForm:{
                page:1,
                pageSize:10,
                sellerName: '',
                withdrawId: '',
                createTimeBegin: '',
                createTimeEnd: '',
                finishTimeBegin: '',
                finishTimeEnd: '',
                state: '',
                createUserName: ''
              },
              tableData3: [],
              datePick:{
                createTime: '',
                finishTime: ''
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
          'datePick.orderTime': function (val) {
            if(val){
              this.queryForm.createTimeBegin = val[0].format("yyyy-MM-dd");
              this.queryForm.createTimeEnd = val[1].format("yyyy-MM-dd");
            }else{
              this.queryForm.createTimeBegin = '';
              this.queryForm.createTimeEnd = '';
            }
          },
          'datePick.finishTime': function (val) {
            if(val){
              this.queryForm.finishTimeBegin = val[0].format("yyyy-MM-dd");
              this.queryForm.finishTimeEnd = val[1].format("yyyy-MM-dd");
            }else{
              this.queryForm.finishTimeBegin = '';
              this.queryForm.finishTimeEnd = '';
            }
          }
        },
        methods: {
            // 自定义方法
          handleClose(){
            this.dialogVisible =false;
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
            this.$axios.HttpGet('/api/withdrawRecode/list',
              this.queryForm
            )
              .then((data) => {
                this.totalPages = data.data.total;
                this.tableData3 = data.data.list;
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
</style>
