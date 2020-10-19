const config = require('../../cfg/config');
const KeyStore = require('./keystore');
const Web3 = require('web3');
const wanUtil = require('wanchain-util');
const Tx = wanUtil.wanchainTx;

const web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
const BigNubmer = require('bignumber.js');


function getSk(address) {
    return KeyStore.getPrivateKeyByKsPath(address, config.password, config.ksDir); // Buffer
}

function getSkByFile(address, filePath) {
    return KeyStore.getPrivateKeyByKsFile(address, config.password, filePath); // Buffer
}

function getContract(abi, address) {
    return new web3.eth.Contract(abi, address);
}


async function sendWan(from, to, value, ksFile) {
    return new Promise(async (resolve) => {
        let rawTx = {
            Txtype: 0x01, // wanchain only
            gasPrice: web3.utils.toBN(config.gasPriceTransfer),
            gasLimit: web3.utils.toBN(config.gasLimitTransfer),
            to: to,
            value: web3.utils.toBN(value),
            data: '0x'
        };
        rawTx.nonce = await getNonceByWeb3(from);
        let tx = new Tx(rawTx);
        console.log("sendTx senderAddr", from);
        console.log("sendTx nonce", rawTx.nonce.toString(10));
        tx.sign(getSkByFile(from, ksFile));
        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .on('transactionHash', txHash => {
                resolve(txHash);
            })
            .on('error', err => {
                console.error("sendWan error", err);
                resolve('');
            })
    });
}

async function sendTx(senderAddr, contractAddr, msgValue, data) {
    return new Promise(async (resolve) => {
        if (0 != data.indexOf('0x')) {
            data = '0x' + data;
        }
        let rawTx = {
            Txtype: 0x01, // wanchain only
            gasPrice: config.gasPrice,
            gasLimit: config.gasLimit,
            to: contractAddr,
            value: web3.utils.toBN(msgValue),
            data: data
        };
        rawTx.nonce = await getNonceByWeb3(senderAddr);
        let tx = new Tx(rawTx);
        console.log("sendTx senderAddr", senderAddr);
        console.log("sendTx nonce", rawTx.nonce.toString(10));
        tx.sign(getSk(senderAddr));
        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .on('transactionHash', txHash => {
                // console.log("txHash: %s", txHash);
                resolve(txHash);
            })
            .on('error', err => {
                console.error("send tx data %s to contract %s error: %O", data, contractAddr, err);
                resolve('');
            })
    });
}

async function getTxReceipt(txHash, name = '') {
    try {
        let receipt = await web3.eth.getTransactionReceipt(txHash);
        console.log("getTxReceipt %s(%s) receipt %s gas %s", name, txHash, receipt.status, receipt.gasUsed);
        return receipt;
    } catch (err) {
        console.log("getTxReceipt %s(%s) none: %O", name, txHash, err);
        return null;
    }
}

async function getNonceByWeb3(addr, includePendingOrNot = true) {
    let nonce;
    return new Promise(function (resolve, reject) {
        try {
            if (includePendingOrNot) {

                try {
                    web3.eth.getTransactionCount(addr, 'pending', function (err, result) {
                        if (!err) {
                            nonce = '0x' + result.toString(16);
                            resolve(nonce);
                        } else {
                            reject(err);
                        }
                    })
                } catch (err) {
                    reject(err)
                }

            } else {
                try {
                    web3.eth.getTransactionCount(addr, function (err, result) {
                        if (!err) {
                            nonce = '0x' + result.toString(16);
                            resolve(nonce);
                        } else {
                            reject(err);
                        }
                    })
                } catch (err) {
                    reject(err);
                }

            }
        } catch (err) {
            logger.error("Entering getNonceByWeb3 try catch");
            reject(err);
        }
    })
};


// let smIn = {
//     regDur: argv.rd,
//     gpkDur: argv.gd,
//     htlcDur: argv.hd,
//     totalNodes: argv.tn,
//     thresholds: argv.th,
//     grpId: argv.gid,
//     preGrpId: argv.pgid,
//     srcChainId: argv.srcid,
//     dstChainId: argv.dstid,
//     srcCurve: argv.scrv,
//     dstCurve: argv.dcrv,
//     minStakeIn: argv.ms,
//     minDelegateIn: argv.md,
//     minPartIn:argv.mp,
//     delegateFee: argv.df,
//     workTime: '',
//     totalTime: ''
// };
function buildOpenGrpData(smIn, wlWkAddr, wlWalletAddr) {
    console.log("wlWkAddr", wlWkAddr);
    console.log("wlWalletAddr", wlWalletAddr);
    let now = parseInt(Date.now() / 1000);
    let c = getContract(config.smgAbi, config.smgScAddr);

    console.log("msInput",smIn.minStakeIn);

    let msBig = new BigNubmer(smIn.minStakeIn);
    let mdBig = new BigNubmer(smIn.minDelegateIn);
    let mpBig = new BigNubmer(smIn.minPartIn);

    let ms,md,mp;

    ms = msBig.toString(10);
    md = mdBig.toString(10);
    mp = mpBig.toString(10);

    console.log("========================");
    console.log("ms",ms);
    console.log("md",md);
    console.log("mp",mp);

    return c.methods.storemanGroupRegisterStart(
        [smIn.grpId, smIn.preGrpId, smIn.workTime, smIn.totalTime, smIn.regDur, smIn.totalNodes, smIn.thresholds,
            smIn.srcChainId, smIn.dstChainId, smIn.srcCurve, smIn.dstCurve, ms, md,
            mp, smIn.delegateFee],
        wlWkAddr,
        wlWalletAddr).encodeABI();

}

function buildStakeInData(grpId, wkPk, enodeId) {
    let c = getContract(config.smgAbi, config.smgScAddr);
    return c.methods.stakeIn(grpId, wkPk, enodeId).encodeABI();
}

function buildStakeOutData(wkAddr) {
    let c = getContract(config.smgAbi, config.smgScAddr);
    return c.methods.stakeClaim(wkAddr).encodeABI();
}

//setPeriod('0x000000000000000000000000000000000000000000746573746e65745f303032',259200,86400,259200,{from:'0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e',gasLimit:1e9,gasPrice:1e12})
function buildSetPeriod(grpId, ployCommitTimeout, defaultTimeout, neogationTimeout){
    let c = getContract(config.gpkAbi, config.gpkScAddr);
    return c.methods.setPeriod(grpId,ployCommitTimeout,defaultTimeout,neogationTimeout).encodeABI();
}

module.exports = {
    buildOpenGrpData,
    buildStakeInData,
    buildStakeOutData,
    getTxReceipt,
    sendTx,
    sendWan,
    buildSetPeriod,
};