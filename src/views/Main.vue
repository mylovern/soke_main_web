<template>
  <div class="wrapper">
    <!-- <div class="main_list">
      <div class="okt">
        <div class="okt_head">
          <div class="okt_head_title">
            <img src="../assets/img/Pledge-OKT.png" alt="" />
            当前质押收益率(OKT)
          </div>
          <div class="okt_head_percent">20%</div>
        </div>
        <div class="percent">
          <el-progress :text-inside="true" color="#925FF3" :percentage="70"></el-progress>
        </div>
      </div>
      <div class="okt">
        <div class="okt_head">
          <div class="okt_head_title">
            <img src="../assets/img/Pledge-SOKE.png" alt="" />
            当前质押收益率(OKT)
          </div>
          <div class="okt_head_percent">20%</div>
        </div>
        <div class="percent">
          <el-progress :text-inside="true" color="#925FF3" :percentage="70"></el-progress>
        </div>
      </div>
    </div> -->
    <div class="block_title">
      <div>全局数据统计</div>
      <!-- <div @click="changerouter('/data')">
        查看详细
        <img src="../assets/img/Jump.png" alt="" />
      </div> -->
    </div>
    <div class="main_data">
      <div>
        <div>SOKE矿池(SOKE)</div>
        <div>{{ poolbalance * 1 + pool_balnace * 1 }}</div>
      </div>

      <div>
        <div>SOKE做市资金池(SOKE)</div>
        <div>{{ global.market_pool }}</div>
      </div>

      <div>
        <div>SOKE激励池(SOKE)</div>
        <div>{{ incentive_pool }}</div>
      </div>
    </div>
    <div class="block_title">
      <div>我的数据</div>
      <div @click="changerouter('/personal')">
        查看详细
        <img src="../assets/img/Jump.png" alt="" />
      </div>
    </div>
    <div class="my_wallet">
      <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)" class="my_okt">
        <div class="my_okt_title">
          <div>我的做市质押(SOKE)</div>
          <div>{{ mydata.market_pledge }}</div>
        </div>
        <div class="my_okt_main">
          <div @click="dialogpledge()">我要质押</div>
          <div @click="dialogpledgeremovesoke()">解除质押</div>
        </div>
      </div>
      <div class="my_okt">
        <div class="my_okt_title">
          <div>我的指数交易账户(SOKE)</div>
          <div>{{ mydata.balance }}</div>
        </div>
        <div class="my_okt_main">
          <div @click="dialogrecharge()">我要充值</div>
          <div @click="dialogdespoit()">我要提现</div>
        </div>
      </div>
    </div>
    <div class="my_wallet_data">
      <div>
        <div>我的钱包地址</div>
        <div @click="openDialog()" style="cursor: pointer">
          {{ copyaddress == "" ? "请链接到钱包" : copyaddress }}
        </div>
      </div>
      <div>
        <div>我的算力</div>
        <div>{{ mydata.power == null ? 0 : mydata.power }}</div>
      </div>
      <!-- <div>
        <div>我的挖矿产出(SOKE)</div>
        <div>12121</div>
      </div> -->

      <div>
        <div>我的做市收益(SOKE)</div>
        <div>{{ mydata.market_income }}</div>
      </div>

      <div>
        <div>我的做市亏损(SOKE)</div>
        <div>{{ mydata.market_loss }}</div>
      </div>

      <div>
        <div>我的基金收益(SOKE)</div>
        <div>{{ mydata.fund_income }}</div>
      </div>
    </div>
    <div class="block_title">
      <div>Staking</div>
      <div @click="changerouter('/flow')">
        更多
        <img src="../assets/img/Jump.png" alt="" />
      </div>
    </div>
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
          <div>
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
          剩余SOKE:<span> {{ pool_balnace }}</span>
        </div>
        <div>
          当前挖矿收益:<span>1算力:{{ power_rate }}SOKE</span>
        </div>
      </div>
    </div>
    <div class="block_title">
      <div>指数市场</div>
      <div @click="changerouter('/indexmarket')">
        更多
        <img src="../assets/img/Jump.png" alt="" />
      </div>
    </div>
    <div class="index_market">
      <div v-for="(v, i) in mainstream" :key="i">
        <div style="cursor: pointer" @click="tocharts(v.id)">{{ v.title }}</div>
        <div
          :class="[
            { rise_color_bg: v.quote_change > 0 },
            { down_color_bg: v.quote_change <= 0 },
          ]"
          @click="tocharts(v.id)"
          style="cursor: pointer"
        >
          {{ (v.quote_change * 100).toFixed(1) }}%
        </div>
      </div>
    </div>
    <div class="block_title">
      <div>指数基金</div>
      <div @click="changerouter('/indexfund')">
        更多
        <img src="../assets/img/Jump.png" alt="" />
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
              :percentage="((v.total_volume - v.remain_volume) / v.total_volume) * 100"
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
    <div class="panter">合作伙伴</div>
    <div class="swiper_wrapper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../assets/img/brand-01.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-02.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-03.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-04.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-05.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-06.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-07.png" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/img/brand-08.png" alt="" /></div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="账户" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="notice_wrapper">
        <div class="notice_logo">
          <img src="../assets/img/SOKE-logo.png" alt="" />
        </div>
        <div v-show="token !== 'login'" class="notcie_status">未连接</div>
        <div v-show="token == 'login'" class="notcie_status">已连接</div>
        <div class="wallet_address">
          <input :disabled="token == 'login'" v-model="message" type="text" />
          <img
            v-clipboard:copy="copyaddress"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            src="../assets/img/copy.png"
            alt=""
          />
        </div>
        <div v-show="token !== 'login'" @click="loginbtn()" class="sure_btn">
          <div>请链接到钱包</div>
        </div>
      </div>
    </el-dialog>

    <!-- 我要质押弹出框 -->
    <el-dialog title="质押" :visible.sync="Pledge" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(SOKE):</span>{{ balance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNum" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="sendpledge()" class="sure_p_btn">确定质押</div>
      </div>
    </el-dialog>
    <!-- 矿池质押 -->
    <el-dialog title="Staking" :visible.sync="Pledgepool" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(OKT):</span>{{ oktbalance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNumpool" type="text" />
          <span>OKT</span>
        </div>
        <div @click="sendpledgepool()" class="sure_p_btn">确定质押</div>
      </div>
    </el-dialog>

    <!-- 解除质押 -->
    <!-- <el-dialog title="解除质押" :visible.sync="removePledgepool" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(OKT):</span>{{ myplodge }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNumremovesoke" type="text" />
          <span>OKT</span>
        </div>
        <div @click="removepledgepoolokt()" class="sure_p_btn">确定解除</div>
      </div>
    </el-dialog> -->
    <!-- 解除质押 -->
    <el-dialog title="解除质押" :visible.sync="removePledgesokeflag" width="30%" center>
      <div class="pledge_wrapper">
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(SOKE):</span>{{ mydata.market_pledge }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="pNumremove" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="removepledgesokecontrol()" class="sure_p_btn">确定解除</div>
      </div>
    </el-dialog>
    <!-- 充值弹框 -->
    <el-dialog title="充值SOKE" :visible.sync="recharge" width="30%" center>
      <div class="pledge_wrapper">
        <div class="Recharge_address">
          <div>钱包地址</div>
          <div>{{ this.copyaddress }}</div>
        </div>
        <div class="pledge_num">
          <div>金额</div>
          <div><span>可用(SOKE):</span>{{ balance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="rechargeNum" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="rechargeorder()" class="sure_p_btn">确定充值</div>
      </div>
    </el-dialog>
    <!-- 提现 -->
    <el-dialog title="提现SOKE" :visible.sync="despoit" width="30%" center>
      <div class="pledge_wrapper">
        <div class="Recharge_address">
          <div>钱包地址</div>
          <div>{{ this.copyaddress }}</div>
        </div>
        <div class="pledge_num">
          <div>提现金额</div>
          <div><span>可用(SOKE):</span>{{ mydata.balance }}</div>
        </div>
        <div class="pledge_inp">
          <input v-model="despoitnumorder" type="text" />
          <span>SOKE</span>
        </div>
        <div @click="despoitnum()" class="sure_p_btn">确定提现</div>
      </div>
    </el-dialog>

    <!-- 唤起钱包绑定 -->
    <div class="address_wrapper_dialog">
      <el-dialog :close-on-click-modal="false" :visible.sync="walletcheck" width="30%">
        <div class="main_address_wrapper">
          <div @click="getAccount()">
            <img src="../assets/img/metamask.92157903.png" alt="" />
            <p>Metamask</p>
          </div>
          <div>
            <img src="../assets/img/down.png" alt="" />
            <p>Tokepocket</p>
          </div>
        </div>
      </el-dialog>
    </div>
    <div v-show="netnotice" class="network_notice">网络错误,请切换OKExChain网络</div>
  </div>
</template>

<script>
import Swiper from "swiper";
import {
  allIndex,
  fundlist,
  orderpledge,
  removepledge,
  powerstart,
  powerclose,
  indexdata,
  recharge,
  withdraw,
  formalpledge,
  formalrecharge,
} from "../api";
import {
  check,
  transfermain,
  balancedata,
  poolpledge,
  getallple,
  getprof,
  getwithdraw,
  getbalanceokt,
  getmypledge,
  Cancelple,
  checknetwork,
} from "../assets/web3";
export default {
  mounted() {
    if (!this.checkmetamask()) {
      this.$message.error("请先安装MetaMask");
      setTimeout(() => {
        this.walletcheck = true;
      }, 2000);
    }
    if (window.ethereum.selectedAddress == null) {
      this.walletcheck = true;
    } else {
      this.token = "login";
      this.copyaddress = window.ethereum.selectedAddress;
      localStorage.setItem("address", this.copyaddress);
      this.message = `
      ${this.copyaddress.slice(0, 6)}...${this.copyaddress.slice(
        this.copyaddress.length - 6,
        this.copyaddress.length
      )}
      `;
    }
    if (
      window.ethereum.selectedAddress !== null &&
      localStorage.getItem("token") == null
    ) {
      check(this.copyaddress).then((res) => {
        if (!res) {
          this.$message({
            message: "授权失败请重试",
            type: "error",
          });
        } else {
          location.reload();
        }
      });
    }
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length == 0) {
        location.reload();
      }
    });
    window.ethereum.on("chainChanged", (res) => {
      if (res !== "0x41") {
        this.netnotice = true;
      } else {
        this.netnotice = false;
        location.reload();
      }
    });
    //获取我的质押
    getmypledge(this.copyaddress)
      .then((res) => {
        this.myplodge = res / 1000000000000000000;
      })
      .catch((err) => {
        console.log(err);
      });
    getallple()
      .then((res) => {
        if (res == 0) {
          this.allpledge = 0;
        } else {
          this.allpledge = (1000 / (res / 1000000000000000000)).toFixed(6);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //查询OKT余额
    getbalanceokt(this.copyaddress).then((res) => {
      this.oktbalance = (res / 1000000000000000000).toFixed(6);
    });

    //  查询soke矿池余额
    balancedata("0x128339c3fdC9348439223731EB7E17B21Faa2a7A").then((res) => {
      this.poolbalance = (res / 1000000).toFixed(6);
    });
    //查询钱包余额
    balancedata(this.copyaddress).then((res) => {
      this.balance = (res / 1000000).toFixed(6);
    });
    //获取当前可领取的收益
    getprof(this.copyaddress)
      .then((res) => {
        this.nowincome = ((res * 1) / 1000000).toFixed(6);
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
        //查询激励incentive_pool
        balancedata(this.global.incentive_pool_address).then((res) => {
          this.incentive_pool = (res / 1000000).toFixed(6);
        });
        balancedata(res.data.data.power.power_pool_address).then((res) => {
          this.pool_balnace = (res / 1000000).toFixed(6);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.swiper();

    // 获取全部的指数
    allIndex(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.mainstream = res.data.data;
        }

        if (res.data.code == 403) {
          this.$message({
            message: "请登录",
            type: "error",
          });
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          // location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //获取全部的基金
    fundlist(localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code == 200) {
          this.fundlist = res.data.data;
        }
        if (res.data.code == 403) {
          this.$message({
            message: "请登录",
            type: "error",
          });
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          // location.reload();
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
      removePledgesokeflag: false,
      removePledgepool: false,
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
      Pledgepool: false,
      balance: 0,
      pNumpool: undefined,
      allpledge: 0,
      poolbalance: 0,
      power_rate: 0,
      nowincome: 0,
      oktbalance: 0,
      incentive_pool: 0.0,
      myplodge: 0.0,
      pNumremovesoke: undefined,
      pool_balnace: 0,
      netnotice: false,
    };
  },
  methods: {
    //领取收益
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
    },
    checkmetamask() {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    },
    async getAccount() {
      if (this.checkmetamask()) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        this.account = account;
        if (account) {
          check(account);
          if (!checknetwork()) {
            this.netnotice = true;
          } else {
            this.netnotice = false;
          }
          this.walletcheck = false;
          this.copyaddress = account;
          localStorage.setItem("address", this.copyaddress);
          this.token = "login";
          this.message = `
      ${this.copyaddress.slice(0, 6)}...${this.copyaddress.slice(
            this.copyaddress.length - 6,
            this.copyaddress.length
          )}
      `;
        }
      } else {
        this.$message.error("请先安装MetaMask");
      }
    },
    tobuyfunds(id) {
      this.$router.push({
        path: "/buy",
        query: {
          id,
        },
      });
    },
    //流动性矿池解除质押
    removepledgepoolokt() {
      if (this.pNumremovesoke == undefined || this.pNumremovesoke.length == 0) {
        this.$message.error("请输入解除质押数量");
        return false;
      }
      this.removePledgepool = !this.removePledgepool;
      Cancelple(this.copyaddress, this.pNumremovesoke)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //提现
    despoitnum() {
      if (this.despoitnumorder == undefined || this.despoitnumorder.length == 0) {
        this.$message.error("请输入提现数量");
        return false;
      }
      this.despoit = !this.despoit;
      withdraw({ amount: this.despoitnumorder }, localStorage.getItem("token"))
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
    },
    //充值
    rechargeorder() {
      if (this.rechargeNum == undefined || this.rechargeNum.length == 0) {
        this.$message.error("请输入充值数量");
        return false;
      }
      this.recharge = !this.recharge;
      recharge({ amount: this.rechargeNum }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            transfermain(res.data.data.to, this.copyaddress, this.rechargeNum)
              .then((data) => {
                if (data) {
                  formalrecharge(
                    { no: res.data.data.no, id: data },
                    localStorage.getItem("token")
                  )
                    .then((re) => {
                      if (re.data.code == 200) {
                        this.$message({
                          message: res.data.message,
                          type: "success",
                        });
                        location.reload();
                      } else if (re.data.code == 403) {
                        this.$message.error(re.data.message);
                        localStorage.removeItem("token");
                        localStorage.removeItem("address");
                        // location.reload();
                      } else {
                        this.$message.error(re.data.message);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  // this.$message({
                  //   message: "充值成功",
                  //   type: "success",
                  // });
                }
              })
              .catch(() => {
                this.$message.error("充值失败");
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
    },
    dialogdespoit() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
          if (res) {
            this.despoit = !this.despoit;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.despoit = !this.despoit;
      }
    },
    tocharts(id) {
      this.$router.push({
        path: "/charts",
        query: {
          id: id,
        },
      });
    },
    // 算力挖矿
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
    },
    swiper() {
      new Swiper(".swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        autoplay: true,
      });
    },
    openDialog() {
      this.centerDialogVisible = true;
    },
    changerouter(p) {
      this.$router.push(p);
    },
    onCopy() {
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    onError() {
      this.$message({
        message: "复制失败",
        type: "warning",
      });
    },
    loginbtn() {
      this.getAccount();
      this.centerDialogVisible = false;
    },
    //质押
    sendpledge() {
      if (this.pNum == undefined || this.pNum.length == 0) {
        this.$message.error("请输入质押数量");
        return false;
      }
      this.Pledge = !this.Pledge;
      orderpledge({ amount: this.pNum }, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            this.no = res.data.data.no;
            transfermain(res.data.data.to, this.copyaddress, this.pNum)
              .then((res) => {
                formalpledge({ no: this.no, id: res }, localStorage.getItem("token"))
                  .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                      if (res.data.code !== 200) {
                        this.$message.error(res.data.message);
                      } else {
                        this.$message({
                          message: "质押成功",
                          type: "success",
                        });
                      }

                      // location.reload();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("质押失败");
              });
            // var mynetcontract=new web3.eth([],)
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
    },
    //矿池质押
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
    dialogpledge() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
          if (res) {
            this.Pledge = !this.Pledge;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.Pledge = !this.Pledge;
      }
    },
    dialogpledgepool() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
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
    removepledgesokecontrol() {
      if (this.pNumremove == undefined || this.pNumremove.length == 0) {
        this.$message.error("请输入解除质押数量");
        return false;
      }
      this.removePledgesokeflag = !this.removePledgesokeflag;
      removepledge({ amount: this.pNumremove }, localStorage.getItem("token"))
        .then((res) => {
          console.log(res);
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
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogpledgeremove() {
      if (localStorage.getItem("token") == null) {
        if (this.myplodge == 0) {
          this.$message.error("当前质押为0");
          return false;
        }
        check(this.copyaddress).then((res) => {
          if (res) {
            Cancelple(this.copyaddress)
              .then((data) => {
                if (data) {
                  this.$message({
                    message: "解除质押成功",
                    type: "success",
                  });
                  location.reload();
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("解除质押失败");
              });
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        if (this.myplodge == 0) {
          this.$message.error("当前质押为0");
          return false;
        }
        Cancelple(this.copyaddress)
          .then((res) => {
            if (res) {
              this.$message({
                message: "解除质押成功",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("解除质押失败");
          });
      }
    },
    dialogpledgeremovesoke() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
          if (res) {
            this.removePledgesokeflag = !this.removePledgesokeflag;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.removePledgesokeflag = !this.removePledgesokeflag;
      }
    },
    dialogrecharge() {
      if (localStorage.getItem("token") == null) {
        check(this.copyaddress).then((res) => {
          if (res) {
            this.recharge = !this.recharge;
          } else {
            this.$message.error("授权失败请重试");
          }
        });
      } else {
        this.recharge = !this.recharge;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../node_modules/swiper/css/swiper.css";
.main_list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  .okt {
    padding: 38px 30px;
    width: calc(48% - 60px);
    height: 54px;
    background: #ffffff;
    box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
    border-radius: 6px;
    .okt_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .okt_head_title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7);

        img {
          width: 24px;
          margin-right: 10px;
        }
      }
      .okt_head_percent {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
      }
    }
  }
}
.block_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div:nth-child(1) {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
  }
  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #925ff3;
    cursor: pointer;
    img {
      width: 8px;
      margin-left: 4px;
    }
  }
}
.main_data {
  height: 128px;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.my_wallet {
  background: linear-gradient(90deg, #925ff3 0%, #c751c5 48%, #f07b4d 100%);
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 6px 6px 0px 0px;
  .wallet_address {
    padding: 37px 30px 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div:nth-child(1) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.7;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .my_okt {
    padding: 30px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .my_okt_title {
      & > div:nth-child(1) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.7;
        margin-bottom: 16px;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .my_okt_main {
      display: flex;
      align-items: center;
      & > div:nth-child(1) {
        width: 120px;
        height: 46px;
        background: #ffffff;
        border-radius: 6px;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #925ff3;
        margin-right: 26px;
        cursor: pointer;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        cursor: pointer;
        color: #ffffff;
      }
    }
  }
}
.my_wallet_data {
  height: 292px;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
  border-radius: 0px 0px 6px 6px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div {
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
      }
    }
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
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #925ff3;
  }
}
.panter {
  padding-top: 22px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
}
/deep/ .el-progress__text {
  display: none;
}
/deep/ .el-progress-bar {
  padding-right: 0;
}
.swiper_wrapper {
  width: 80vw;
  margin-bottom: 60px;
}
.swiper-slide {
  width: 214px;
  height: 80px;
  img {
    width: 179px;
  }
}
.notice_wrapper {
  padding: 60px 30px;
}
.notice_logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  img {
    height: 50px;
  }
}
.notcie_status {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 40px;
}
.wallet_address {
  height: 66px;
  background: linear-gradient(90deg, #fdf2ed 0%, #f9edf9 53%, #f4effe 100%);
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #925ff3;
  position: relative;
  margin-bottom: 20px;
  input {
    border: none;
    outline: none;
    background: transparent;
    height: 66px;
    width: calc(100% - 38px);
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #925ff3;
  }
  img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 13px;
    margin-top: -12px;
    cursor: pointer;
  }
}
.sure_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 186px;
    height: 66px;
    background: #925ff3;
    border-radius: 6px;
    text-align: center;
    line-height: 66px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #f4effe;
    cursor: pointer;
  }
}

/deep/ .el-dialog__title {
  font-size: 28px !important;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
}
/deep/ .el-dialog__header {
  height: 90px;
  line-height: 90px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
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
.Recharge_address {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  & > div:nth-child(1) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
  }
}
.main_address_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  & > div:nth-child(1) {
    margin-right: 60px;
  }
  & > div {
    width: 21.73vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f8fc;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-top: 23px;
    padding-bottom: 20px;
    margin-bottom: 8px;
    & > img {
      cursor: pointer;
      width: 60%;
    }
  }
}
.address_wrapper_dialog /deep/.el-dialog__header {
  height: 0px !important;
  border-bottom: none !important;
}
.network_notice {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100px;
  background: #df5f67;
  line-height: 100px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  z-index: 99999999999999999999999999999999999999;
}
</style>
