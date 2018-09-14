<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
}
/**
  引入设置图标字体
 */
.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1.2em; height: 1.2em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
     normalize.css 中也包含这行 */
  overflow: hidden;
  margin-right: 0.5rem;
}
</style>
