<template>
  <div class="wrapper-height">
    <div class="title">基金盈亏</div>
    <div class="all_income">
      <div>总盈亏(SOKE)</div>
      <div>12345678.00</div>
    </div>
    <div class="data_list">
      <div>
        <div>主流指数追踪基金</div>
        <div>+123456.00</div>
      </div>
      <div>2021/01/01 12:00:00</div>
    </div>
  </div>
</template>

<script>
import { fundreward } from "../api";
export default {
  mounted() {
    fundreward(localStorage.getItem("token"))
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
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    & > div:nth-child(1) {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #008555;
    }
  }

  & > div:nth-child(2) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    text-align: right;
  }
}
</style>
