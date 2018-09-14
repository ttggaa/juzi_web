<template>
  <el-row>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-menu"></i>&nbsp;权限</span>
          </div>
          <div class="grid-content bg-purple" style="height: calc(100vh - 300px);overflow:auto;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
            <el-tree ref="tree"
                     :data="treeData"
                     :default-expanded-keys="defaultExpandedKeys"
                     :filter-node-method="filterNode"
                     show-checkbox
                     check-strictly
                     node-key="id"
                     highlight-current
                     accordion
                     draggable
                     @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-location"></i>&nbsp;当前节点信息</span>
          </div>
          <div class="grid-content bg-purple-light" :style="currentDivStyle">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.id" disabled></el-input>
              </el-col>
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.label"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">类型：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.type" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row"  style="margin-top:10px;">
              <el-col :span="4" class="col-left">URL：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.url"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="currentNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">icon：</el-col>
              <el-col :span="8">
                <el-select v-model="currentNodeData.icon" filterable placeholder="图标" style="width: 100%;">
                  <el-option
                    v-for="item in options.icon"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" class="col-left">图标预览：</el-col>
              <el-col :span="8">
                <div style="padding-top:10px; font-size:24px;">
                  <i :class="currentNodeData.icon"></i>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:5px;">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-tooltip class="item" effect="dark" content="点击“子节点”按钮，展开或关闭新增子节点的页面" placement="bottom">
                  <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showChildRow" @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                  <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showChildRow"  @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“兄弟节点”按钮，展开或关闭新增兄弟节点的页面" placement="bottom" v-if="currentNodeData.id != 0">
                  <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showBotherRow && currentNodeData.level != 0" @click="showBotherRowClick" :loading="winBtnLoading">兄弟节点</el-button>
                  <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showBotherRow && currentNodeData.level != 0"  @click="showBotherRowClick" :loading="winBtnLoading">兄弟节点</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“修改”按钮，修改当前节点" placement="bottom">
                  <el-button type="primary" size="small" plain @click="updateNode" :loading="winBtnLoading">修改</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“删除”按钮，删除选中的节点及其子节点" placement="bottom">
                  <el-button type="danger" size="small" plain @click="deleteCheckedKeys" :loading="winBtnLoading">删除</el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showChildRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增子节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.label"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">类型：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.type" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">URL：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.url"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="childNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">icon：</el-col>
              <el-col :span="8">
                <el-select v-model="childNodeData.icon" filterable placeholder="图标" style="width: 100%;">
                  <el-option
                    v-for="item in options.icon"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" class="col-left">图标预览：</el-col>
              <el-col :span="8">
                <div style="padding-top:10px; font-size:24px;">
                  <i :class="childNodeData.icon"></i>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row" style="margin-top:10px;">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveChildNodeData" :loading="winBtnLoading">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showBotherRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增兄弟节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.label"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">类型：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.type" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">URL：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.url"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="botherNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">icon：</el-col>
              <el-col :span="8">
                <el-select v-model="botherNodeData.icon" filterable placeholder="图标" style="width: 100%;">
                  <el-option
                    v-for="item in options.icon"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" class="col-left">图标预览：</el-col>
              <el-col :span="8">
                <div style="padding-top:10px; font-size:24px;">
                  <i :class="botherNodeData.icon"></i>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveBotherNodeData" :loading="winBtnLoading">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'sysArea',
  data () {
    return {
      fn: 'sysPermission',
      rootId: 0,
      filterText: '',
      treeData: [],
      options: {
        available: [
          {value: true,label: '可用'},
          {value: false,label: '不可用'}
        ],
        icon: [
          {value: 'el-icon-document',label: 'el-icon-document'},
          {value: 'el-icon-menu',label: 'el-icon-menu'}
        ]
      },
      currentNodeData: {
        id: '',
        parentId: '',
        label: '',
        type: '',
        url: '',
        available: '',
        children: [],
        icon: ''
      },
      childNodeData: {
        id: '',
        parentId: '',
        label: '',
        type: '',
        url: '',
        available: '',
        children: [],
        icon: ''
      },
      botherNodeData: {
        id: '',
        parentId: '',
        label: '',
        type: '',
        url: '',
        available: '',
        children: [],
        icon: ''
      },
      showChildRow: false,
      showBotherRow: false,
      defaultExpandedKeys: [0],
      winBtnLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    currentDivStyle: function () {
      if(this.showChildRow == false && this.showBotherRow == false){
        return 'height: calc(100vh - 310px);font-size:14px;';
      }else{
        return 'height: calc(50vh - 190px);font-size:14px;';
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    initTree(){
      var that = this;
      that.treeData = [];
      that.showChildRow = false;
      that.showBotherRow = false;
      that.$AJAX.GET(this, that.fn + '/getTree', null, function(response){
        that.currentNodeData = response.body.data;
        that.treeData.push(that.currentNodeData);
      });
    },
    initIconOptions(){
      var that = this;
      // that.$AJAX.GET(that, 'option/icon', null, function(response){
      //   that.options.icon = response.body.data;
      // });
    },
    expandNode(key){
      this.defaultExpandedKeys = [];
      this.defaultExpandedKeys.push(0);
      if(key){
        this.defaultExpandedKeys.push(key);
      }
    },
    handleNodeClick(data){
      this.currentNodeData = data;
      this.childNodeData.parentId = this.currentNodeData.id;
      this.botherNodeData.parentId = this.currentNodeData.parentId;
    },
    showChildRowClick(){
      this.resetChildNodeData();
      this.childNodeData.parentId = this.currentNodeData.id;
      this.childNodeData.type = this.getChildType();
      this.childNodeData.available = true;
      this.showChildRow = !this.showChildRow;
      this.showBotherRow = false;
    },
    showBotherRowClick(){
      this.resetBotherNodeData();
      this.botherNodeData.parentId = this.currentNodeData.parentId;
      this.botherNodeData.type = this.currentNodeData.type;
      this.botherNodeData.available = true;
      this.showBotherRow = !this.showBotherRow;
      this.showChildRow = false;
    },
    getChildType(){
      if(this.currentNodeData.type == 'root'){
        return 'branch';
      }
      if(this.currentNodeData.type == 'branch'){
        return 'leaf';
      }
      if(this.currentNodeData.type == 'leaf'){
        return 'button';
      }
      return '';
    },
    resetCurrentNodeData(){
      this.currentNodeData.id = '';
      this.currentNodeData.parentId = '';
      this.currentNodeData.label = '';
      this.currentNodeData.type = '';
      this.currentNodeData.url = '';
      this.currentNodeData.available = '';
      this.currentNodeData.children = [];
      this.currentNodeData.icon = '';
    },
    resetChildNodeData(){
      this.childNodeData.id = '';
      this.childNodeData.parentId = '';
      this.childNodeData.label = '';
      this.childNodeData.type = '';
      this.childNodeData.url = '';
      this.childNodeData.available = '';
      this.childNodeData.children = [];
      this.childNodeData.icon = '';
    },
    resetBotherNodeData(){
      this.botherNodeData.id = '';
      this.botherNodeData.parentId = '';
      this.botherNodeData.label = '';
      this.botherNodeData.type = '';
      this.botherNodeData.url = '';
      this.botherNodeData.available = '';
      this.botherNodeData.children = [];
      this.botherNodeData.icon = '';
    },
    setCurrentNodeData(id){
      var that = this;
      that.$AJAX.GET(that, that.fn + '/getById', null, function(response){
        that.currentNodeData = response.body.data;
      });
    },
    saveChildNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.childNodeData, that.fn + '/save', true, function(response){
        that.initTree();
        that.expandNode(that.childNodeData.parentId);
      });
    },
    saveBotherNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.botherNodeData, that.fn + '/save', true, function(response){
        that.initTree();
        that.expandNode(that.botherNodeData.parentId);
      });
    },
    updateNode(){
      var that = this;
      var params = [];
      params.push(that.currentNodeData);
      that.$AJAX.PUT(that, params, that.fn + '/update', function(response){
        that.initTree();
        that.expandNode(that.currentNodeData.parentId);
      });
    },
    deleteCheckedKeys(){
      var checkedKeysArr = this.$refs.tree.getCheckedKeys();
      if(!checkedKeysArr || checkedKeysArr.length == 0){
        this.$message({
          type: 'info',
          message: '请勾选要删除的节点'
        });
        return;
      }
      var checkedKeys = "";
      for(var i=0;i<checkedKeysArr.length;i++){
        var checkedKey = checkedKeysArr[i];
        if(checkedKey != 0){
          checkedKeys += checkedKey;
        }
        if(i<checkedKeysArr.length-1){
          checkedKeys += ",";
        }
      }
      var that = this;
      this.$confirm('此操作将永久删除勾选的节点及其子节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$AJAX.DELETE(that, that.fn + '/delete?ids=' + checkedKeys, function(response){
          that.initTree();
          that.expandNode();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  mounted: function () {
    this.initTree();
    this.initIconOptions();
  }
}
</script>
