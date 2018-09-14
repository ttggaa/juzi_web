<template>
  <div class="category">
    <contentHeader :queryTitle="`查询条件`"></contentHeader>
    <el-row style="margin-top: 1rem">
      <el-form label-width="90px">
        <el-col :offset="1" :span="4">
          <el-form-item label="店铺名称">
            <el-input maxlength="30" v-model="queryForm.sellerTitle" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="店铺类型">
            <el-select v-model="queryForm.sellerStyle" filterable clearable placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in options.sellerStyle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="品类">
            <el-input maxlength="30" v-model="queryForm.cateName" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="品牌">
            <el-input maxlength="30" v-model="queryForm.brandName" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset='1' :span="6" style="padding-top:6px;">
          <el-button size="mini" type="info" @click="queryList">查询</el-button>
          <el-button @click="open(null)" size="mini" type="info">新增</el-button>
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
            prop="sellerStyle"
            label="店铺类型"
            :formatter="sellerStyleFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="店铺状态"
            :formatter="auditStatusFmt"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="cateName"
            label="	品类"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createUser"
            label="创建人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            width="260"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="open(scope.row)" type="primary" size="mini">修改</el-button>
              <el-button @click="deleteRow(scope.row.id)" size="mini">删除</el-button>
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
        title="选择品类"
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
        :title="type=='0'?'新增':'修改'"
        :visible.sync="dialogVisible">
        <el-form label-width="90px">
          <el-form-item label="店铺名称">
            <el-select v-model="addForm.sellerId" filterable remote :remote-method="querySellerOptions" :loading="loading" clearable placeholder="请选择店铺名称" style="width: 100%;">
              <el-option
                v-for="item in options.seller"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类">
            <el-select v-model="addForm.cateId" filterable clearable placeholder="请选择品类" style="width: 100%;">
              <el-option
                v-for="item in options.cate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="addForm.brandId" filterable clearable placeholder="请选择品牌" style="width: 100%;">
              <el-option
                v-for="item in options.brand"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="type=='0'?add():update()">确 定</el-button>
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
        loading: false,
        currentRow:{},//当前选择的审核数据
        type:'0',//0新增  1修改
        shVisible:false,
        dialogVisible:false,
        brandVisible:false,
        value:"",
        addForm:{
          id: '',
          sellerId: '',
          brandId:'',
          cateId:''
        },
        queryForm:{
          page:1,
          pageSize:10,
          sellerTitle:'',
          sellerStyle:'',
          brandName:'',
          cateName:''
        },
        totalPages:0,
        tableData3: [],
        options: {
          cate: [],
          brand: [],
          sellerStyle: [
            {"value":1,"label":"自营"},
            {"value":10,"label":"自营海外购"},
            {"value":11,"label":"自营线下店"},
            {"value":30,"label":"第三方"},
            {"value":31,"label":"第三方海外购"}
          ],
          auditStatus: [
            {"value":1,"label":"待审核"},
            {"value":2,"label":"审核通过"},
            {"value":3,"label":"冻结"}
          ],
          seller: []
        },
        optionsExtend: {
          brandClean: true,
          areaClean: true
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
    watch: {
      'addForm.cateId': function (val) {
        if(this.optionsExtend.brandClean == true){
          this.addForm.brandId = '';
        }
        if(val){
          this.initBrandOptions(val);
        }else{
          this.options.brand = [];
        }
      }
    },
    mounted: function () {
      // 组件挂载结束
      this.queryList();
      this.initCateOptions();
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
      handleCurrentChange(val) {
        //分页翻页
        this.queryForm.page = val
        this.queryList()
      },
      add() {
        this.dialogVisible = false;
        this.$axios.HttpPost('/api/sellerCateBrandRel/create',
          this.addForm
        )
          .then((data) => {
            this.$message({
              type: 'success',
              message: '创建成功'
            });
            this.queryList();
          });
      },
      deleteRow(id) {
        this.$axios.HttpDel('/api/sellerCateBrandRel/delete/'+id,
        )
          .then((data) => {
            this.$message({
              type:'success',
              message:'删除成功'
            });
            this.queryList();
          });
      },
      update() {
        this.dialogVisible = false;
        this.$axios.HttpPut('/api/sellerCateBrandRel/update',
          this.addForm
        )
          .then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.queryList();
          });
      },
      reset() {

      },
      handleClose() {

      },
      queryList() {
        this.$axios.HttpGet('/api/sellerCateBrandRel/list',
          this.queryForm
        )
          .then((data) => {
            console.log(data)
            this.totalPages = data.data.total
            this.tableData3 = data.data.list
          });
      },
      querySellerOptions(query) {
        if(query !== ''){
          this.loading = true;
          this.$axios.HttpGet('/api/seller/options?name='+query,
            {}
          )
            .then((data) => {
              this.loading = false;
              this.options.seller = data.data;
            });
        }
      },
      initCateOptions() {
        this.$axios.HttpGet('/api/product/cate/options',
          {}
        )
          .then((data) => {
            this.options.cate = data.data;
          });
      },
      initBrandOptions(val) {
        this.$axios.HttpGet('/api/product/brand/options/'+val,
          {}
        )
          .then((data) => {
            this.options.brand = data.data;
            this.optionsExtend.brandClean = true;
          });
      },


      sellerStyleFmt(row, column) {
        return this.$OPTIONS(row.sellerStyle, this.options.sellerStyle);
      },
      auditStatusFmt(row, column) {
        return this.$OPTIONS(row.auditStatus, this.options.auditStatus);
      },
      open(row){
        if(row){  // 修改
          this.type='1';
          this.dialogVisible=true;
          this.addForm.id = row.id;
          this.addForm.sellerId = row.sellerId;
          this.optionsExtend.brandClean = false;
          this.addForm.cateId = row.cateId;
          this.addForm.brandId = row.brandId;
          this.querySellerOptions(row.sellerTitle);
        }else{  // 新增
          this.type='0';
          this.dialogVisible=true;
          this.addForm.sellerId = '';
          this.addForm.cateId = '';
          this.addForm.brandId = '';
        }

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
