<template>
    <div>
      <div class="content-header">{{queryTitle}}</div>
    </div>
</template>
<script>
    import ElHeader from "../../node_modules/element-ui/packages/header/src/main.vue";
    export default {
        data() {
            return {
                title: 1
            }
        },
        props: {
            // 父组件传过来的值
          queryTitle: String
        },
        components: {
          ElHeader
          // 引入其他组件
        },
        beforeCreate: function () {
            // 组件创建前
        },
        created: function () {
            // 组件创建时执行
        },
        beforeMount: function () {
        },
        mounted: function () {
            // 组件挂载结束
        },
        beforeUpdate: function () {
            // 组件挂载结束
        },
        updated: function () {
            // 组件挂载结束
        },
        beforeDestroy: function () {
            // 组件挂载结束
        },
        destroyed: function () {
        },
        computed: {
            // 计算属性
        },
        methods: {
            // 自定义方法
        }
    }
</script>
<style scoped>
  .content-header{
    position: relative;
    background-color: #E8E8E8;
    color: #4A4A4A;
    line-height: 42px;
    height:42px;
    width: 96%;
    margin-left: 6px;
    padding-left: 16px;
    font-size: 16px;
  }
</style>
