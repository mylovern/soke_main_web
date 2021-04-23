<template>
  <div class="home">
    <div class="leftnvawrapper">
      <div :class="['left_nav', { 'sticky-menu': scrollstatr }]">
        <div class="nav_head">MENU</div>
        <div
          @click="changerouter('/')"
          :class="[
            'nav',
            {
              active: nowpath == '/main' || nowpath == '/personal' || nowpath == '/data',
            },
          ]"
        >
          首页
        </div>
        <div
          @click="changerouter('/indexmarket')"
          :class="[
            'nav',
            {
              active:
                nowpath == '/indexmarket' ||
                nowpath == '/charts' ||
                nowpath == '/indexs' ||
                nowpath == '/trade',
            },
          ]"
        >
          指数市场
        </div>
        <div
          @click="changerouter('/indexfund')"
          :class="[
            'nav',
            {
              active:
                nowpath == '/indexfund' ||
                nowpath == '/fundhistory' ||
                nowpath == '/profit-loss' ||
                nowpath == '/redemption' ||
                nowpath == '/buy',
            },
          ]"
        >
          指数基金
        </div>
        <div
          @click="changerouter('/flow')"
          :class="['nav', { active: nowpath == '/flow' || nowpath == '/flowdata' }]"
        >
          Staking
        </div>
        <div @click="openpdf()" class="nav">教程</div>
        <div @click="openbook()" class="nav">白皮书</div>
        <div @click="openaudit()" class="nav">审计报告</div>
        <div @click="opentel()" class="nav">Telegram</div>
      </div>
    </div>

    <div class="right_content">
      <div :class="['right_header']">
        <div class="left_img"><img src="../assets/img/SOKE-logo.png" alt="" /></div>
        <div class="language">
          <el-select v-model="value" placeholder="简体中文">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <router-view />
      <div class="bottom">V 1.0 SOKE</div>
    </div>

    <el-backtop :visibility-height="200" :bottom="100">
      <div
        style="
          width: 56px;
          height: 56px;
          background: #ffffff;
          box-shadow: 0px 0px 7px 0px rgba(146, 95, 243, 0.15);
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        "
      >
        <img style="width: 30px" src="../assets/img/jumphead.png" alt="" />
        <div
          style="
            position: absolute;
            bottom: -18px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #925ff3;
          "
        >
          返回顶部
        </div>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "简体中文",
        },
        {
          value: "en",
          label: "English",
        },
        {
          value: "jp",
          label: "日本語",
        },
        {
          value: "kr",
          label: "한국어",
        },
      ],
      value: "简体中文",
      scrollstatr: false,
      nowpath: "/main",
    };
  },
  beforeUpdate() {
    this.nowpath = this.$route.path;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.nowpath = this.$route.path;
  },
  methods: {
    opentel() {
      window.open("https://t.me/sokenetwork");
    },
    handleScroll() {
      var scrollTop = window.scrollY;
      if (scrollTop > 80) {
        this.scrollstatr = true;
      } else {
        this.scrollstatr = false;
      }
    },
    changerouter(p) {
      this.$router.push(p);
    },
    openpdf() {},
    openaudit() {
      window.open(
        "https://www.soke.network/api/profile/upload/2021/04/19/0cc6a4a1-0cbd-4367-85a4-51afeaf884f2.pdf"
      );
    },
    openbook() {
      window.open(
        "https://www.soke.network/api/profile/upload/2021/04/22/912096a9db894c28ad776b832da22125.pdf"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  background: #f6f6f6;
  display: flex;
  .leftnvawrapper {
    width: 14.27vw;
  }
  .left_nav {
    padding-left: 3.12vw;
    padding-top: 36px;

    .nav_head {
      font-size: 36px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #0f0f0f;
      opacity: 0.1;
      margin-bottom: 62px;
    }
    .nav {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      opacity: 0.8;
      margin-bottom: 40px;
      position: relative;
      cursor: pointer;
    }
  }
  .right_content {
    flex: 1;
    padding-right: 5vw;

    .right_header {
      padding: 24px 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
      .left_img {
        img {
          height: 50px;
        }
      }
      .language {
        width: 110px;
      }
    }
  }
}
.active {
  font-weight: bold !important;
  color: #925ff3 !important;
}
.sticky-menu {
  left: 0;
  margin: auto;
  position: fixed;
  top: 0;
  z-index: 9999;
  animation: 300ms ease-in-out 0s normal none 1 running fadeInLeft;
}
.active::after {
  content: "";
  display: block;
  width: 6px;
  height: 24px;
  background: #925ff3;
  position: absolute;
  left: -60px;
  top: -3px;
}
/deep/ .el-input__inner {
  background: #f6f6f6 !important;
  border: none !important;
  color: #000000 !important;
}
/deep/ .el-select .el-input .el-select__caret {
  color: #000000 !important;
}
/deep/ .el-progress-bar__innerText {
  display: none !important;
}
/deep/ .el-backtop {
  width: 56px !important;
  height: 56px !important;
}
.bottom {
  height: 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #000000;
}
</style>
