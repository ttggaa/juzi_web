<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="根据搜索条件组合查询，如果搜索条件都为空，则查询全部" placement="bottom">
      <el-button size="small" icon="el-icon-search" @click="vm.search()" :loading="vm.btnLoading">搜索</el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    props: ['vm'],
    name: 'my-export'
  }
</script>
