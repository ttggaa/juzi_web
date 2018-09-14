<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="点击下载导入用户信息的excel模板" placement="bottom">
      <el-button type="success" size="small" icon="el-icon-download" @click="downloadExcelModel" :loading="btnLoading">模板</el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'my-model',
    props: ['btnLoading','name'],
    methods: {
      downloadExcelModel(){
        window.location.href = "/static/excel/"+this.name+".xlsx";
      }
    }
  }
</script>
