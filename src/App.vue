<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("./assets/CSS/reset.css");
@import url("./assets/CSS/animate.min.css");
.wrapper-height {
  min-height: 78vh;
}
.el-progress__text {
  display: none;
}
.el-progress-bar {
  padding-right: 0;
}
.el-message--success {
  top: 20px !important;
}
.rise_color {
  color: #008555 !important;
}
.down_color {
  color: #d60f2a !important;
}
.rise_color_bg {
  background: #008555 !important;
}
.down_color_bg {
  background: #d60f2a !important;
}
.nodata_wrapper {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nodata_wrapper img {
  margin-bottom: 20px;
}
</style>
