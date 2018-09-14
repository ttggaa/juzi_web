<template>
  <div class="text-component-div">
    <el-button @click="dialogVisible = true" type="text" size="small" >删除</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" @close="dialogVisible = false" width="30%" append-to-body>
      <span>确定删除「{{text}}」为「{{value}}」的数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :loading="btnLoading">取 消</el-button>
        <el-button type="primary" @click="delCommit" :loading="btnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'my-delete',
    props: ['text', 'value', 'id', 'fn'],
    data () {
      return {
        btnLoading: false,
        dialogVisible: false
      }
    },
    methods: {
      delCommit(){
        var vm = this;
        var uri = vm.fn + '/delete?id=' + vm.id;
        vm.$AJAX.DELETE(vm, uri, function(response){
          vm.dialogVisible = false;
          vm.$emit('search');
        });
      }
    }
  }
</script>
