<template>
  <div class="wrapper-height">
    <div v-show="orderlist.length !== 0">
      <div v-for="(v, i) in orderlist" :key="i" class="table_list">
        <div class="title">
          <div>
            <span
              :class="[
                { rise_color: v.direction == 'buy' },
                { down_color: v.direction !== 'buy' },
              ]"
              >{{ v.direction == "buy" ? "买入" : "卖出" }}</span
            >
            {{ v.index.sub_title }}({{ v.lever }}X)
          </div>
          <!-- <div>
          已取消
          <div>取消时间:10-10 10:10:10</div>
        </div> -->
        </div>
        <div class="list_info">
          <div>
            <div>{{ v.price }}</div>
            <div>委托价格</div>
          </div>
          <div>
            <div>{{ v.volume }}</div>
            <div>委托数量</div>
          </div>
          <div>
            <div>{{ v.trade_volume }}</div>
            <div>成交数量</div>
          </div>
        </div>
        <div class="list_info">
          <div>
            <div>{{ v.fee }}</div>
            <div>手续费(SOKE)</div>
          </div>
          <div>
            <div>{{ v.created_at }}</div>
            <div>委托时间</div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div>
        <el-pagination
          :total="allpagefund"
          :page-size="10"
          @current-change="pagechangefund"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </div>
    <div class="nodata_wrapper" v-show="orderlist.length == 0">
      <img src="../assets/img/no.png" alt="" />
      <div>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { historyorders } from "../api";
export default {
  mounted() {
    historyorders({ page: 1, per_page: 10 }, localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
        this.orderlist = res.data.data;
        this.allpagefund = res.data.page.total;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      orderlist: [],
      allpagefund: 0,
    };
  },
  methods: {
    pagechangefund(e) {
      historyorders({ page: e, per_page: 10 }, localStorage.getItem("token"))
        .then((res) => {
          console.log(res);
          this.orderlist = res.data.data;
          this.allpagefund = res.data.page.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.table_list {
  height: 285px;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px 0px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 40px;
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
        margin-right: 10px;
      }
    }
    & > div:nth-child(2) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #d60f2a;
      text-align: right;
      div {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        padding-top: 10px;
      }
    }
  }
  .list_info {
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
}
</style>
