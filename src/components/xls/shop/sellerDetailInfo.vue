<template>
  <div class="category">
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">店铺编码：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{seller.sellerCode}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">店铺名称：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{seller.sellerName}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">审核状态：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{auditStatusText}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户店铺地址</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">省市区：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerAddress.addAll}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">详细地址：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerAddress.addressInfo}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户审批信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">总额度：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerApproval.quota}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">首月授信额度：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerApproval.firstLimitQuota}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">每月限额：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerApproval.limitQuota}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">审批通过时间：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerApproval.approvalime}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">crm流水号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerApproval.serialumber}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户品类品牌</span>
      </div>
      <div>
        <el-table v-if="sellerCateBrandList"
          :data="sellerCateBrandList"
          size="min"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="cateName"
            label="品类"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户公司信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">开户行账户名称：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.bankUser}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">开户行：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.bankName}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">开户行支行名称：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.bankNameBranch}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">银行账号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.bankCode}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">实际负责人身份证号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.responsiblePersonIdCard}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">实际负责人手机号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerCompany.responsiblePersonMobile}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户结算扣点信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">扣点百分比：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerSettlePoint.settlePoint}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户单笔授信信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">是否开启单笔授信：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{isOpenText}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户门店经营基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">门店联系人姓名：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerStore.storeContacts}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">门店联系人职位：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerStore.storeContactsPosition}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">门店联系人手机号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerStore.storeContactsMobile}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">门店联系人手机号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerStore.storeContactsMobile}}</div></el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:98%;margin-left:1%;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">商户分期设定信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">期数：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerTerm.term}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">月利率：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerTerm.monthRate}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">门店联系人手机号：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerTerm.afterDiscountRate}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">折扣百分比：</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light">{{sellerTerm.discount}}</div></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "sellerDetailInfo.vue",
      data() {
        return {
          infoData: '',
          seller: {},
          sellerAddress: {},
          sellerApproval: {},
          sellerCateBrandList: [],
          sellerCompany:{},
          sellerSettlePoint: {},
          sellerSingleCredit: {},
          sellerStore: {},
          sellerTerm: {},
          auditStatusText: '',
          isOpenText: '',
          options: {
            auditStatus: [
              {"value":1,"label":"待审核"},
              {"value":2,"label":"审核通过"},
              {"value":3,"label":"冻结"}
            ]
          }
        }
      },
      methods: {
        init(){
          var sellerId = this.$route.params.sellerId;
          this.$axios.HttpGet('/api/seller/sellerDetailInfo/' + sellerId,
            {}
          )
            .then((data) => {
              this.infoData = data.data;
              if(this.infoData){
                this.seller = this.infoData.seller;
                this.sellerAddress = this.infoData.sellerAddress;
                this.sellerApproval = this.infoData.sellerApproval;
                this.sellerCateBrandList = this.infoData.sellerCateBrandList;
                this.sellerCompany = this.infoData.sellerCompany;
                this.sellerSettlePoint = this.infoData.sellerSettlePoint;
                this.sellerSingleCredit = this.infoData.sellerSingleCredit;
                this.sellerStore = this.infoData.sellerStore;
                this.sellerTerm = this.infoData.sellerTerm;
                this.auditStatusText = this.$OPTIONS(this.seller.auditStatus, this.options.auditStatus);
                this.sellerCompany.bankCode = '***';
                this.sellerCompany.responsiblePersonIdCard = '***';
                if(this.sellerSingleCredit.isOpen == '0'){
                  this.isOpenText = '未开启';
                }else if(this.sellerSingleCredit.isOpen == '1'){
                  this.isOpenText = '已开启';
                }
              }
            });
        }
    },
      mounted: function () {
        this.init()
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .el-row {
    font-size:14px;
    margin-top:7px;
    margin-bottom:7px;
  }
  .el-card {
    width:98%;
    margin-left:1%;
    margin-top:5px;
    margin-bottom:5px;
  }
</style>
