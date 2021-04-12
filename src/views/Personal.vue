<template>
  <div class="wrapper-height">
    <div class="title">个人明细</div>
    <div class="choice_table">
      <div @click="changeTable(0)">
        <div :class="{ active: shownum == 0 }">算力挖矿</div>
      </div>
      <div @click="changeTable(1)">
        <div :class="{ active: shownum == 1 }">指数盈亏</div>
      </div>
      <div @click="changeTable(2)">
        <div :class="{ active: shownum == 2 }">做市盈亏</div>
      </div>
      <div @click="changeTable(3)">
        <div :class="{ active: shownum == 3 }">基金收益</div>
      </div>
    </div>
    <div v-show="shownum == 0" class="data_list">
      <div v-for="(v, i) in powerlist" :key="i">
        <div>{{ v.reward }}</div>
        <div>{{ v.created_at }}</div>
      </div>
    </div>
    <div v-show="shownum == 1" class="data_list">
      <div v-for="(v, i) in contractlist" :key="i">
        <div>{{ v.reward }}</div>
        <div>{{ v.created_at }}</div>
      </div>
    </div>
    <div v-show="shownum == 2" class="data_list">
      <div v-for="(v, i) in marketlist" :key="i">
        <div>{{ v.reward }}</div>
        <div>{{ v.created_at }}</div>
      </div>
    </div>
    <div v-show="shownum == 3" class="data_list">
      <div v-for="(v, i) in fundloss" :key="i">
        <div>{{ v.reward }}</div>
        <div>{{ v.created_at }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fundreward, powerrewrad, marketrewrad, contractrewrad } from "../api";
export default {
  data() {
    return {
      shownum: 0,
      fundloss: [],
      powerlist: [],
      marketlist: [],
      contractlist: [],
    };
  },
  mounted() {
    marketrewrad(localStorage.getItem("token"))
      .then((res) => {
        this.marketlist = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    contractrewrad(localStorage.getItem("token"))
      .then((res) => {
        this.marketlist = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    powerrewrad(localStorage.getItem("token"))
      .then((res) => {
        this.powerlist = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    fundreward(localStorage.getItem("token"))
      .then((res) => {
        this.fundloss = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changeTable(n) {
      this.shownum = n;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper-height {
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
  width: 920px;
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
  & > div:last-child {
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
