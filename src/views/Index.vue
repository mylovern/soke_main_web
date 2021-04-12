<template>
  <div class="wrapper-height">
    <div class="title">指数</div>
    <div class="table_data">
      <div class="title">
        <div>SOKE-MAIN</div>
        <div>杠杆倍数20X <img src="../assets/menu1.png" alt="" /></div>
      </div>
      <div class="limit">
        <span
          @click="changepricetype('limit')"
          :class="{ changetype: price_type == 'limit' }"
          >限价委托</span
        >
        <span
          :class="{ changetype: price_type == 'market' }"
          @click="changepricetype('market')"
          >市价委托</span
        >
      </div>
      <div class="input_wrapper">
        <div>
          <input :disabled="price_type == 'market'" v-model="price" type="text" />
          <span>SOKE</span>
        </div>
        <div>
          <input v-model="num" type="text" />
          <span>手</span>
        </div>
      </div>
      <div class="percent_table">
        <div>
          <div v-show="price !== '市价'" class="percent_btn">
            <div
              @click="changebuypercent('25')"
              :class="{ percentactive: buypercent == 25 }"
            >
              25%
            </div>
            <div
              :class="{ percentactive: buypercent == 50 }"
              @click="changebuypercent('50')"
            >
              50%
            </div>
            <div
              :class="{ percentactive: buypercent == 75 }"
              @click="changebuypercent('75')"
            >
              75%
            </div>
            <div
              :class="{ percentactive: buypercent == 100 }"
              @click="changebuypercent('100')"
            >
              100%
            </div>
          </div>
        </div>

        <div @click="openbuytable()" class="buy_btn">买入做多(看涨)</div>
      </div>
      <!-- <div class="cost">
        <div>做多成本</div>
        <div>0.00SOKE</div>
      </div> -->
      <div class="sell_wrapper">
        <div>
          <div v-show="price !== '市价'" class="sell_btn_wrapper">
            <div
              @click="changesellpercent('25')"
              :class="{ percentactive: sellpercent == 25 }"
            >
              25%
            </div>
            <div
              :class="{ percentactive: sellpercent == 50 }"
              @click="changesellpercent('50')"
            >
              50%
            </div>
            <div
              :class="{ percentactive: sellpercent == 75 }"
              @click="changesellpercent('75')"
            >
              75%
            </div>
            <div
              :class="{ percentactive: sellpercent == 100 }"
              @click="changesellpercent('100')"
            >
              100%
            </div>
          </div>
        </div>

        <div @click="openselltable()">卖出做空(看跌)</div>
      </div>
      <!-- <div class="list_wrapper">
        <div>做空成本(SOKE)</div>
        <div>12121.00</div>
      </div> -->
      <div v-show="price !== '市价'" class="list_wrapper">
        <div>冻结保证金</div>
        <div>{{ ((price == undefined ? 0 : price) * num) / 20 }} SOKE</div>
      </div>
      <div class="list_wrapper">
        <div>可用余额(SOKE)</div>
        <div>{{ mydata.balance }}</div>
      </div>
    </div>
    <div class="changeTable">
      <div>
        <div @click="changetableshow(0)" :class="{ changetype: nowshow == 0 }">
          当前仓位
        </div>
        <div @click="changetableshow(1)" :class="{ changetype: nowshow == 1 }">
          当前委托({{ nowlist }})
        </div>
      </div>
      <div @click="changerouter('/trade')">
        更多交易记录 <img src="../assets/img/Jump.png" alt="" />
      </div>
    </div>
    <!-- 当前仓位 -->
    <div v-show="nowshow == 0" class="table_wrapper">
      <div v-for="(v, i) in position" :key="i" class="now_table">
        <div class="now_table_title">
          <div class="position_status" v-show="v.direction == 'buy'">多仓</div>
          <div class="position_status" v-show="v.direction == 'sell'">空仓</div>
          <div>
            {{ v.index.sub_title }}({{ v.lever }}X)
            {{ (v.position_volume * 1).toFixed(2) }}手
          </div>
        </div>
        <div class="data_list_now">
          <div class="soke_value">
            <div>{{ (v.position_volume * 1).toFixed(2) }}</div>
            <div>持仓量(手)</div>
          </div>
          <div class="soke_av">
            <div>{{ v.open_price }}</div>
            <div>开仓均价(SOKE)</div>
          </div>
          <div class="soke_Unsettlement">
            <div>
              <p
                :class="[
                  { rise_color: v.profit_unreal > 0 },
                  { down_color: v.profit_unreal <= 0 },
                ]"
              >
                {{ v.profit_unreal }}
              </p>
            </div>
            <div>未结算盈亏(SOKE)</div>
          </div>
        </div>
        <div class="data_list_second">
          <div>
            <div>{{ v.position_amount }}</div>
            <div>保证金(SOKE)</div>
          </div>

          <div>
            <div>{{ v.liquidation_price }}</div>
            <div>强平价格(SOKE)</div>
          </div>

          <div>
            <div
              :class="[
                { rise_color: v.profit_rate > 0 },
                { down_color: v.profit_rate <= 0 },
              ]"
            >
              {{ (v.profit_rate * 100).toFixed(2) }}%
            </div>
            <div>盈亏率</div>
          </div>
        </div>
        <div @click="closeposition(v.id)" class="clear_btn">清仓</div>
      </div>
    </div>

    <!-- 当前委托 -->
    <div v-show="nowshow == 1">
      <div v-for="(v, i) in order" :key="i" class="list_table">
        <div class="list_title">
          <div>
            <span
              v-show="v.direction == 'buy'"
              :class="[{ down_color: v.direction == 'buy' }]"
              >买入</span
            >
            <span
              v-show="v.direction == 'sell'"
              :class="[{ rise_color: v.direction == 'sell' }]"
              >卖出</span
            >
            {{ v.index.sub_title }}({{ v.lever }}X)
          </div>
          <div>
            {{ v.created_at }}
            <div @click="getoutorder(v.id)">撤销</div>
          </div>
        </div>
        <div class="list_info">
          <div>
            <div>{{ v.price }}</div>
            <div>委托价格</div>
          </div>
          <div>
            <div>{{ v.trade_volume }}</div>
            <div>成交数量</div>
          </div>
          <div>
            <div>{{ v.volume }}</div>
            <div>委托数量</div>
          </div>
        </div>
      </div>
      <!-- <div class="pagechange">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div> -->
    </div>

    <!-- 现价购买 -->
    <el-dialog title="现价买多" :visible.sync="dialogVisible" width="30%">
      <div class="buy_dialog">
        <div class="dialog_title">SOKE-MAIN(20X)</div>
        <div class="dialog_list">
          <div>委托价格(SOKE)</div>
          <div>{{ price }}</div>
        </div>

        <div class="dialog_list">
          <div>数量(手)</div>
          <div>{{ num }}</div>
        </div>

        <div v-show="price !== '市价'" class="dialog_list">
          <div>冻结保证金</div>
          <div>{{ (price * num) / 20 }} SOKE</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sellbtn(0)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 现价卖空 -->
    <div class="sell_wrapper_dialog">
      <el-dialog
        :title="price == '市价' ? '市价' : '限价'"
        :visible.sync="dialogVisiblesell"
        width="30%"
      >
        <div class="buy_dialog">
          <div class="dialog_title">SOKE-MAIN(20X)</div>
          <div class="dialog_list">
            <div>委托价格(SOKE)</div>
            <div>{{ price }}</div>
          </div>

          <div class="dialog_list">
            <div>数量(手)</div>
            <div>{{ num }}</div>
          </div>

          <div v-show="price !== '市价'" class="dialog_list">
            <div>冻结保证金</div>
            <div>{{ ((price == undefined ? 0 : price) * num) / 20 }} SOKE</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sellbtn(1)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  order,
  nowpositions,
  noworders,
  closeposition,
  closeorder,
  indexdata,
} from "../api";
export default {
  data() {
    return {
      price: "",
      num: "",
      dialogVisible: false,
      dialogVisiblesell: false,
      price_type: "limit",
      nowshow: 0,
      sellpercent: undefined,
      buypercent: undefined,
      nowtype: undefined,
      position: [],
      order: [],
      nowlist: 0,
      mydata: {},
    };
  },
  mounted() {
    this.nowtype = this.$route.query.id;
    //获取用户当前持仓
    nowpositions(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.position = res.data.data;
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
    //获取用户当前委托
    noworders(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.nowlist = res.data.page.total;
          this.order = res.data.data;
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
    indexdata(localStorage.getItem("token"))
      .then((res) => {
        this.mydata = res.data.data.my;
      })
      .catch((err) => {
        console.log(err);
      });
    //下单的socket
    this.initweb();
  },
  methods: {
    // 下单的socket接口
    initweb() {
      let url = "ws://94.74.122.203:9504/ws?token=" + localStorage.getItem("token"); // 创建websocket连接
      this.websock = new WebSocket(url); // 监听打开
      this.websock.onopen = this.websockOpen; // 监听关闭
      this.websock.onclose = this.websockClose; //监听异常
      this.websock.onerror = this.websockError; //监听服务器发送的消息
      this.websock.onmessage = this.websockMessage;
    },
    websockOpen(e) {
      console.log(e);
    },
    websockClose(e) {
      console.log(e);
    },
    websockError(e) {
      console.log(e);
    },
    websockMessage(e) {
      if (e.data !== "Opened") {
        let obj = JSON.parse(e.data);
        console.log(obj);
        if (obj.ch == "index.positions") {
          this.position = obj.data;
        }
      }
    },
    //撤单
    getoutorder(id) {
      console.log(id);
      closeorder({ id }, localStorage.getItem("token"))
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
            this.$router.push("/main");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 清仓
    closeposition(e) {
      closeposition({ id: e }, localStorage.getItem("token"))
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
            this.$router.push("/main");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openbuytable() {
      if (this.num == "") {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      if (this.price == "") {
        this.$message({
          message: "请输入价格",
          type: "warning",
        });
        return false;
      }
      this.dialogVisible = true;
    },
    openselltable() {
      if (this.num == "") {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      if (this.price == "") {
        this.$message({
          message: "请输入价格",
          type: "warning",
        });
        return false;
      }
      this.dialogVisiblesell = true;
    },
    changepricetype(t) {
      this.price_type = t;
      if (t == "market") {
        this.price = "市价";
      } else {
        this.price = undefined;
      }
    },
    changerouter() {
      this.$router.push("/trade");
    },
    changetableshow(n) {
      this.nowshow = n;
    },
    changesellpercent(n) {
      if (n == this.sellpercent) {
        this.sellpercent = undefined;
      } else {
        if (this.price !== "市价" && this.price.length !== 0) {
          this.sellpercent = n;
          this.buypercent = undefined;
          this.num = Math.floor((this.mydata.balance * (n * 0.01)) / this.price);
        }
      }
    },
    changebuypercent(n) {
      if (n == this.buypercent) {
        this.buypercent = undefined;
      } else {
        if (this.price !== "市价" && this.price.length !== 0) {
          this.buypercent = n;
          this.sellpercent = undefined;
          this.num = Math.floor((this.mydata.balance * (n * 0.01)) / this.price);
        }
      }
    },
    sellbtn(n) {
      //1为卖出0为买入
      var p = {};
      if (n) {
        if (this.price == "市价") {
          p = {
            id: this.nowtype,
            direction: "sell",
            price_type: "market",
            volume: this.num,
          };
        } else {
          p = {
            id: this.nowtype,
            direction: "sell",
            price_type: "limit",
            volume: this.num,
            price: this.price,
          };
        }
      } else {
        if (this.price == "市价") {
          p = {
            id: this.nowtype,
            direction: "buy",
            price_type: "market",
            volume: this.num,
          };
        } else {
          p = {
            id: this.nowtype,
            direction: "buy",
            price_type: "limit",
            volume: this.num,
            price: this.price,
          };
        }
      }
      order(p, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "下单成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.dialogVisiblesell = false;
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
.table_data {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px 10px;
  margin-bottom: 40px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #935ff3;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      margin-right: 20px;
      img {
        height: 20px;
      }
    }
  }
  .limit {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    margin-bottom: 18px;

    span {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .input_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    & > div {
      flex: 1;
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #935ff3;
        position: absolute;
        right: 0;
      }
    }
    & > div:nth-child(1) {
      margin-right: 24px;
      input {
        border: none;
        outline: none;
        width: calc(100% - 43px);
        background: #fff;
      }
    }
    & > div:nth-child(2) {
      input {
        border: none;
        outline: none;
        width: calc(100% - 16px);
      }
    }
  }
  .percent_table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    & > div:nth-child(1) {
      flex: 1;
    }
    .percent_btn {
      display: flex;
      align-items: center;
      & > div {
        width: 100px;
        height: 46px;
        border: 1px solid #bfbfbf;
        border-radius: 4px;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        cursor: pointer;
      }
      & > div:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
  .buy_btn {
    width: 184px;
    height: 46px;
    background: #008555;
    border-radius: 6px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f4effe;
    text-align: center;
    line-height: 46px;
    cursor: pointer;
  }
  .cost {
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
      font-weight: 400;
      color: #945ef2;
    }
  }
  .sell_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    & > div:nth-child(1) {
      flex: 1;
    }
    .sell_btn_wrapper {
      display: flex;
      align-items: center;
      & > div {
        width: 100px;
        height: 46px;
        border: 1px solid #bfbfbf;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        line-height: 46px;
        text-align: center;
        cursor: pointer;
      }
      & > div:not(:last-child) {
        margin-right: 20px;
      }
    }
    & > div:nth-child(2) {
      width: 184px;
      height: 46px;
      background: #d60f2a;
      border-radius: 6px;
      text-align: center;
      line-height: 46px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #f4effe;
      cursor: pointer;
    }
  }
  .list_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 38px;
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
}
.changeTable {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    & > div {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
    }
    & > div:nth-child(1) {
      margin-right: 20px;
    }
  }
  & > div:nth-child(2) {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #925ff3;
    margin-right: 6px;
    cursor: pointer;
    img {
      width: 8px;
    }
  }
}
.now_table {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 56px;
  .now_table_title {
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    .position_status {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #935ff3;
      margin-right: 10px;
    }
    & > div:last-child {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
  }
  .data_list_now {
    display: flex;
    margin-bottom: 40px;
    & > div {
      flex: 1;
      & > div:nth-child(2) {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.7;
        padding-top: 10px;
      }
    }
    .soke_value {
      text-align: left;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        padding-top: 16px;
      }
    }
    .soke_av {
      text-align: center;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding-top: 16px;
        color: #000000;
      }
    }
    .soke_Unsettlement {
      text-align: right;
      & > div:nth-child(1) {
        padding-top: 16px;
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #d60f2a;
        }
      }
    }
  }
  .data_list_second {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    & > div {
      flex: 1;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        margin-bottom: 10px;
      }
      & > div:nth-child(2) {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.7;
      }
    }
    & > div:nth-child(2) {
      text-align: center;
    }
    & > div:nth-child(3) {
      text-align: right;
    }
  }
  .clear_btn {
    height: 46px;
    background: #935ff3;
    border-radius: 6px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #f4effe;
    text-align: center;
    line-height: 46px;
    cursor: pointer;
  }
}
.list_table {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 20px;
  .list_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      span {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #008555;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      div {
        width: 54px;
        height: 30px;
        background: #935ff3;
        border-radius: 6px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .list_info {
    display: flex;
    align-items: center;
    & > div {
      flex: 1;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        margin-bottom: 10px;
      }
      & > div:nth-child(2) {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.7;
      }
    }
    & > div:nth-child(2) {
      text-align: center;
    }
    & > div:nth-child(3) {
      text-align: right;
    }
  }
}
.dialog_title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000000;
  margin-bottom: 36px;
}
.dialog_list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div:nth-child(1) {
    font-size: 12px;
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
/deep/ .el-dialog__header {
  text-align: center;
  padding-bottom: 40px;
  padding-top: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
/deep/ .el-dialog__title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #008555;
}
/deep/ .el-dialog__footer {
  text-align: center;
}
/deep/ .el-button--primary {
  width: 300px;
  height: 68px;
  background: #945ef2;
  border-radius: 6px;
  outline: none;
  border: none;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}
.sell_wrapper_dialog {
  /deep/ .el-dialog__title {
    color: #d60f2a !important;
  }
}
.changetype {
  color: #925ff3 !important;
  font-weight: bold !important;
}
.percentactive {
  background: #935ff3;
  color: #ffffff !important;
}
.pagechange {
  text-align: right;
  margin-bottom: 20px;
  padding-right: 40px;
}
</style>
