import axios from 'axios'
import qs from 'qs'

var baseurl = 'http://94.74.122.203:9502'

export function getkline(params, token) {
    return axios({
        method: 'get',
        params: params,
        url: `${baseurl}/api/v1/contract/index/kline`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//获取nonce
export function getnonce(p) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/auth/nonce`
    })
}
//登录
export function login(p) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/auth/token`
    })
}
//首页全部数据
export function indexdata(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/index/index`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//获取全部的指数全部指数
export function allIndex(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/contract/indexes`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//获取指数行情
export function indexQuotes(params, token) {
    return axios({
        method: 'get',
        params: params,
        url: `${baseurl}/api/v1/contract/index/market`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//下单接口
export function order(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/contract/order/create`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//获取当前持仓
export function nowpositions(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/contract/positions`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//获取当前委托
export function noworders(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/contract/orders`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//获取历史委托
export function historyorders(params, token) {
    return axios({
        method: 'get',
        params: params,
        url: `${baseurl}/api/v1/contract/history/orders`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//平仓按钮
export function closeposition(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/contract/position/close`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//用户撤单
export function closeorder(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/contract/order/cancel`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//获取基金列表
export function fundlist(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/fund/products`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//基金购买
export function orderfunds(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/fund/product/buy/order`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//基金赎回
export function rewardfunds(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/fund/order/redeem`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//基金购买记录
export function fundhistory(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/fund/buy/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//基金赎回记录
export function fundbackhistory(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/fund/redeem/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//基金盈亏记录
export function fundreward(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/fund/reward/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//质押预下单接口
export function orderpledge(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/market/pledge/order`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//取消质押接口
export function removepledge(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/market/pledge/cancel`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//开启算力挖矿
export function powerstart(token) {
    return axios({
        method: 'post',
        url: `${baseurl}/api/v1/power/start`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//关闭算力挖矿
export function powerclose(token) {
    return axios({
        method: 'post',
        url: `${baseurl}/api/v1/power/stop`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//充值预下单接口
export function recharge(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/index/recharge/order`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//提现接口
export function withdraw(p, token) {
    var data = qs.stringify(p)

    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/index/withdraw`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//流动性质押盈利日志
export function incomelogs(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/market/income/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//流动性质押亏损日志
export function losslogs(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/market/loss/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
// console.log(res);
// if (res.data.code == 200) {
//   this.$message({
//     message: res.data.message,
//     type: "success",
//   });
// } else if (res.data.code == 403) {
//   this.$message.error(res.data.message);
//   localStorage.removeItem("token");
//   localStorage.removeItem("address");
//   location.reload();
// } else {
//   this.$message.error(res.data.message);
// }
//正式质押接口
export function formalpledge(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/market/pledge`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//正式充值接口
export function formalrecharge(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/index/recharge`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//算力挖矿
export function powerrewrad(p, token) {
    return axios({
        method: 'get',
        params: p,
        url: `${baseurl}/api/v1/power/reward/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//做市盈亏
export function marketrewrad(token) {
    return axios({
        method: 'get',
        url: `${baseurl}/api/v1/market/reward/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}
//指数盈亏
export function contractrewrad(token) {
    return axios({
        method: 'get',
        // params: params,
        url: `${baseurl}/api/v1/contract/reward/logs`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}

//基金正式下单
export function formalfund(p, token) {
    var data = qs.stringify(p)
    return axios({
        method: 'post',
        data: data,
        url: `${baseurl}/api/v1/fund/product/buy`,
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
}