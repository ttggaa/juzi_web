<template>
    <div class="category">
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="120px">
          <el-col :span="7">
            <el-form-item label="CRM商户编码">
              <el-input maxlength="30" v-model="queryForm.merchantId" type="number" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺名称">
              <el-input maxlength="30" v-model="queryForm.sellerName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺编码">
              <el-input maxlength="30" v-model="queryForm.sellerCode" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺副标题">
              <el-input maxlength="30" v-model="queryForm.sellerTitle" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="审核状态">
              <el-select v-model="queryForm.auditStatus" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options.auditStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="3" style="padding-top:6px;">
            <el-button @click="queryList" size="mini" type="info" clearable>查询</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="list">
        <el-row>
          <el-table
            :data="tableData3"
            size="mini"
            style="width: 100%">
            <el-table-column
              fixed="left"
              label="序号"
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              fixed="left"
              label="店铺编码"
              show-overflow-tooltip>
                <template slot-scope="scope">
                  <router-link :to="'/sellerDetailInfo/' + scope.row.id">
                    {{ scope.row.sellerCode }}
                  </router-link>
                </template>
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="sellerName"
              label="店铺名称"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="auditStatus"
              :formatter="auditStatusFmt"
              label="审核状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="isOpen"
              :formatter="isOpenFmt"
              label="单笔授信"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="accountPeriod"
              label="账期（天）"
              show-overflow-tooltip>
            </el-table-column>
            <!-- 开户行信息 -->
            <el-table-column
              prop="bankUser"
              label="开户行账户名称"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="bankName"
              label="开户行"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="bankNameBranch"
              label="开户行支行名称"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="brandNameCode"
              label="开户行支行联行号"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="bankCode"
              label="银行账号"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="250"
              label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.auditStatus!=3" @click="freeze(scope.row.id, 'freeze')" type="primary" size="mini">商户冻结</el-button>
                <el-button v-if="scope.row.auditStatus==3" @click="freeze(scope.row.id, 'unfreeze')" type="primary" size="mini">商户解冻</el-button>
                <el-button type="success" @click="setSingleCredit(scope.row.id, scope.row.isOpen)" v-if="scope.row.isOpen==1" size="mini">关闭单笔授信</el-button>
                <el-button type="success" @click="setSingleCredit(scope.row.id, scope.row.isOpen)" v-if="scope.row.isOpen!=1" size="mini">开启单笔授信</el-button>
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
      </div>
    </div>
</template>
<script>
  import contentHeader from '../../contentHeader'
    export default {
        data() {
            return {
              currentRow:{},//当前选择的审核数据
              options: {
                auditStatus: [
                  {value: 1, label: '待审核'},
                  {value: 2, label: '审核通过'},
                  {value: 3, label: '冻结'},
                  {value: 4, label: '创建'},
                  {value: 5, label: '审核失败'},
                  {value: 501, label: '销售，企业，结算全失败'}
                ],
                isOpen: [
                  {value: 0, label: '未开启'},
                  {value: 1, label: '已开启'}
                ]
              },
              queryForm:{
                page:1,
                pageSize:10,
                sellerName:'',
                merchantId: '',
                sellerCode: '',
                sellerTitle: '',
                auditStatus: ''
              },
              totalPages:0,
              tableData3: [],
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
          setSingleCredit(sellerId, isOpen) {
            var isOpenVal = '';
            if(!isOpen){
              isOpenVal = 1;
            }else{
              isOpenVal = 0;
            }
            this.$axios.HttpGet('/api/seller/openCredit/' + sellerId + '/' + isOpenVal,
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
          freeze(sellerId, freezeType) {
            this.$axios.HttpGet('/api/seller/freeze/' + sellerId + '/' + freezeType,
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
            this.$axios.HttpGet('/api/seller/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          auditStatusFmt(row, column) {
            return this.$OPTIONS(row.auditStatus, this.options.auditStatus);
          },
          isOpenFmt(row, column) {
            return this.$OPTIONS(row.isOpen, this.options.isOpen);
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
