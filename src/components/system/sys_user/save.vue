<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="open" :loading="vm.btnLoading">新增</el-button>
    </el-tooltip>
    <el-dialog title="新增" :visible.sync="visible" @close="close">
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="vm.smdParam.nickName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名（必填）" v-model="vm.smdParam.realName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="手机号（必填）" v-model="vm.smdParam.phone">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="vm.smdParam.idNumber">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-select v-model="vm.smdParam.province" filterable placeholder="省份" style="width: 100%;">
            <el-option
              v-for="item in vm.options.province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="vm.smdParam.city" filterable placeholder="城市" style="width: 100%;">
            <el-option
              v-for="item in vm.options.city"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="微信号" v-model="vm.smdParam.wechat">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="vm.smdParam.qq">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="vm.smdParam.email">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="vm.smdParamExtend.roles" filterable multiple placeholder="角色" style="width: 100%;">
            <el-option
              v-for="item in vm.options.roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-select v-model="vm.smdParam.sellerId" filterable remote :remote-method="querySellerOptions" :loading="loading" clearable placeholder="请选择店铺名称" style="width: 100%;">
              <el-option
                  v-for="item in optionsSeller"
                  :key="item.label"
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
    name: 'save',
    props: ['vm'],
    data () {
      return {
        winBtnLoading: false,
        visible: false,
        loading: false,
        optionsSeller: []
      }
    },
    methods: {
      open(){
        this.visible = true
      },
      close(){
        this.vm.cleanSmd();
        this.visible =false;
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
        if(that.vm.smdParamExtend.roles){
          that.vm.smdParam.roles = that.vm.smdParamExtend.roles.join(',');
        }
        that.$AJAX.POST(that, that.vm.smdParam, that.vm.fn + '/save', true, function(response){
          that.close();
          that.vm.search();
        });
      }

    }
  }
</script>
