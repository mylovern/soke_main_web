<template>
  <div class="wrapper-height">
    <div class="head_chioce">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
    <div class="btn_gropu">
      <div @click="changerouter()">买入做多</div>
      <div @click="changerouter()">卖出做空</div>
    </div>
  </div>
</template>

<script>
import { getkline, indexQuotes, allIndex } from "../api";
import { init, dispose } from "klinecharts";
export default {
  data() {
    return {
      options: [],
      value: "SOKE-MAIN",
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
    };
  },
  methods: {
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
            this.$router.push('/main')
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changerouter() {
      this.$router.push({
        path: "/indexs",
        query: {
          id: this.nowtype,
        },
      });
    },
    initweb() {
      let url = "wss://94.74.122.203:9504/ws"; // 创建websocket连接
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
        if (obj.ch == "index.market.sokemain") {
          this.last_price = obj.data.last_price;
          this.quote_change = obj.data.quote_change;
        }
        if (obj.ch == "index.kline.sokemain") {
          obj.data[this.shownum].timestamp = obj.data[this.shownum].timestamp * 1000;
          this.chart.updateData(obj.data[this.shownum]);
          this.onedayopen = obj.data["1day"].open;
        }
      }
    },
  },
  mounted() {
    //链接K线
    this.initweb();
    allIndex(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.mainstream = res.data.data;
          for (let v of res.data.data) {
            this.options.push({
              value: v.sub_title,
              label: v.sub_title,
            });
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
    this.nowtype = this.$route.query.id;
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
          this.$router.push('/main')
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
          this.$router.push('/main')
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
</style>
