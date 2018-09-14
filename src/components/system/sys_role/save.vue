<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="open" :loading="vm.btnLoading">新增</el-button>
    </el-tooltip>
    <el-dialog title="新增" :visible.sync="visible" @close="close" width="40%">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="ID" v-model="vm.smdParam.id" disabled>
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="编码" v-model="vm.smdParam.code">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="名称" v-model="vm.smdParam.name">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="vm.smdParam.project" filterable placeholder="项目" style="width: 100%;">
            <el-option
              v-for="item in vm.options.project"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <sysPermission2 :vm="this"></sysPermission2>
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
    name: 'save',
    props: ['vm'],
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
        this.visible = true
      },
      close(){
        this.vm.cleanSmd();
        this.visible =false;
        this.resourceIds = '';
      },
      commit(){
        var that = this;
        that.vm.smdParam.resourceIds = that.resourceIds;
        that.$AJAX.POST(that, that.vm.smdParam, that.vm.fn + '/save', true, function(response){
          that.close();
          that.vm.search();
        });
      }

    }
  }
</script>
