<template>
  <div class="wrapper-height">
    <div class="title">全局数据统计详情</div>
    <div class="choice_table">
      <div @click="changeTable(0)">
        <div :class="{ active: shownum == 0 }">SOKE矿池</div>
      </div>
      <div @click="changeTable(1)">
        <div :class="{ active: shownum == 1 }">SOKE做市资金池</div>
      </div>
      <div @click="changeTable(2)">
        <div :class="{ active: shownum == 2 }">SOKE激励池</div>
      </div>
    </div>
    <div class="data_list">
      <div>
        <div>123456.00</div>
        <div>2021/01/01 12:00:00</div>
      </div>

      <div>
        <div>123456.00</div>
        <div>2021/01/01 12:00:00</div>
      </div>

      <div>
        <div>123456.00</div>
        <div>2021/01/01 12:00:00</div>
      </div>

      <div>
        <div>123456.00</div>
        <div>2021/01/01 12:00:00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shownum: 0,
    };
  },
  methods: {
    changeTable(n) {
      this.shownum = n;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper{
   min-height: 78vh;
}
.title {
  padding-top: 40px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
}
.choice_table {
  width: 690px;
  height: 68px;
  border: 1px solid #dddce1;
  border-radius: 6px;
  display: flex;
  margin-bottom: 20px;
  & > div {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > div {
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.7);
      width: 230px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  & > div:nth-child(3) {
    div {
      border-right: none;
    }
  }
}
.data_list {
  & > div {
    height: 68px;
    background: #ffffff;
    box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 20px;
    & > div {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
    }
  }
}
.active {
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  top: -1px;
  line-height: 68px;
  background: #935ff3;
  color: #ffffff !important;
  font-weight: bold !important;
  border-radius: 6px;
}
</style>
