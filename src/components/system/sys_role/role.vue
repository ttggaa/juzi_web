<template>
  <div>
    <!-- 搜索条件 开始 -->
    <el-row :gutter="20" style="margin-left:3px;">
      <el-col :span="5">
          <el-input placeholder="编码" prefix-icon="el-icon-search" v-model="searchParam.code" clearable/>
      </el-col>
      <el-col :span="5">
          <el-input placeholder="名称" prefix-icon="el-icon-search" v-model="searchParam.name" clearable/>
      </el-col>
      <el-col :span="5">
          <el-select v-model="searchParam.project" filterable placeholder="项目" style="width: 100%;" clearable>
            <el-option
              v-for="item in options.project"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top:10px;margin-left:10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
        <my-search :vm="this"></my-search>
        <my-reset :vm="this"></my-reset>
        <save :vm="this"></save>
        <my-remove :btnLoading="btnLoading" :vm="this" lab1="编码" lab2="名称" :fn="fn" @search="search"></my-remove>
    </el-row>
    <!-- 按钮 结束-->

    <!-- 表格 开始 -->
    <el-table
      ref="multipleTable"
      :data="page.data"
      stripe
      v-loading="tabLoading"
      class="my-table"
      height="calc(100vh - 340px)"
      @selection-change="pageSelectionChange">
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column type="index" width="50" fixed></el-table-column>
      <el-table-column fixed="left" label="操作" width="120">
        <template slot-scope="scope">
          <update :rowData="scope.row" :smdParam="smdParam" :options="options" @cleanSmd="cleanSmd" @search="search" :fn="fn"></update>
          <my-delete text="名称" :value="scope.row.name" :id="scope.row.id" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="编码" width="120" fixed></el-table-column>
      <el-table-column prop="name" label="名称" width="120" fixed></el-table-column>
      <el-table-column prop="project" label="项目"  width="150" fixed :formatter="projectFmt"></el-table-column>
      <el-table-column prop="resourceNames" label="权限"></el-table-column>
    </el-table>
    <!-- 表格 结束-->

    <!-- 分页 开始 -->
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        :current-page.sync="page.currentPage"
        :page-sizes="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500, 1000]"
        :page-size="searchParam.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!-- 分页 结束 -->
  </div>
</template>

<script>
import MySearch from '@/components/common/my-search'
import MyReset from '@/components/common/my-reset'
import MyDelete from '@/components/common/my-delete'
import MyRemove from '@/components/common/my-remove'
import Save from '@/components/system/sys_role/save'
import Update from '@/components/system/sys_role/update'

export default {
  name: 'sysRole',
  components: {
    MySearch,MyReset,MyDelete,MyRemove,
    Save,Update
  },
  data () {
    return {
      fn: 'sysRole',
      searchParam: {
        start: 0,
        length: 5,
        code: '',
        name: '',
        project: ''
      },
      smdParam: {
        id: '',
        code: '',
        name: '',
        resourceIds: '',
        project: ''
      },
      options: {
        project: [
          {value: 'xls',label: '新零售后台管理系统'},
          {value: 'xls-seller', label: '小程序-商户端'}
        ]
      },
      page: {
        data: [],
        total: 0,
        currentPage: 1,
        selection: []
      },
      tabLoading: true,
      btnLoading: false
    }
  },
  methods: {
    search(){
      var that = this;
      this.$AJAX.GET(this, this.fn + '/page', that.searchParam, function(response){
        that.page.data = response.body.data.data;
        that.page.total = response.body.data.recordsTotal;
      });
    },
    pageSizeChange(val) {
      this.searchParam.length = val;
      this.pageNoChange(this.page.currentPage);
    },
    pageNoChange(val) {
      this.searchParam.start = (val-1)*this.searchParam.length;
      this.search();
    },
    pageSelectionChange(val) {
      this.page.selection = [];
      if(val && val.length > 0){
        for(var i=0;i<val.length;i++){
          var obj = val[i];
          var dist = {};
          dist.id = obj.id;
          dist.arg1 = obj.code;
          dist.arg2 = obj.name
          this.page.selection.push(dist);
        }
      }
    },
    projectFmt(row, column){
      return this.$OPTIONS(row.project, this.options.project);
    },
    cleanSmd(){
      for(var p in this.smdParam){
        this.smdParam[p] = '';
      }
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>
