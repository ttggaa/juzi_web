<template>
    <div>
      <contentHeader :queryTitle="`查询条件`"></contentHeader>
      <el-row style="margin-top: 1rem">
        <el-form label-width="90px" :model="queryForm">
          <el-col :span="5">
            <el-form-item label="地区编码">
              <el-input maxlength="20" v-model="queryForm.areaId" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地区名称">
              <el-input maxlength="20" v-model="queryForm.areaName" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地区级别">
              <el-select v-model="queryForm.levelType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options.levelType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="邮编">
              <el-input maxlength="20" v-model="queryForm.zipCode" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="区号">
              <el-input maxlength="20" v-model="queryForm.cityCode" type="text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="创建人">
              <el-input maxlength="20" type="text" v-model="queryForm.createUser" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上级地区">
              <el-input maxlength="20" type="text" v-model="queryForm.parentName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset='1' :span="3">
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
            style="width: 100%">
            <el-table-column
              fixed="left"
              label="序号"
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="areaId"
              label="地区编码"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="areaName"
              label="地区名称"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级地区"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="mergerName"
              label="地区全名"
              width="300"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="shortName"
              label="短名称"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="mergerShortName"
              label="全名短名称"
              width="300"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="levelType"
              label="地区级别"
              :formatter="levelTypeFmt"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="cityCode"
              label="区号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="zipCode"
              label="邮编"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="pinyin"
              label="拼音"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="jianpin"
              label="简拼"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="firstChar"
              label="首字母"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="lng"
              label="经度"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="lat"
              label="纬度"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="创建人"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
<!--             <el-table-column
              width="180"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="()=>{type='1';dialogVisible=true;addForm=scope.row}" type="primary" size="mini">修改</el-button>
                <el-button type="danger" @click="deleteById(scope.row.id)" size="mini">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </el-row>
        <el-row class="page-choose" type="flex" justify="center" align="middle">
          <el-pagination
            :page-size="queryForm.pageSize"
            @current-change="handleCurrentChange"
            :current-page="queryForm.page"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </el-row>

      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  import contentHeader from '../../../contentHeader'
    export default {
        data() {
            return {
              type:'0',//0 新增 1修改
              value:'',
              dialogVisible:false,
              options:{
                levelType:[
                  {value:0, label:'国家级'},
                  {value:1, label:'省级'},
                  {value:2, label:'市级'},
                  {value:3, label:'区县级'}
                ]
              },
              totalPages:0,
              queryForm:{
                page:1,
                pageSize:10,
                areaId:'',
                areaName:'',
                cityCode:'',
                zipCode:'',
                createUser:'',
                parentName:'',
                levelType:''
              },
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
          handleClose(){
            this.dialogVisible =false;
          },

          reset(){

          },
          handleCurrentChange(val){
            this.queryForm.page = val
            this.queryList()
          },

          queryList(){
            this.$axios.HttpGet('/api/areas/list',
              this.queryForm
            )
              .then((data) => {
                  this.totalPages = data.data.total
                  this.tableData3 = data.data.list
              });
          },
          levelTypeFmt(row, column) {
            return this.$OPTIONS(row.levelType, this.options.levelType);
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
