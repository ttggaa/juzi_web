<template>
  <div class="category">
    <contentHeader :queryTitle="`查询条件`"></contentHeader>
    <el-form label-width="90px">
      <el-row style="margin-top: 1rem">
        <el-col :span="5">
          <el-form-item label="品类名称">
            <el-input maxlength="30" v-model="queryForm.cateName" type="text" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌名称">
            <el-input maxlength="30" v-model="queryForm.brandName" type="text" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="区域">
            <el-input maxlength="30" v-model="queryForm.areaName" type="text" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核状态">
            <el-select v-model="queryForm.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in options.status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 1rem">
        <el-col :span="5">
          <el-form-item label="创建人">
            <el-input maxlength="30" type="text" auto-complete="off" v-model="queryForm.createUser"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核人">
            <el-input maxlength="30" type="text" auto-complete="off" v-model="queryForm.approvalUser" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset='1' :span="3">
          <el-button @click="queryList" size="mini" type="info">查询</el-button>
          <el-button @click="open(null)" size="mini" type="info">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="list">
      <el-row>
        <el-table
          :data="tableData3"
          tooltip-effect="dark"
          size="mini"
          style="width: 100%">
          <el-table-column
            fixed="left"
            v-if="false"
            prop="id"
            label="ID"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="cateName"
            label="品类名称"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="brandName"
            label="品牌名称"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="areaName"
            label="区域"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="intervalPriceMin"
            label="最小区间价格"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="intervalPriceMax"
            label="最大区间价格"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="creater"
            label="创建人"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="approvalTime"
            label="审核时间"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="approvalUser"
            label="审核人"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核状态"
            :formatter="statusFmt"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="300"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="open(scope.row)" type="primary" size="mini">修改</el-button>
              <el-button type="danger" @click="openDel(scope.row.id)" size="mini">删除</el-button>
              <el-dialog title="提示" :visible.sync="dialogVisibleDel" @close="dialogVisibleDel = false" width="30%" append-to-body>
                <span>确定删除？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleDel = false" >取 消</el-button>
                    <el-button type="primary" @click="deleteById">确 定</el-button>
                  </span>
              </el-dialog>
              <el-button v-if="scope.row.status != 1" @click="()=>{shVisible=true;currentRow = scope.row}" size="mini">审核</el-button>
            </template>
          </el-table-column>
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
      <el-dialog
        title="选择品牌"
        :visible.sync="brandVisible">
        <el-table
          highlight-current-row
          :data="tableData4">
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品牌名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="englishName"
            label="品牌英文名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="productCateId"
            label="关联品类"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="state"
            label="审核状态"
            show-overflow-tooltip>
          </el-table-column>

        </el-table>

        <span slot="footer" class="dialog-footer">
            <el-button @click="brandVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{selectBrand()}">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog
        :title="type=='0'?'新增规则':'修改规则'"
        :visible.sync="dialogVisible">
        <el-form label-width="90px">
          <!--<el-col :span="24">-->
            <!--<el-form-item label="ID">-->
              <!--{{addForm.id}}-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="省份">
              <el-select
                v-model="addFormExtend.province"
                placeholder="请选择省份" clearable>
                <el-option
                  v-for="item in options.province"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市">
              <el-select
                v-model="addForm.areaId"
                placeholder="请选择城市" clearable>
                <el-option
                  v-for="item in options.city"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最低价格">
              <el-input v-model="addForm.intervalPriceMin" placeholder="最低价格" maxlength="11" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高价格">
              <el-input v-model="addForm.intervalPriceMax" placeholder="最高价格" maxlength="11" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="()=>{dialogVisible=false;type=='0'?add():update()}">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog
        title="审核"
        :visible.sync="shVisible">
        <el-form label-width="90px">
          <el-form-item label="品类名称：">
            {{this.currentRow.cateName}}
          </el-form-item>
          <el-form-item label="品牌名称：">
            {{this.currentRow.brandName}}
          </el-form-item>
          <el-form-item label="城市区域：">
            {{this.currentRow.areaName}}
          </el-form-item>
          <el-form-item label="价格区间：">
            {{this.currentRow.intervalPriceMin}} ~ {{this.currentRow.intervalPriceMax}} 元
          </el-form-item>
          <el-form-item label="审核意见：">
            <el-radio-group size="small" v-model="radioState">
              <el-radio label="success">审核通过</el-radio>
              <el-radio label="fail">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-input type="textarea" maxlength="500">

            </el-input>
          </el-form-item>
        </el-form>
        <el-form-item label="审核意见">
          <el-input type="textarea">

          </el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="shVisible = false">取 消</el-button>
            <el-button @click="approve" type="primary">确 定</el-button>
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
        radioState: '',
        currentRow: {},//当前选择的审核数据
        currentBrandRow: '',//弹框选择的品牌行
        type: '0',//0新增  1修改
        shVisible: false,
        dialogVisible: false,
        dialogVisibleDel: false,
        tmpDelId: '',
        brandVisible: false,
        value: "",
        addForm: {
          id: '',
          areaId: '',
          brandId: '',
          cateId: '',
          intervalPriceMax: '',
          intervalPriceMin: '',
        },
        addFormExtend: {
          province: ''
        },
        queryForm: {
          page: 1,
          pageSize: 10,
          cateName: '',
          brandName: '',
          areaName: '',
          status: '',
          approvalUser: '',
          createUser: ''
        },
        queryFormBrand: {
          page: 1,
          pageSize: 10,
          englishName: '',
          id: '',
          name: '',
          productCateId: '',
          state: '',
          enableFlag: null
        },
        queryFormCate: {
          page: 1,
          pageSize: 10,
          id: '',
          name: '',
          visible: ''
        },
        totalPages: 0,
        tableData3: [],
        tableData4: [],
        options: {
          cate: [],
          brand: [],
          province: [],
          city: [],
          status: [
            {value: 0, label: '待审核'},
            {value: 1, label: '审核通过'},
            {value: 2, label: '审核驳回'}
          ]
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
    mounted: function () {
      // 组件挂载结束
      this.queryList()
      this.initCateOptions();
      this.initProvinceOptions();
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
      'addForm.cateId': function (val) {
        if(this.optionsExtend.brandClean == true){
          this.addForm.brandId = '';
        }
        if(val){
          this.initBrandOptions(val);
        }else{
          this.options.brand = [];
        }
      },
      'addFormExtend.province': function (val) {
        if(this.optionsExtend.areaClean == true){
          this.addForm.areaId = '';
        }
        if(val){
          this.initCityOptions(val);
        }else{
          this.options.city = [];
        }
      }
    },
    methods: {
      // 自定义方法
      handleCurrentChange(val) {
        //分页翻页
        this.queryForm.page = val
        this.queryList()
      },
      open(row) {
        if (row) {  // 修改
          this.type = '1';
          this.dialogVisible = true;
          this.addForm.id = row.id;
          this.optionsExtend.areaClean = false;
          this.addFormExtend.province = row.province;
          this.addForm.areaId = row.areaId;
          this.optionsExtend.brandClean = false;
          this.addForm.cateId = row.cateId;
          this.addForm.brandId = row.brandId;
          this.addForm.intervalPriceMax = row.intervalPriceMax;
          this.addForm.intervalPriceMin = row.intervalPriceMin;
        } else {  // 新增
          this.type = '0';
          this.dialogVisible = true;
          this.addForm.id = '';
          this.addFormExtend.province = '';
          this.addForm.areaId = '';
          this.addForm.brandId = '';
          this.addForm.cateId = '';
          this.addForm.intervalPriceMax = '';
          this.addForm.intervalPriceMin = '';
        }
      },
      add() {
        this.dialogVisible = false;
        this.$axios.HttpPost('/api/rule/create',
          this.addForm
        )
          .then((data) => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.queryList()
          });
      },
      approve() {
        this.shVisible = false;
        this.$axios.HttpPut('/api/rule/operation/auditing',
          {
            id: this.currentRow.id,
            opt: this.radioState
          }
        )
          .then((data) => {
            this.$message({
              type: 'success',
              message: '审核提交成功'
            })
            this.queryList()
          });
      },
      update() {
        this.dialogVisible = false;
        this.$axios.HttpPut('/api/rule/update',
          this.addForm
        )
          .then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.queryList()
          });
      },
      openDel(id){
        this.tmpDelId = id;
        this.dialogVisibleDel = true;
      },
      deleteById(){
        this.$axios.HttpDel('/api/rule/delete/'+ this.tmpDelId,
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


      queryList() {
        this.$axios.HttpGet('/api/rule/list',
          this.queryForm
        )
          .then((data) => {
            this.totalPages = data.data.total
            this.tableData3 = data.data.list
          });
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
      initProvinceOptions(){
        this.$axios.HttpGet('/api/areas/options/100000',
          {}
        )
          .then((data) => {
            this.options.province = data.data;
          });
      },
      initCityOptions(val){
        this.$axios.HttpGet('/api/areas/options/' + val,
          {}
        )
          .then((data) => {
            this.options.city = data.data;
            this.optionsExtend.areaClean = true;
          });
      },
      statusFmt(row, column) {
        return this.$OPTIONS(row.status, this.options.status);
      }


    }
  }
</script>
<style scoped>
  .product-btn .el-button--info {
    width: 88px;
    background-color: #E8E8E8;
    border-color: #E8E8E8;
    color: #4A4A4A;
  }

  .product-btn .el-button--info:hover {
    width: 88px;
    background-color: #4a83ff;
    border-color: #4a83ff;
    color: #fff;
  }

  .list {
    margin-top: .5rem;
  }

  .category .el-form-item {
    margin-bottom: 0;
  }
</style>
