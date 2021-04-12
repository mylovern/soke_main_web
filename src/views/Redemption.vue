<template>
  <div class="wrapper-height">
    <div class="title">主流指数追踪基金</div>
    <div class="table_data">
      <div class="head">
        <div>赎回</div>
        <div>手续费(SOKE): <span>12121.00</span></div>
      </div>
      <div class="num">
        <div>{{ n }}</div>
        <div>份</div>
      </div>
      <div class="month">
        <div>
          基金周期: <span>{{ m }}月</span>
        </div>
        <div>金额(SOKE):{{ n * p }}</div>
      </div>
    </div>
    <div class="notice">
      备注: <br />
      SOKE定期基金赎回时会根据您的周期，计算出需要支付的手续费；计算方式：XXX
    </div>
    <div @click="checkrep()" class="sure_btn">确定赎回</div>
  </div>
</template>

<script>
import { rewardfunds } from "../api";
export default {
  mounted() {
    this.id = this.$route.query.id;
    this.m = this.$route.query.p;
    this.p = this.$route.query.m;
    this.n = this.$route.query.n;
  },
  data() {
    return {
      id: undefined,
      p: undefined,
      m: undefined,
      n: undefined,
    };
  },
  methods: {
    checkrep() {
      rewardfunds({ id: this.id }, localStorage.getItem("token"))
        .then((res) => {
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
.table_data {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 40px;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
    }
  }
  .num {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  .month {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div:nth-child(1) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
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
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #f4effe;
  text-align: center;
  line-height: 68px;
  cursor: pointer;
}
</style>
