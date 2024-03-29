import { login, getnonce } from '../api'
import web3 from 'web3'
var abi = [{
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "_addr",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
var poolabi = [{
        "constant": false,
        "inputs": [],
        "name": "cancelPledge",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_sokeTokenAddr",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CancelPledge",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pledge",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Pledge",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "type": "event"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPledge",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getProfit",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalPledge",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalRemain",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
var sokeabi = [{
        "constant": false,
        "inputs": [],
        "name": "cancelPledge",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "pledge",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_sokeTokenAddr",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CancelPledge",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Pledge",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPledge",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getProfit",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalPledge",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalRemain",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
var Web3 = new web3(window.ethereum)
export function checknetwork() {
    if (Web3.currentProvider.chainId == '0x41') {
        return true
    } else {
        return false
    }
}

//检测是否登录授权签名
function checkloginwallet(address) {
    return new Promise(resolve => {
        getnonce({ address: address })
            .then((res) => {
                if (res.data.code == 200) {
                    Web3.eth.personal
                        .sign(
                            Web3.utils.utf8ToHex(res.data.data.nonce),
                            address
                        )
                        .then((resdata) => {

                            login({
                                address: address,
                                signature: resdata,
                            }).then((reslog) => {

                                if (reslog.data.code == 200) {
                                    localStorage.setItem('token', reslog.data.data.access_token)
                                    resolve(true)
                                } else {
                                    alert(reslog.data.message)
                                    resolve(false)
                                }
                            });
                        }).catch(err => {
                            console.log(err)
                            resolve(false)
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(false)
            });
    })




}
//soke转账
function contrat(to, address, value) {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(abi, '0x1ee27206637Be5990D6227010d456Ebf577EbfBd')
        mycontract.methods.transfer(to, Web3.utils.toWei('' + value, 'mwei')).send({ from: address }, function(err, res) {
            if (res) {

                resolve(res)
            } else {
                rejected(err)
            }



        })
    })

}
//获取soke余额
function getbalancesoke(address) {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(abi, '0x1ee27206637Be5990D6227010d456Ebf577EbfBd')
        mycontract.methods.balanceOf(address).call(function(err, res) {

            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }


        })


    })

}
//流动矿池质押
function flowpool(address, value) {

    return new Promise((resolve, rejected) => {
        let poolcontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        poolcontract.methods.pledge().send({ from: address, value: Web3.utils.toWei('' + value, 'ether') }, function(err, res) {

            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }

        })
    })

}
//流动矿池解除质押
function Cancelflowpool(address) {
    return new Promise(resolve => {
        let poolcontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        poolcontract.methods.cancelPledge().send({ from: address }, function(err, res) {
            resolve(res)
            resolve(err)
        })
    })

}
//获取可领取收益getProfit
function getincome(address) {
    return new Promise(function(resolve, rejected) {
        let poolcontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        poolcontract.methods.getProfit().call({ from: address }, function(err, res) {
            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }


        })
    })

}
//获取收益
function clickwihthdraw(address) {
    return new Promise((resolve, rejected) => {
        let poolcontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        poolcontract.methods.withdraw().send({ from: address }, function(err, res) {
            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }
        })
    })

}
//获取okt余额
function getoktbalance(address) {
    return new Promise((resolve, rejected) => {
        Web3.eth.getBalance(address, function(err, res) {
            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }
        })
    })

}
//流动性矿池获取总质押
function allpledge() {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        mycontract.methods.totalPledge().call(function(err, res) {
            if (res) {

                resolve(res)
            } else {
                rejected(err)
            }


        })


    })

}

//我的质押
function mypledge(address) {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(poolabi, '0x9e3b8F276aecbC2ceA854d7AE73C00E16be41763')
        mycontract.methods.getPledge().call({ from: address }, function(err, res) {
            if (res) {

                resolve(res)
            } else {
                rejected(err)
            }


        })


    })

}
//soke 授权approve
function sokeapprove(address, value) {
    return new Promise((resolve, rejected) => {
        let sokecontract = new Web3.eth.Contract(abi, '0x1ee27206637Be5990D6227010d456Ebf577EbfBd')
        sokecontract.methods.approve('0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210', Web3.utils.toWei(value.toString(), 'mwei')).send({ from: address }, function(err, res) {
            if (res) {
                resolve(res)

            } else {
                rejected(err)
                console.log(err)
            }

        })
    })
}

//soke质押
function sokepledgefunc(address, value) {
    return new Promise((resolve, rejected) => {
        let poolcontract = new Web3.eth.Contract(sokeabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        poolcontract.methods.pledge(Web3.utils.toWei(value.toString(), 'mwei')).send({ from: address }, function(err, res) {
            if (res) {
                resolve(res)
                console.log(res)
            } else {
                rejected(err)
                console.log(err)
            }

        })
    })
}
//soke 解除质押
function Cancelsoke(address) {
    return new Promise(resolve => {
        let poolcontract = new Web3.eth.Contract(sokeabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        poolcontract.methods.cancelPledge().send({ from: address }, function(err, res) {
            resolve(res)
            resolve(err)
        })
    })

}

//我的soke质押
function mypledgesokefunc(address) {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(sokeabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        mycontract.methods.getPledge().call({ from: address }, function(err, res) {
            if (res) {

                resolve(res)

            } else {
                rejected(err)
                console.log(err)
            }

        })


    })

}
//soke矿池获取总质押
function allpledgesoke() {
    return new Promise((resolve, rejected) => {
        var mycontract = new Web3.eth.Contract(poolabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        mycontract.methods.totalPledge().call(function(err, res) {
            if (res) {

                resolve(res)
            } else {
                rejected(err)
            }


        })


    })

}
//soke可领取收益
//获取可领取收益getProfit
function getincomesoke(address) {
    return new Promise(function(resolve, rejected) {
        let poolcontract = new Web3.eth.Contract(sokeabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        poolcontract.methods.getProfit().call({ from: address }, function(err, res) {
            if (res) {
                resolve(res)
                console.log(res)
            } else {
                rejected(err)
                console.log(err)
            }


        })
    })

}

//soke 领取收益

function getprofitsoke(address) {
    return new Promise((resolve, rejected) => {
        let poolcontract = new Web3.eth.Contract(sokeabi, '0xb4Dcb96c813804d88cc9c5164A64651F07Bcf210')
        poolcontract.methods.withdraw().send({ from: address }, function(err, res) {
            if (res) {
                resolve(res)
            } else {
                rejected(err)
            }
        })
    })

}

















export async function check(address) {
    let res = await checkloginwallet(address)
    return res
}
export async function transfermain(to, address, value) {
    let res = await contrat(to, address, value)
    return res
}
export async function poolpledge(address, value) {
    let data = await flowpool(address, value)
    return data
}
export async function balancedata(address) {
    let data = await getbalancesoke(address)
    return data
}
export async function Cancelple(address) {
    let data = await Cancelflowpool(address)
    return data
}
export async function getprof(address) {
    let data = getincome(address)
    return data
}
export async function getallple() {
    let data = allpledge()
    return data
}
export async function getwithdraw(address) {
    let data = clickwihthdraw(address)
    return data
}
export async function getbalanceokt(address) {
    let data = getoktbalance(address)
    return data
}
export async function getmypledge(address) {
    let data = mypledge(address)
    return data
}
export async function sokepledge(address, value) {
    let data = sokepledgefunc(address, value)
    return data
}
export async function canclesokepledge(address) {
    let data = Cancelsoke(address)
    return data
}
export async function mypledgesoke(address) {
    let data = mypledgesokefunc(address)
    return data
}
export async function mypledgesokeall() {
    let data = allpledgesoke()
    return data
}
export async function getprofsoke(address) {
    let data = getincomesoke(address)
    return data
}
//sokeapprove
export async function approve(address, value) {
    let data = sokeapprove(address, value)
    return data
}
//getprofitsoke
export async function sokeprofit(address) {
    let data = getprofitsoke(address)
    return data
}