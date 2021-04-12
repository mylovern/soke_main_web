<template>
  <div class="wrapper-height">
    <div class="title">主流指数追踪基金</div>
    <div class="data_table">
      <div class="table_title">
        <div>总量：{{ allfundnum }}份，已售{{ allfundnum - remain_volume }}份</div>
        <div>
          {{ (((remain_volume - allfundnum) / allfundnum) * 100).toFixed(2) * 1 }}%
        </div>
      </div>
      <div class="percent">
        <el-progress :percentage="percent" color="#945EF2"></el-progress>
      </div>
      <div class="price">
        <div>单价(SOKE/份)</div>
        <div>{{ unit_price }}</div>
      </div>
      <div class="rate_of_return">
        <div>当前年化收益</div>
        <div>{{ profit }}%</div>
      </div>
      <div class="buy_num">
        <div>买入</div>
        <div class="num">
          <div>
            <el-input-number v-model="num" :min="1" label="描述文字"></el-input-number>
          </div>
          <div>份</div>
        </div>
      </div>

      <div class="time">
        <div>周期</div>
        <div class="time_list">
          <div
            :class="{ active: mon == v.period }"
            @click="changemon(v.period)"
            v-for="(v, i) in periods"
            :key="i"
          >
            {{ v.period }}月
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="pay">
        <div>支付</div>
        <div>{{ num * unit_price }}</div>
        <div>SOKE</div>
      </div>
    </div>
    <div class="notice">
      备注: <br />
      1.SOKE定期基金提供可选择不同周期产品，不同周期产品相应的收益也会不同；周期越长返利越高<br />
      2.每期产品份数售罄后开始计算周期，到相应周期后会陆续返利到账户
    </div>
    <div @click="buyfund()" class="sure_btn">确定购买</div>
  </div>
</template>

<script>
import { fundlist, orderfunds } from "../api";
export default {
  mounted() {
    this.id = this.$route.query.id;
    //获取全部的基金
    fundlist(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          for (let v of res.data.data) {
            if (v.id == this.id) {
              this.allfundnum = v.total_volume;
              this.remain_volume = v.remain_volume;
              this.periods = v.periods;
              this.unit_price = v.unit_price;
              this.percent = ((v.remain_volume - v.total_volume) / v.total_volume) * 100;
              this.profit = v.periods[0].profit * 100;
            }
          }
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
      allfundnum: 0,
      remain_volume: 0,
      unit_price: 0,
      periods: [],
      num: 0,
      percent: 0,
      profit: 0,
      mon: undefined,
      id: undefined,
    };
  },
  methods: {
    changemon(n) {
      if (n == this.mon) {
        this.mon = undefined;
      } else {
        this.mon = n;
        for (let v of this.periods) {
          if (n == v.period) {
            this.profit = v.profit * 100;
          }
        }
      }
    },
    buyfund() {
      orderfunds(
        { id: this.id, volume: this.num, period: this.mon == undefined ? 3 : this.mon },
        localStorage.getItem("token")
      )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
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
.data_table {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 40px;
}
.table_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #935ff3;
  }
}
.percent {
  margin-bottom: 40px;
}
.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }
}
.buy_num {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
  }
  .num {
    display: flex;
    align-items: center;
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      margin-left: 6px;
    }
  }
}
.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
  }
  .time_list {
    display: flex;

    & > div {
      padding: 10px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      border: 1px solid #bfbfbf;
      border-radius: 6px;
      margin-left: 14px;
      cursor: pointer;
    }
  }
}
.line {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 42px;
}
.pay {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  & > div:nth-child(1) {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    margin-right: 10px;
  }
  & > div:nth-child(2) {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #8a4096;
    margin-right: 10px;
  }
  & > div:nth-child(3) {
    color: #d4d4d4;
    font-size: 12px;
  }
}
.notice {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #935ff3;
  margin-bottom: 60px;
}
.sure_btn {
  height: 68px;
  background: #925ff3;
  border-radius: 6px;
  text-align: center;
  line-height: 68px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #f4effe;
  cursor: pointer;
  margin-bottom: 40px;
}
.rate_of_return {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.7;
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }
}
/deep/ .el-input__inner {
  border: 1px solid #bfbfbf !important;
  border-radius: 4px !important;
  background: #fff !important;
}
/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
  background: #fff !important;
  color: #000;
}
.active {
  background: #925ff3 !important;
  color: #fff !important;
  border: 1px solid #925ff3 !important;
}
</style>
