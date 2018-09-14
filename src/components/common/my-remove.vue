<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="批量删除，需要勾选表格行的多选框，打开弹窗，点击确认后执行批量删除操作" placement="bottom">
      <el-button type="danger" size="small" icon="el-icon-document" @click="open" :loading="btnLoading">删除</el-button>
    </el-tooltip>
    <el-dialog title="确定删除？" :visible.sync="visible" @close="close" width="40%">
      <el-table :data="vm.page.selection" style="width: 100%;text-align: left;">
        <el-table-column prop="arg1" :label="lab1"></el-table-column>
        <el-table-column prop="arg2" :label="lab2"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="channel(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="commit" :loading="winBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'my-model',
    props: ['btnLoading', 'vm', 'lab1', 'lab2', 'fn', 'removeBy'],
    data () {
      return {
        winBtnLoading: false,
        visible: false
      }
    },
    methods: {
      open(){
        if(this.vm.page.selection && this.vm.page.selection.length > 0){
          this.visible = true;
        }else{
          this.$message({message: '请勾选要删除的数据',type: 'warning'});
        }
      },
      close(){
        this.vm.page.selection = [];
        this.vm.$refs.multipleTable.clearSelection();
        this.visible = false;
      },
      channel(row){
        for(var i=0;i<this.vm.page.selection.length;i++){
          if(this.vm.page.selection[i].id == row.id){
            this.vm.page.selection.splice(i,1);
          }
        }
        if(this.vm.page.selection.length == 0){
          this.close();
        }
      },
      commit(){
        var that = this;
        var ids = "";
        for(var i=0;i<that.vm.page.selection.length;i++){
          if(this.removeBy == "name"){
            ids += that.vm.page.selection[i].arg1;
          }else{
            ids += that.vm.page.selection[i].id;
          }
          if(i<that.vm.page.selection.length-1){
            ids += ",";
          }
        }
        var uri = this.fn + '/remove?ids=' + ids;
        this.$AJAX.DELETE(this, uri, function(response){
          that.close();
          that.$emit('search');
        });
      }
    }
  }
</script>
