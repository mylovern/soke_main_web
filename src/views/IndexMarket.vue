<template>
  <div class="wrapper-height">
    <div class="title">
      指数市场 <span @click="changerouter('/trade')">订单记录</span>
      <!-- <span @click="changerouter('/profit-loss')">盈亏</span> -->
    </div>
    <div class="index_market">
      <div v-for="(v, i) in mainstream" :key="i">
        <div style="cursor: pointer" @click="tocharts(v.id)">{{ v.title }}</div>
        <div   :class="[
            { rise_color_bg: v.quote_change > 0 },
            { down_color_bg: v.quote_change <= 0 },
          ]" @click="tocharts(v.id)" style="cursor: pointer">
          {{ (v.quote_change * 100).toFixed(1) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allIndex } from "../api";
export default {
  mounted() {
    // 获取全部的指数
    allIndex(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.mainstream = res.data.data;
        } else if (res.data.code == 403) {
          this.$message.error(res.data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          this.$router.push('/main')
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    tocharts(id) {
      this.$router.push({
        path: "/charts",
        query: {
          id,
        },
      });
    },
    changerouter(p) {
      this.$router.push(p);
    },
  },
  data() {
    return {
      mainstream: [],
    };
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    margin-left: 20px;
    cursor: pointer;
  }
}
.index_market {
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    background: #ffffff;
    box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
    border-radius: 6px;
    padding: 0 30px;
    margin-bottom: 20px;
    & > div:nth-child(1) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    & > div:nth-child(2) {
      width: 120px;
      height: 46px;
      background: #008555;
      border-radius: 6px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      line-height: 46px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
