<template>
  <div class="wrapper-height">
    <div class="title">
      指数基金
      <div>
        <span @click="changerouter('/fundhistory')">订单记录</span>
        <!-- <span @click="changerouter('/profit-loss')">盈亏</span> -->
      </div>
    </div>
    <div v-for="(v, i) in fundlist" :key="i" class="index_fund">
      <div class="fund_head">
        <img v-show="v.periods[0].profit > 0" src="../assets/img/rise.png" alt="" />
        <img v-show="v.periods[0].profit <= 0" src="../assets/img/decline.png" alt="" />
        <div class="fund_head_percent">
          <div class="percent_data">
            <div @click="tobuyfunds(v.id)">{{ v.title }}</div>
            <div
              :class="[
                { rise_color: v.periods[0].profit > 0 },
                { down_color: v.periods[0].profit <= 0 },
              ]"
            >
              当前年化收益:{{ v.periods[0].profit * 100 }}%
            </div>
          </div>
          <div>
            <el-progress
              :percentage="((v.remain_volume - v.total_volume) / v.total_volume) * 100"
              :color="v.periods[0].profit > 0 ? '#008555' : '#d60f2a'"
            ></el-progress>
          </div>
        </div>
      </div>
      <div class="btn_group">
        <div @click="tobuyfunds(v.id)" style="cursor: pointer">购买</div>
        <!-- <div @click="changerouter('/redemption')" style="cursor: pointer">赎回</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { fundlist } from "../api";
export default {
  mounted() {
    //获取全部的基金
    fundlist(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.fundlist = res.data.data;
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
  data() {
    return {
      fundlist: [],
    };
  },
  methods: {
    tobuyfunds(id) {
      this.$router.push({
        path: "/buy",
        query: {
          id,
        },
      });
    },
    changerouter(p) {
      this.$router.push(p);
    },
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
  & > div:nth-child(1) {
    span {
      cursor: pointer;
    }
    & > span:nth-child(1) {
      margin-right: 16px;
    }
  }
}
.index_fund {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 40px 30px;
}
.fund_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    width: 64px;
    margin-right: 20px;
  }
  .fund_head_percent {
    flex: 1;
    .percent_data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        cursor: pointer;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #008555;
      }
    }
  }
}
.btn_group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > div:nth-child(1) {
    width: 100px;
    height: 46px;
    background: #925ff3;
    border-radius: 6px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 46px;
    cursor: pointer;
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    cursor: pointer;
    font-weight: bold;
    color: #925ff3;
  }
}
</style>
