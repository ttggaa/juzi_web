<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="导出数据为根据搜索条件组合查询的结果集，点击“导出”，打开弹窗，输入从哪条数据开始导出" placement="bottom">
      <el-button type="warning" size="small" icon="el-icon-document" @click="exportExcel" :loading="btnLoading">导出</el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'my-export',
    props: ['btnLoading', 'exportParam', 'fn'],
    methods: {
      exportExcel(){
        var vm = this;
        vm.$prompt('请输入从哪条数据开始导出，默认最大导出10000条数据（如：输入1或0，则导出1~10000条数据，如果不足10000条，则导出全部数据）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\d+$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          vm.$message({
            type: 'success',
            message: '正在导出从' + value + '开始的10000条数据，请稍后！'
          });
          var start = value - 1;
          if(start < 0){
            start = 0;
          }
          var startOld = vm.exportParam.start;
          vm.exportParam.start = start;
          window.location.href = vm.$AJAX.formatParam(basePath + vm.fn + "/exportExcel", vm.exportParam);
          vm.exportParam.start = startOld;
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '取消导出'
          });
        });

      }
    }
  }
</script>
