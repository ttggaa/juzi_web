<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，选择导入用户信息的Excel文件" placement="bottom">
      <el-button type="info" size="small" icon="el-icon-upload2" @click="open" :loading="btnLoading">导入</el-button>
    </el-tooltip>

    <!-- 【导入Excel】对话框 开始-->
    <el-dialog title="导入Excel格式的数据" :visible.sync="visible" @close="close" width="40%" style="text-align: center">
      <el-upload
        class="upload-demo"
        ref="importExcel"
        drag
        :action="action"
        :before-upload="before"
        :auto-upload="false" :limit="1"
        @close="close"
        :on-success="success"
        :on-error="fail">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传一个.xlsx格式的Excel文件，且不超过2M</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="commit" :loading="winBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【导入Excel】对话框 结束-->

    <!-- 【失败列表】对话框 开始-->
    <el-dialog title="导入失败列表" :visible.sync="failVisible" @close="closeFail" width="50%">
      <el-table :data="failList" style="width: 100%;text-align: left;">
        <el-table-column prop="rowNo" label="Excel行号" width="100"></el-table-column>
        <el-table-column prop="res" label="执行结果" width="100"></el-table-column>
        <el-table-column prop="message" label="失败原因"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFail">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 【失败列表】对话框 结束-->
  </div>
</template>

<script>

  export default {
    name: 'my-import',
    props: ['btnLoading', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false,
        failVisible: false,
        action: basePath + this.fn + '/importExcel',
        failList: []
      }
    },
    methods: {
      open(){
        this.visible = true;
      },
      close(){
        this.visible = false;
        this.$refs.importExcel.clearFiles();
      },
      openFail(){
        this.failVisible = true;
      },
      closeFail(){
        this.failList = [];
        this.failVisible = false;
        this.$emit('search');
      },
      before(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('导入文件大小不能超过 2MB!');
        }
        return isLt2M;
      },
      commit(){
        this.winBtnLoading = true;
        this.$refs.importExcel.submit();
      },
      success(response, file, fileList){
        if(response.code == 200){
          this.failList = response.data.failList;
          this.close();
          if(this.failList.length > 0){
            this.openFail();
          }else{
            this.$message({message: '导入成功', type: 'success'});
            this.$emit('search');
          }
        }else{
          this.$message.error(response.message);
        }
        this.winBtnLoading = false;
      },
      fail(err, file, fileList){
        this.$message.error(err.message);
        this.winBtnLoading = false;
      }
    }
  }
</script>
