<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">查看</el-button>
    <el-dialog title="查看" :visible.sync="visible" width="60%" @close="close" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">ID：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.code || '-'}}</el-col>
        <el-col :span="3" class="my-head">用户名：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.nickName || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">姓名：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.realName || '-'}}</el-col>
        <el-col :span="3" class="my-head">密码：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.password || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">手机号：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.phone || '-'}}</el-col>
        <el-col :span="3" class="my-head">身份证号：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.idNumber || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">省份：</el-col>
        <el-col :span="9" class="my-content">{{rowData.provinceLabel || '-'}}</el-col>
        <el-col :span="3" class="my-head">城市：</el-col>
        <el-col :span="9" class="my-content">{{rowData.cityLabel || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">微信：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.wechat || '-'}}</el-col>
        <el-col :span="3" class="my-head">QQ：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.qq || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">Email：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.email || '-'}}</el-col>
        <el-col :span="3" class="my-head">角色：</el-col>
        <el-col :span="9" class="my-content">{{$OPTIONS2(smdParam.roles,options.roles) || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">创建时间：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.createTime || '-'}}</el-col>
        <el-col :span="3" class="my-head">关联店铺</el-col>
        <el-col :span="9" class="my-content">{{smdParam.sellerName || '-'}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: ['rowData', 'smdParam', 'options'],
    data () {
      return {
        visible: false
      }
    },
    methods: {
      open() {
        this.setSmd(this.rowData);
        this.visible = true;
      },
      close(){
        this.$emit('cleanSmd');
        this.visible = false;
      },
      setSmd(row){
        for(var p in this.smdParam){
          this.smdParam[p] = row[p];
        }
      }
    }
  }
</script>
