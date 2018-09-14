<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="visible" @close="close" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12" class="my-head-right">ID：{{smdParam.code || '-'}}</el-col>
        <el-col :span="12" class="my-head-right">创建时间：{{smdParam.createTime || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="smdParam.nickName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="smdParam.realName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="smdParam.phone">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="smdParam.idNumber">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-select v-model="smdParam.province" filterable placeholder="省份" style="width: 100%;">
            <el-option
              v-for="item in options.province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="smdParam.city" filterable placeholder="城市" style="width: 100%;">
            <el-option
              v-for="item in options.city"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="微信号" v-model="smdParam.wechat">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="smdParam.qq">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="smdParam.email">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="smdParamExtend.roles" filterable multiple placeholder="角色" style="width: 100%;">
            <el-option
              v-for="item in options.roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-select v-model="smdParam.sellerId" remote :remote-method="querySellerOptions" :loading="loading" placeholder="请选择店铺名称" style="width: 100%;">
            <el-option
              v-for="item in optionsSeller"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
  export default {
    name: 'update',
    props: ['rowData', 'smdParam', 'options', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false,
        loading: false,
        smdParamExtend: {
          roles: [],
        },
        optionsSeller: []
      }
    },
    methods: {
      open(){
        this.setSmd(this.rowData);
        if(this.rowData.roles){
          this.smdParamExtend.roles = this.rowData.roles.split(',');
        }
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
      },
      setSmd(row){
        for(var p in this.smdParam){
          this.smdParam[p] = row[p];
          if('sellerName' == p){
            this.querySellerOptions(row[p]);
          }
        }
      },
      querySellerOptions(query) {
        var that = this;
        if(query !== ''){
          that.loading = true;
          that.$axios.HttpGet('/api/seller/options?name='+query,
            {}
          )
            .then((data) => {
              that.loading = false;
              that.optionsSeller = data.data;
            });
        }
      },
      commit(){
        var that = this;
        if(that.smdParamExtend.roles){
          that.smdParam.roles = that.smdParamExtend.roles.join(',');
        }
        that.$AJAX.PUT(this, that.smdParam, this.fn + '/update', function(response){
          that.close();
          that.$emit('search');
        });
      }
    }
  }
</script>
