<template>
  <el-row>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 14px;"><i class="el-icon-menu"></i>&nbsp;角色授权</span>
          </div>
          <div class="grid-content bg-purple" style="height: 300px;overflow:auto;">
              <el-tree ref="tree2"
                       :data="treeData"
                       :default-expanded-keys="defaultExpandedKeys"
                       :filter-node-method="filterNode"
                       show-checkbox
                       node-key="id"
                       highlight-current
                       accordion
                       draggable
                       @check-change="handleCheckChange">
              </el-tree>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 14px;"><i class="el-icon-location"></i>&nbsp;权限展示</span>
          </div>
          <div class="grid-content bg-purple" style="height: 300px;overflow:auto;">
            {{labels}}
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'sysPermission2',
  props: ['vm', 'pids', 'plabels'],
  data () {
    return {
      fn: 'sysPermission',
      rootId: 0,
      ids: '',
      labels: '',
      treeData: [],
      defaultExpandedKeys: [0],
      winBtnLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
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
      that.$AJAX.GET(this, that.fn + '/getTree', null, function(response){
        that.treeData.push(response.body.data);
        that.initNodes();
      });
    },
    initNodes(){
      if(this.pids != undefined || this.pids != null){
        var arr = this.pids.split(',');
        var arrInt = [];
        for(var i=0;i<arr.length;i++){
          arrInt[i] = parseInt(arr[i]);
        }
        setTimeout(() => {
          this.$refs.tree2.setCheckedKeys(arrInt);
        }, 500);
      }
    },
    handleCheckChange(data, checked, indeterminate) {
        var that = this;
        var checkedNodesArr = this.$refs.tree2.getCheckedNodes();
        var ids = "";
        var labels = "";
        for(var i=0;i<checkedNodesArr.length;i++){
          var checkedNode = checkedNodesArr[i];
          ids += checkedNode.id;
          labels += checkedNode.label;
          if(i<checkedNodesArr.length-1){
            ids += ",";
            labels += ",";
          }
        }
        that.ids = ids;
        that.labels = labels;
        that.vm.resourceIds = ids;
    }
  },
  mounted: function () {
    this.initTree();
  }
}
</script>
