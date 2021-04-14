<template>
  <div class="wrapper-height">
    <div class="title">记录</div>
    <div class="table_change">
      <div @click="changeshow(0)">
        <div :class="{ active: tableshow == 0 }">购买</div>
      </div>
      <div @click="changeshow(1)">
        <div :class="{ active: tableshow == 1 }">赎回</div>
      </div>
    </div>
    <div v-show="tableshow == 0" class="buy_wrapper">
      <div v-show="fundhis !== null || fundhis.length !== 0">
        <div v-for="(v, i) in fundhis" :key="i" class="data_table">
          <div class="head_data_table">
            <div>{{ v.product.title }}</div>
            <div>
              {{
                v.status == 0
                  ? "未付款"
                  : v.status == 1
                  ? "确认中"
                  : v.status == 2
                  ? "确认成功"
                  : "确认失败"
              }}
            </div>
          </div>
          <div>
            <div>单价(SOKE/份)</div>
            <div>{{ v.unit_price }}</div>
          </div>

          <div>
            <div>周期</div>
            <div>{{ v.period }}</div>
          </div>

          <div>
            <div>支付(SOKE)</div>
            <div>{{ v.amount }}</div>
          </div>
          <div>
            <div>单号</div>
            <div>{{ v.no }}</div>
          </div>
          <div>
            <div>数量</div>
            <div>{{ v.volume }}份</div>
          </div>
          <div>
            <div>购买时间</div>
            <div>{{ v.created_at }}</div>
          </div>
          <div class="redemption_btn">
            <div
              @click="getfundback(v.id, v.unit_price, v.period, v.volume, v.redeem_fee)"
            >
              赎回
            </div>
          </div>
        </div>
        <el-pagination
          :total="allbuy"
          :page-size="10"
          @current-change="pagechangebuy"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>

      <div class="nodata_wrapper" v-show="fundhis == null || fundhis.length == 0">
        <img src="../assets/img/no.png" alt="" />
        <div>暂无数据</div>
      </div>
    </div>

    <div v-show="tableshow == 1" class="redemption">
      <div v-show="fundbackhis !== null || fundbackhis.length !== 0">
        <div v-for="(v, i) in fundbackhis" :key="i" class="data_table">
          <div class="head_data_table">
            <div>{{ v.product.title }}</div>
            <div>
              {{
                v.status == 0
                  ? "未付款"
                  : v.status == 1
                  ? "确认中"
                  : v.status == 2
                  ? "确认成功"
                  : "确认失败"
              }}
            </div>
          </div>
          <div>
            <div>单价(SOKE/份)</div>
            <div>{{ v.unit_price }}</div>
          </div>

          <div>
            <div>周期</div>
            <div>{{ v.period }}</div>
          </div>
          <div>
            <div>手续费</div>
            <div>{{ (v.redeem_fee * 1).toFixed(6) }}</div>
          </div>
          <div>
            <div>支付(SOKE)</div>
            <div>{{ v.amount }}</div>
          </div>
          <div>
            <div>单号</div>
            <div>{{ v.no }}</div>
          </div>
          <div>
            <div>数量</div>
            <div>{{ v.volume }}份</div>
          </div>
          <div>
            <div>赎回时间</div>
            <div>{{ v.created_at }}</div>
          </div>
        </div>
        <el-pagination
          :total="allsell"
          :page-size="10"
          @current-change="pagechangesell"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>

      <div class="nodata_wrapper" v-show="fundbackhis == null || fundbackhis.length == 0">
        <img src="../assets/img/no.png" alt="" />
        <div>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fundhistory, fundbackhistory } from "../api";
export default {
  mounted() {
    fundhistory({ page: 1, per_page: 10 }, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.fundhis = res.data.data;
          this.allbuy = res.data.page.total;
        } else if (res.data.code == 403) {
          this.$message.error(res.data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          this.$router.push("/main");
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fundbackhistory({ page: 1, per_page: 10 }, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.fundbackhis = res.data.data;
          this.allsell = res.data.page.total;
        } else if (res.data.code == 403) {
          this.$message.error(res.data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          this.$router.push("/main");
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
      tableshow: 0,
      fundhis: [],
      fundbackhis: [],
      allbuy: 0,
      allsell: 0,
    };
  },
  methods: {
    changeshow(n) {
      this.tableshow = n;
    },
    getfundback(id, p, m, n, fe) {
      this.$router.push({
        path: "/redemption",
        query: {
          id,
          p,
          m,
          n,
          fe,
        },
      });
    },
    pagechangebuy(e) {
      fundhistory({ page: e, per_page: 10 }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.fundhis = res.data.data;
            this.allbuy = res.data.page.total;
          } else if (res.data.code == 403) {
            this.$message.error(res.data.message);
            localStorage.removeItem("token");
            localStorage.removeItem("address");
            this.$router.push("/main");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pagechangesell(e) {
      fundbackhistory({ page: e, per_page: 10 }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.fundbackhis = res.data.data;
            this.allsell = res.data.page.total;
          } else if (res.data.code == 403) {
            this.$message.error(res.data.message);
            localStorage.removeItem("token");
            localStorage.removeItem("address");
            this.$router.push("/main");
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
.table_change {
  display: flex;
  align-items: center;
  width: 467px;
  height: 68px;
  border: 1px solid #dddce1;
  border-radius: 6px;
  margin-bottom: 20px;
  & > div {
    flex: 1;
    position: relative;
    height: 100%;
    cursor: pointer;
    div {
      line-height: 68px;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
.data_table {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px 28px;
  margin-bottom: 20px;

  & > div:not(:last-child) {
    margin-bottom: 40px;
  }
  & > div:not(:nth-child(1)) {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .head_data_table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    & > div:nth-child(2) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #935ff3;
    }
  }
}
.active {
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  top: -1px;
  border-radius: 6px;
  background: #935ff3;
  line-height: 70px;
  font-weight: bold !important;
  color: #ffffff !important;
}
.redemption_btn {
  display: flex;
  justify-content: flex-end !important;
  & > div {
    width: 100px;
    height: 46px;
    background: #925ff3;
    border-radius: 6px;
    font-size: 16px;
    opacity: 1 !important;
    font-family: Microsoft YaHei;
    font-weight: bold !important;
    color: #ffffff !important;
    line-height: 46px;
    cursor: pointer;
    text-align: center;
  }
}
</style>
