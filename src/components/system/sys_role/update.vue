<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="visible" @close="close" append-to-body>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="ID" v-model="smdParam.id" disabled>
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="编码" v-model="smdParam.code">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="名称" v-model="smdParam.name">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="smdParam.project" filterable placeholder="项目" style="width: 100%;">
            <el-option
              v-for="item in options.project"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <sysPermission2 :vm="this" :pids="smdParam.resourceIds" :plabels="rowData.resourceNames"></sysPermission2>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="commit" :loading="winBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import sysPermission2 from '@/components/system/sys_permission/permission2'

  export default {
    name: 'update',
    props: ['rowData', 'smdParam', 'options', 'fn'],
    components: {
      sysPermission2
    },
    data () {
      return {
        winBtnLoading: false,
        visible: false,
        resourceIds: ''
      }
    },
    methods: {
      open(){
        this.setSmd(this.rowData);
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
        this.resourceIds = '';
      },
      setSmd(row){
        for(var p in this.smdParam){
          this.smdParam[p] = row[p];
        }
      },
      commit(){
        var that = this;
        that.smdParam.resourceIds = that.resourceIds;
        that.$AJAX.PUT(this, that.smdParam, this.fn + '/update', function(response){
          that.close();
          that.$emit('search');
        });
      }
    }
  }
</script>
