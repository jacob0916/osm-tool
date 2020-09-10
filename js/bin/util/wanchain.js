const config = require('../../cfg/config');
const KeyStore = require('./keystore');
const Web3 = require('web3');
const wanUtil = require('wanchain-util');
const Tx = wanUtil.wanchainTx;

const web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

function getSk(address) {
    return KeyStore.getPrivateKeyByKsPath(address, config.password, config.ksDir); // Buffer
}

function getContract(abi, address) {
    return new web3.eth.Contract(abi, address);
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
        console.log("sendTx senderAddr",senderAddr);
        console.log("sendTx nonce",rawTx.nonce.toString(10));
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
    } catch(err) {
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
    console.log("wlWkAddr",wlWkAddr);
    console.log("wlWalletAddr",wlWalletAddr);
    let now = parseInt(Date.now()/1000);
    let c = getContract(config.smgAbi, config.smgScAddr);
    return c.methods.storemanGroupRegisterStart(
        [smIn.grpId, smIn.preGrpId, smIn.workTime, smIn.totalTime, smIn.regDur, smIn.totalNodes, smIn.thresholds,
            smIn.srcChainId, smIn.dstChainId, smIn.srcCurve, smIn.dstCurve, smIn.minStakeIn, smIn.minDelegateIn,
            smIn.minPartIn,smIn.delegateFee],
        wlWkAddr,
        wlWalletAddr).encodeABI();

    // todo should change.
    // only for old version openStoreman group.
    // return c.methods.storemanGroupRegisterStart(
    //     smIn.grpId,
    //     now+10,
    //     smIn.totalTime,
    //     smIn.regDur,
    //     smIn.preGrpId,
    //     wlWkAddr,
    //     wlWalletAddr).encodeABI();
}

function buildStakeInData(grpId, wkPk, enodeId) {
    let c = getContract(config.smgAbi, config.smgScAddr);
    return c.methods.stakeIn(grpId,wkPk,enodeId).encodeABI();
}

module.exports = {
    buildOpenGrpData,
    buildStakeInData,
    getTxReceipt,
    sendTx,

};