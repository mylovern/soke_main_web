<template>
  <div class="wrapper-height">
    <div class="title">Staking</div>
    <div class="all_income">
      <div>累积收益(soke)</div>
      <div>12345678.00</div>
    </div>
    <div class="data_list">
      <div>123456.00</div>
      <div>2021/01/01 12:00:00</div>
    </div>
    <div class="data_list">
      <div>123456.00</div>
      <div>2021/01/01 12:00:00</div>
    </div>
    <div class="data_list">
      <div>123456.00</div>
      <div>2021/01/01 12:00:00</div>
    </div>
    <div class="data_list">
      <div>123456.00</div>
      <div>2021/01/01 12:00:00</div>
    </div>
  </div>
</template>

<script>
import { incomelogs, losslogs } from "../api";
export default {
  mounted() {
    //获取盈利
    incomelogs(localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //获取亏损
    losslogs(localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
}
.all_income {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 0 30px;
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
  }
  & > div:nth-child(2) {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #935ff3;
  }
}
.data_list {
  height: 68px;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  margin-bottom: 20px;

  & > div {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
  }
}
</style>
