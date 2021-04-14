<template>
  <div class="wrapper-height">
    <div class="head_chioce">
      <div>
        <el-select @change="indexchange" v-model="value">
          <el-option v-for="(v, i) in indexlist" :key="i" :label="v.title" :value="v.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select v-model="valuepice" placeholder="指数交易对">
          <el-option
            :disabled="true"
            v-for="item in listlable"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table_data">
      <div class="head_data">
        <div
          :class="[
            { rise_color: onedayopen <= last_price },
            { down_color: onedayopen > last_price },
          ]"
        >
          {{ (last_price * 1).toFixed(2) }}
          <span
            :class="[
              { rise_color: onedayopen <= last_price },
              { down_color: onedayopen > last_price },
            ]"
            >{{ (quote_change * 100).toFixed(2) }}%</span
          >
        </div>
      </div>
      <div class="data_list">
        <div>24H最高</div>
        <div>{{ today_high }}</div>
      </div>

      <div class="data_list">
        <div>24H量(手)</div>
        <div>{{ trade_volume }}</div>
      </div>

      <div class="data_list">
        <div>24H最低</div>
        <div>{{ today_low }}</div>
      </div>

      <div class="data_list">
        <div>持仓量(手)</div>
        <div>{{ position_volume }}</div>
      </div>
    </div>
    <div class="choice_table">
      <div @click="changeTable('1min')">
        <div :class="{ active: shownum == '1min' }">1分钟</div>
      </div>
      <div @click="changeTable('5min')">
        <div :class="{ active: shownum == '5min' }">5分钟</div>
      </div>
      <div @click="changeTable('15min')">
        <div :class="{ active: shownum == '15min' }">15分钟</div>
      </div>
      <div @click="changeTable('30min')">
        <div :class="{ active: shownum == '30min' }">30分钟</div>
      </div>
      <div @click="changeTable('60min')">
        <div :class="{ active: shownum == '60min' }">60分钟</div>
      </div>
      <div @click="changeTable('4hour')">
        <div :class="{ active: shownum == '4hour' }">4小时</div>
      </div>
      <div @click="changeTable('1day')">
        <div :class="{ active: shownum == '1day' }">1天</div>
      </div>
      <div @click="changeTable('1week')">
        <div :class="{ active: shownum == '1week' }">1周</div>
      </div>
      <div @click="changeTable('1mon')">
        <div :class="{ active: shownum == '1mon' }">1月</div>
      </div>
    </div>
    <div class="chart_wrapper">
      <div id="update-k-line" class="kline"></div>
    </div>
    <div>
      <div class="table_data">
        <div class="title">
          <div>{{ value }}</div>
          <div>
            <span>杠杆倍数{{ lever }}</span
            ><img src="../assets/menu1.png" alt="" />
          </div>
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
      <el-dialog :title="buytitle" :visible.sync="dialogVisible" width="30%">
        <div class="buy_dialog">
          <div class="dialog_title">{{ value }}({{ lever }}X)</div>
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
            <div>{{ ((price == undefined ? 0 : price) * num) / lever }} SOKE</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sellbtn(0)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 现价卖空 -->
      <div class="sell_wrapper_dialog">
        <el-dialog :title="selltitle" :visible.sync="dialogVisiblesell" width="30%">
          <div class="buy_dialog">
            <div class="dialog_title">{{ value }}({{ lever }}X)</div>
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
              <div>{{ ((price == undefined ? 0 : price) * num) / lever }} SOKE</div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sellbtn(1)">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getkline,
  indexQuotes,
  allIndex,
  order,
  nowpositions,
  noworders,
  closeposition,
  closeorder,
  indexdata,
} from "../api";
import { init, dispose } from "klinecharts";
export default {
  data() {
    return {
      indexlist: [],
      listlable: [],
      value: "",
      valuepice: "",
      shownum: "1min",
      nowtype: undefined,
      last_price: 0,
      open_price: 0,
      quote_change: 0,
      today_high: 0,
      today_low: 0,
      trade_volume: 0,
      position_volume: 0,
      onedayopen: 0,
      price: "",
      num: "",
      dialogVisible: false,
      dialogVisiblesell: false,
      price_type: "limit",
      nowshow: 0,
      sellpercent: undefined,
      buypercent: undefined,
      position: [],
      order: [],
      nowlist: 0,
      mydata: {},
      code: "",
      lever: 0,
      buytitle: "限价买多",
      selltitle: "限价做空",
    };
  },
  methods: {
    // 更换指数
    indexchange(e) {
      for (let v of this.indexlist) {
        if (v.id == e) {
          this.value = v.title;
          this.code = v.code;
          this.listlable = v.symbols;
          this.lever = v.lever;
        }
      }
      this.nowtype = e;
      this.shownum = "1min";
      getkline({ id: e, interval: "1min" }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            for (let v of res.data.data) {
              v.open = v.open * 1;
              v.high = v.high * 1;
              v.low = v.low * 1;
              v.close = v.close * 1;
              v.timestamp = v.timestamp * 1000;
            }
            this.chart.applyNewData(res.data.data);
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
      indexQuotes({ id: e }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.last_price = res.data.data.last_price;
            this.open_price = res.data.data.open_price;
            this.quote_change = res.data.data.quote_change;
            this.today_high = res.data.data.today_high;
            this.today_low = res.data.data.today_low;
            this.trade_volume = res.data.data.trade_volume;
            this.position_volume = res.data.data.position_volume;
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
    changeTable(n) {
      this.shownum = n;
      getkline({ id: this.nowtype, interval: n }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            for (let v of res.data.data) {
              v.open = v.open * 1;
              v.high = v.high * 1;
              v.low = v.low * 1;
              v.close = v.close * 1;
              v.timestamp = v.timestamp * 1000;
            }
            this.chart.applyNewData(res.data.data);
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
    changerouter(p) {
      this.$router.push(p);
    },
    initweb() {
      let url = "ws://94.74.122.203:9502/ws?token=" + localStorage.getItem("token"); // 创建websocket连接
      // let url = "wss://ws.soke.network/ws?token=" + localStorage.getItem("token"); // 创建websocket连接
      this.websock = new WebSocket(url); // 监听打开
      this.websock.onopen = this.websockOpen; // 监听关闭
      this.websock.onclose = this.websockClose; //监听异常
      this.websock.onerror = this.websockError; //监听服务器发送的消息
      this.websock.onmessage = this.websockMessage;
    },
    websockOpen() {},
    websockClose(e) {
      console.log(e);
    },
    websockError(e) {
      console.log(e);
    },
    websockMessage(e) {
      if (e.data !== "Opened") {
        let obj = JSON.parse(e.data);
        if (obj.ch == `index.market.${this.code}`) {
          this.last_price = obj.data.last_price;
          this.quote_change = obj.data.quote_change;
        }
        if (obj.ch == `index.kline.${this.code}`) {
          obj.data[this.shownum].timestamp = obj.data[this.shownum].timestamp * 1000;
          this.chart.updateData(obj.data[this.shownum]);
          this.onedayopen = obj.data["1day"].open;
        }
        if (obj.ch == "index.positions") {
          this.position = obj.data;
        }
        if (obj.ch == "index.orders") {
          this.order = obj.data;
        }
      }
    }, //撤单
    getoutorder(id) {
      closeorder({ id }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            location.reload();
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
            location.reload();
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
    // 打开购买table
    openbuytable() {
      if (this.num == "" || this.num == undefined) {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      if (this.price == "" || this.price == undefined) {
        this.$message({
          message: "请输入价格",
          type: "warning",
        });
        return false;
      }
      this.dialogVisible = true;
    },
    // 打开出售table
    openselltable() {
      if (this.num == "" || this.num == undefined) {
        this.$message({
          message: "请输入数量",
          type: "warning",
        });
        return false;
      }
      if (this.price == "" || this.price == undefined) {
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
        this.buytitle = "市价买多";
        this.selltitle = "市价做空";
      } else {
        this.price = undefined;
        this.buytitle = "限价买多";
        this.selltitle = "限价做空";
      }
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
            location.reload();
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
    //链接K线
    this.initweb();
    // 获取指数对列表
    allIndex(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.indexlist = res.data.data;
          for (let v of res.data.data) {
            if (v.id == this.nowtype) {
              this.value = v.title;
              this.code = v.code;
              this.listlable = v.symbols;
              this.lever = v.lever;
            }
          }
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
    //获取指数详情
    indexQuotes({ id: this.nowtype }, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.last_price = res.data.data.last_price;
          this.open_price = res.data.data.open_price;
          this.quote_change = res.data.data.quote_change;
          this.today_high = res.data.data.today_high;
          this.today_low = res.data.data.today_low;
          this.trade_volume = res.data.data.trade_volume;
          this.position_volume = res.data.data.position_volume;
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
    this.chart = init("update-k-line");
    getkline({ id: this.nowtype, interval: "1min" }, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          for (let v of res.data.data) {
            v.open = v.open * 1;
            v.high = v.high * 1;
            v.low = v.low * 1;
            v.close = v.close * 1;
            v.timestamp = v.timestamp * 1000;
          }
          this.chart.applyNewData(res.data.data);
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
    this.chart.setStyleOptions({
      // 网格线
      grid: {
        show: true,
        // 网格水平线
        horizontal: {
          show: true,
          size: 1,
          color: "#000",
          // 'solid'|'dash'
          style: "dash",
          dashValue: [2, 2],
        },
        // 网格垂直线
        vertical: {
          show: true,
          size: 1,
          color: "#000",
          // 'solid'|'dash'
          style: "dash",
          dashValue: [2, 2],
        },
      },
      // 蜡烛图
      candle: {
        // 蜡烛图上下间距，大于1为绝对值，大于0小余1则为比例
        margin: {
          top: 0.2,
          bottom: 0.1,
        },
        // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
        type: "candle_solid",
        // 蜡烛柱
        bar: {
          upColor: "#26A69A",
          downColor: "#EF5350",
          noChangeColor: "#888888",
        },
        // 面积图
        area: {
          lineSize: 2,
          lineColor: "#2196F3",
          value: "close",
          fillColor: [
            {
              offset: 0,
              color: "rgba(33, 150, 243, 0.01)",
            },
            {
              offset: 1,
              color: "rgba(33, 150, 243, 0.2)",
            },
          ],
        },
        priceMark: {
          show: true,
          // 最高价标记
          high: {
            show: true,
            color: "#D9D9D9",
            textMargin: 5,
            textSize: 10,
            textFamily: "Helvetica Neue",
            textWeight: "normal",
          },
          // 最低价标记
          low: {
            show: true,
            color: "#D9D9D9",
            textMargin: 5,
            textSize: 10,
            textFamily: "Helvetica Neue",
            textWeight: "normal",
          },
          // 最新价标记
          last: {
            show: true,
            upColor: "#26A69A",
            downColor: "#EF5350",
            noChangeColor: "#888888",
            line: {
              show: true,
              // 'solid'|'dash'
              style: "dash",
              dashValue: [4, 4],
              size: 1,
            },
            text: {
              show: true,
              size: 12,
              paddingLeft: 2,
              paddingTop: 2,
              paddingRight: 2,
              paddingBottom: 2,
              color: "#FFFFFF",
              family: "Helvetica Neue",
              weight: "normal",
            },
          },
        },
        // 提示
        tooltip: {
          showRule: "always",
          showType: "standard",
          labels: ["时间", "开", "收", "高", "低"],
          // 可以是数组，也可以是方法，如果是方法则需要返回一个数组
          // 数组和方法返回的数组格式为:
          // [xxx, xxx, ......]或者[{ color: '#fff', value: xxx }, { color: '#000', value: xxx }, .......]
          values: null,
          defaultValue: "n/a",
          rect: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 6,
            offsetLeft: 8,
            offsetTop: 8,
            offsetRight: 8,
            borderRadius: 4,
            borderSize: 1,
            borderColor: "#3f4254",
            fillColor: "rgba(17, 17, 17, .3)",
          },
          text: {
            size: 12,
            family: "Helvetica Neue",
            weight: "normal",
            color: "#000",
            marginLeft: 8,
            marginTop: 6,
            marginRight: 8,
            marginBottom: 0,
          },
        },
      },
      // 技术指标
      technicalIndicator: {
        margin: {
          top: 0.2,
          bottom: 0.1,
        },
        bar: {
          upColor: "#26A69A",
          downColor: "#EF5350",
          noChangeColor: "#888888",
        },
        line: {
          size: 1,
          colors: ["#FF9600", "#9D65C9", "#2196F3", "#E11D74", "#01C5C4"],
        },
        circle: {
          upColor: "#26A69A",
          downColor: "#EF5350",
          noChangeColor: "#888888",
        },
        // 最新值标记
        lastValueMark: {
          show: false,
          text: {
            show: false,
            color: "#ffffff",
            size: 12,
            family: "Helvetica Neue",
            weight: "normal",
            paddingLeft: 3,
            paddingTop: 2,
            paddingRight: 3,
            paddingBottom: 2,
          },
        },
        // 提示
        tooltip: {
          showRule: "always",
          showName: true,
          showParams: true,
          defaultValue: "n/a",
          text: {
            size: 12,
            family: "Helvetica Neue",
            weight: "normal",
            color: "#D9D9D9",
            marginTop: 6,
            marginRight: 8,
            marginBottom: 0,
            marginLeft: 8,
          },
        },
      },
      // x轴
      xAxis: {
        show: true,
        height: null,
        // x轴线
        axisLine: {
          show: true,
          color: "#000",
          size: 1,
        },
        // x轴分割文字
        tickText: {
          show: true,
          color: "#000",
          family: "Helvetica Neue",
          weight: "normal",
          size: 12,
          paddingTop: 3,
          paddingBottom: 6,
        },
        // x轴分割线
        tickLine: {
          show: true,
          size: 1,
          length: 3,
          color: "#000",
        },
      },
      // y轴
      yAxis: {
        show: true,
        width: null,
        // 'left' | 'right'
        position: "right",
        // 'normal' | 'percentage'
        type: "normal",
        inside: false,
        // y轴线
        axisLine: {
          show: true,
          color: "#000",
          size: 1,
        },
        // x轴分割文字
        tickText: {
          show: true,
          color: "#000",
          family: "Helvetica Neue",
          weight: "normal",
          size: 12,
          paddingLeft: 3,
          paddingRight: 6,
        },
        // x轴分割线
        tickLine: {
          show: true,
          size: 1,
          length: 3,
          color: "#000",
        },
      },
      // 图表之间的分割线
      separator: {
        size: 1,
        color: "#888888",
        fill: true,
        activeBackgroundColor: "rgba(230, 230, 230, .15)",
      },
      // 十字光标
      crosshair: {
        show: true,
        // 十字光标水平线及文字
        horizontal: {
          show: true,
          line: {
            show: true,
            // 'solid'|'dash'
            style: "dash",
            dashValue: [4, 2],
            size: 1,
            color: "#000",
          },
          text: {
            show: true,
            color: "#D9D9D9",
            size: 12,
            family: "Helvetica Neue",
            weight: "normal",
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
            paddingBottom: 2,
            borderSize: 1,
            borderColor: "#505050",
            backgroundColor: "#505050",
          },
        },
        // 十字光标垂直线及文字
        vertical: {
          show: true,
          line: {
            show: true,
            // 'solid'|'dash'
            style: "dash",
            dashValue: [4, 2],
            size: 1,
            color: "#888888",
          },
          text: {
            show: true,
            color: "#D9D9D9",
            size: 12,
            family: "Helvetica Neue",
            weight: "normal",
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
            paddingBottom: 2,
            borderSize: 1,
            borderColor: "#505050",
            backgroundColor: "#505050",
          },
        },
      },
      // 图形标记
      graphicMark: {
        line: {
          color: "#2196F3",
          size: 1,
        },
        point: {
          backgroundColor: "#2196F3",
          borderColor: "#2196F3",
          borderSize: 1,
          radius: 4,
          activeBackgroundColor: "#2196F3",
          activeBorderColor: "#2196F3",
          activeBorderSize: 1,
          activeRadius: 6,
        },
        polygon: {
          stroke: {
            size: 1,
            color: "#2196F3",
          },
          fill: {
            color: "rgba(33, 150, 243, 0.1)",
          },
        },
        arc: {
          stroke: {
            size: 1,
            color: "#2196F3",
          },
          fill: {
            color: "rgba(33, 150, 243, 0.1)",
          },
        },
        text: {
          color: "#2196F3",
          size: 12,
          family: "Helvetica Neue",
          weight: "normal",
          marginLeft: 2,
          marginRight: 2,
          marginTop: 2,
          marginBottom: 6,
        },
      },
    });
  },
  destroyed() {
    dispose("update-k-line");
  },
};
</script>

<style lang="less" scoped>
.head_chioce {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table_data {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 20px;
  & > div:not(:last-child) {
    margin-bottom: 36px;
  }
}
.head_data {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
  span {
    // margin-left: 8px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #d60f2a;
  }
}
.data_list {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
  }
}
.choice_table {
  width: 920px;
  height: 48px;
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
      width: 102px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  & > div:last-child {
    div {
      border-right: none;
    }
  }
}
.kline {
  background: #fff;
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
}
.btn_gropu {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-bottom: 40px;
  & > div {
    width: 120px;
    height: 46px;
    background: #008555;
    border-radius: 6px;
    text-align: center;
    line-height: 46px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f4effe;
    cursor: pointer;
  }
  & > div:nth-child(1) {
    background: #008555;
    margin-right: 20px;
  }
  & > div:nth-child(2) {
    background: #d60f2a;
  }
}
.active {
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  top: -1px;
  line-height: 48px;
  background: #935ff3;
  color: #ffffff !important;
  font-weight: bold !important;
  border-radius: 6px;
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
      display: flex;
      align-items: center;
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
