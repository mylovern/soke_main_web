<template>
  <div class="wrapper-height">
    <div class="title">Staking</div>
    <div class="pool_block">
      <div class="pool_block_title">
        <div>OKT-SOKE</div>
        <div>
          <div @click="dialogpledgepool()">我要质押</div>
          <div @click="dialogpledgeremove()">解除质押</div>
        </div>
      </div>
      <div class="pool_block_main">
        <div>
          <div>
            <div>
              我的质押OKT:<span> {{ myplodge }}</span>
            </div>
            <div>
              剩余(soke):<span>{{ poolbalance }}</span>
            </div>
          </div>
          <div style="cursor: pointer" @click="tolist()">
            当前收益: <span>1 OKT:{{ allpledge }} SOKE</span>
          </div>
        </div>
        <div>
          <div>
            当前可领收益(SOKE):<span> {{ nowincome }}</span>
          </div>
          <div @click="getincome" style="cursor: pointer">领取收益</div>
        </div>
      </div>
    </div>
    <div class="start_soke">
      <div class="soke_start_title">
        <div>算力-SOKE</div>
        <div
          @click="startpool()"
          class="startpollbtn"
          v-show="!startp"
          style="cursor: pointer"
        >
          开始算力挖矿
        </div>
        <div
          @click="startpool()"
          class="startpollbtn"
          v-show="startp"
          style="cursor: pointer"
        >
          关闭算力挖矿
        </div>
      </div>
      <div class="soke_start_main">
        <div>
          <!-- 剩余(SOKE):<span> {{ balance }}</span> -->
        </div>
        <div>
          当前挖矿收益:<span>1算力:{{ power_rate }} SOKE</span>
        </div>
      </div>
    </div>
    <!-- 矿池质押 -->
    <el-dialog title="Staking" :visible.sync="Pledgepool" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(OKT):</span>{{ oktbalance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNumpool" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="sendpledgepool()" class="sure_p_btn">确定质押</div>
      </div>
    </el-dialog>

    <!-- 解除质押 -->
    <el-dialog title="解除质押" :visible.sync="removePledge" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(OKT):</span>{{ oktbalance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNumremove" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="removepledge()" class="sure_p_btn">确定解除</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { removepledge, powerstart, powerclose, indexdata } from "../api";
import {
  check,
  balancedata,
  poolpledge,
  getallple,
  getprof,
  getwithdraw,
  getbalanceokt,
  getmypledge,
} from "../assets/web3";
export default {
  mounted() {
    this.copyaddress = localStorage.getItem("address");
    //查询OKT余额
    getbalanceokt(this.copyaddress).then((res) => {
      this.oktbalance = (res / 100000000000000000).toFixed(6);
    });
    //  查询soke矿池余额
    balancedata("0xe871e5b1109950a3ba75d546edd3f166ec93e4af").then((res) => {
      this.poolbalance = (res / 1000000).toFixed(6);
    });
    //查询钱包余额
    balancedata(this.copyaddress).then((res) => {
      this.balance = (res / 1000000).toFixed(6);
    });
    //获取我的质押
    getmypledge()
      .then((res) => {
        this.myplodge = res;
      })
      .catch((err) => {
        console.log(err);
      });
    //获取总质押
    getallple()
      .then((res) => {
        if (res == 0) {
          this.allpledge = 0;
        } else {
          this.allpledge = (1000 / (res / 100000000000000000)).toFixed(6);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //获取当前可领取的收益
    getprof()
      .then((res) => {
        this.nowincome = (res * 1).toFixed(6);
      })
      .catch((err) => {
        console.log(err);
      });
    //获取首页全部数据
    indexdata(localStorage.getItem("token"))
      .then((res) => {
        this.global = res.data.data.global;
        this.mydata = res.data.data.my;
        this.power_rate = res.data.data.power.power_rate;
        if (!res.data.data.power.is_open_power) {
          this.startp = false;
        } else {
          this.startp = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      centerDialogVisible: false,
      message: "",
      token: "",
      copyaddress: "",
      Pledge: false,
      pNum: undefined,
      pNumremove: undefined,
      removePledge: false,
      rechargeNum: undefined,
      recharge: false,
      despoit: false,
      despoitnumorder: undefined,
      startp: false,
      mainstream: [],
      fundlist: [],
      global: {},
      mydata: {},
      walletcheck: false,
      account: undefined,
      no: undefined,
      Pledgepool: undefined,
      balance: undefined,
      pNumpool: undefined,
      allpledge: undefined,
      power_rate: undefined,
      nowincome: undefined,
      oktbalance: undefined,
      myplodge: 0,
      poolbalance: 0,
    };
  },
  methods: {
    tolist() {
      this.$router.push("/flowdata");
    }, //领取收益
    getincome() {
      getwithdraw(this.copyaddress)
        .then((res) => {
          if (res) {
            this.$message({
              message: "收益领取成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            this.$message.error("收益领取失败");
          }
        });
    }, // 算力挖矿
    startpool() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((data) => {
          if (data) {
            this.startp = !this.startp;
            if (this.startp) {
              powerstart(localStorage.getItem("token"))
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
                    // location.reload();
                  } else {
                    this.$message.error(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              powerclose(localStorage.getItem("token"))
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
                    // location.reload();
                  } else {
                    this.$message.error(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.startp = !this.startp;
        if (this.startp) {
          powerstart(localStorage.getItem("token"))
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
                // location.reload();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          powerclose(localStorage.getItem("token"))
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
                // location.reload();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }, //矿池质押
    sendpledgepool() {
      if (this.pNumpool == undefined || this.pNumpool.length == 0) {
        this.$message.error("请输入质押数量");
        return false;
      }
      this.Pledgepool = !this.Pledgepool;
      poolpledge(this.copyaddress, this.pNumpool)
        .then(() => {
          this.$message({
            message: "质押成功",
            type: "success",
          });
          location.reload();
        })
        .catch(() => {
          this.$message.error("质押失败请重试");
        });
    },
    //解除质押
    removepledge() {
      if (this.pNumremove == undefined || this.pNumremove.length == 0) {
        this.$message.error("请输入解除质押数量");
        return false;
      }
      this.removePledge = !this.removePledge;
      removepledge({ amount: this.pNumremove }, localStorage.getItem("token"))
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
            location.reload();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogpledgepool() {
      if (localStorage.getItem("token") == null) {
        check(localStorage.getItem("address")).then((res) => {
          if (res) {
            this.Pledge = !this.Pledge;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.Pledgepool = !this.Pledgepool;
      }
    },
    dialogpledgeremove() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
          if (res) {
            this.removePledge = !this.removePledge;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.removePledge = !this.removePledge;
      }
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
.pool_block {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 0 30px 40px;
  margin-bottom: 20px;
  .pool_block_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 42px;
    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    & > div:nth-child(2) {
      display: flex;
      align-items: center;
      & > div:nth-child(1) {
        width: 120px;
        height: 46px;
        background: #925ff3;
        border-radius: 6px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #f4effe;
        text-align: center;
        line-height: 46px;
        cursor: pointer;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #925ff3;
        cursor: pointer;
        margin-left: 28px;
      }
    }
  }
  .pool_block_main {
    & > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      & > div {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #737373;
        & > div {
          margin-bottom: 20px;
        }
        span {
          color: #000000;
          margin-right: 20px;
        }
      }
    }
    & > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #737373;
        span {
          color: #000000;
        }
      }
      & > div:nth-child(2) {
        width: 120px;
        height: 46px;
        border: 1px solid #935ff3;
        border-radius: 6px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #935ff3;
        line-height: 46px;
        text-align: center;
      }
    }
  }
}
.start_soke {
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 40px 30px;
  margin-bottom: 40px;
  .soke_start_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    & > div:nth-child(1) {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    & > div:nth-child(2) {
      width: 216px;
      height: 46px;
      background: #925ff3;
      border-radius: 6px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #f4effe;
      line-height: 46px;
      text-align: center;
    }
  }
  .soke_start_main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 40px;
    & > div {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #737373;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }
}
.pledge_num {
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
    color: #000000;
    span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
.pledge_inp {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  input {
    outline: none;
    width: calc(100% - 44px);
    padding-right: 44px;
  }
  span {
    position: absolute;
    right: 0;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #935ff3;
  }
}
.sure_p_btn {
  width: 300px;
  height: 68px;
  background: #945ef2;
  border-radius: 6px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  line-height: 68px;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
}
.startpollbtn {
  width: 216px;
  height: 46px;
  background: #925ff3;
  border-radius: 6px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #f4effe;
  line-height: 46px;
  text-align: center;
}
</style>
