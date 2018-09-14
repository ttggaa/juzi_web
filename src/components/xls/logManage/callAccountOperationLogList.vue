<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px">
          <el-col :offset="1" :span="6">
            <el-form-item label="唯一标识">
              <el-input maxlength="30" v-model="queryForm.search.macId" type="text" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="下单渠道">
              <el-select v-model="queryForm.search.serviceType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options.serviceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
              prop="macId"
              label="唯一标识"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="type"
              :formatter="typeFmt"
              label="请求类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="serviceType"
              :formatter="serviceTypeFmt"
              label="消息描述"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="url"
              label="请求地址"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="requestTime"
              label="请求时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responseTime"
              label="响应时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="requestParam"
              label="请求参数"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responseParam"
              label="响应时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              :formatter="statusFmt"
              label="状态"
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
                serviceType: [
                  //{value:'DESCRIBE_100',label:'商户入驻'},
                  //{value:'DESCRIBE_110',label:'风控进件'},
                  {value:'DESCRIBE_120',label:'开立商户额度账户'},
                  {value:'DESCRIBE_130',label:'开立商户资金账户'},
                  {value:'DESCRIBE_140',label:'商户绑卡'},
                  //{value:'DESCRIBE_160',label:'资匹分配资方ID'},
                  //{value:'DESCRIBE_170',label:'资匹生成还款计划'},
                  //{value:'DESCRIBE_180',label:'调用资匹取消'},
                  //{value:'DESCRIBE_190',label:'风控准入'},
                  //{value:'DESCRIBE_200',label:'用户绑卡'},
                  {value:'DESCRIBE_210',label:'恢复信用额度'},
                  {value:'DESCRIBE_220',label:'下单立减信用额度'}
                  //{value:'DESCRIBE_230',label:'资匹回调'},
                  //{value:'DESCRIBE_240',label:'查询商户信用账户信息'},
                  //{value:'DESCRIBE_250',label:'风控审核回调'},
                  //{value:'DESCRIBE_260',label:'获取通讯录'},
                  //{value:'DESCRIBE_270',label:'还款完成回调'}
                ],
                type: [
                  {value:1,label:'接受消息'},
                  {value:2,label:'请求消息'}
                ],
                status: [
                  {value:0, label:'已发送'},
                  {value:1, label:'成功'},
                  {value:2, label:'失败'},
                  {value:3, label:'未知-失败'}
                ]
              },
              queryForm:{
                page:1,
                pageSize:10,
                search:{
                          macId:'',
                          serviceType:''
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

          reset(){

          },
          handleClose(){

          },

          queryList(){
            this.$axios.HttpPost('/select/log/callAccountsOperationLog',
              this.queryForm
            )
              .then((data) => {

                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          serviceTypeFmt(row, column) {
            return this.$OPTIONS(row.serviceType, this.options.serviceType);
          },
          typeFmt(row, column) {
            return this.$OPTIONS(row.type, this.options.type);
          },
          statusFmt(row, column) {
            return this.$OPTIONS(row.status, this.options.status);
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
