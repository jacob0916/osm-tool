const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const osmTools = require('./util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('network', 'network name')
    .describe('grpPrex', 'prefix of the grp')        // Aries
    .describe('gid', 'grpId')
    .describe('pgid', 'preGrpId')

    .describe('pct', 'polyCommitTimeout uint:day')          //day
    .describe('dt', 'defaultTimeout uint:day')              //day
    .describe('nt', 'neogationTimeout uint:day')            //day

    .describe('rd', 'regDur uint:day')                      //day
    .describe('wt', 'worktime "2020/10/19-12:00:00"')        //string
    .describe('tt', 'totalTime uint:day')                    //day

    .describe('tn', 'total nodes')
    .describe('th', 'thresholds nodes')

    .describe('srcid', 'srcChainId')
    .describe('dstid', 'dstChainId')
    .describe('scrv', 'srcCurve')
    .describe('dcrv', 'dstCurve')
    .describe('ms', 'minStakeIn uint:wei')
    .describe('md', 'minDelegateIn')
    .describe('mp', 'minPartIn')
    .describe('df', 'delegateFee')

    .describe('wlStart', 'White start index')
    .describe('wlCount', 'White count')

    .describe('sec', 'second')

    .string('wt')
    .boolean('sec')
    .default('tn', 21)
    .default('th', 17)
    .default('srcid', '2153201998')
    .default('dstid', '2147483708')
    .default('scrv', 1)
    .default('dcrv', 1)
    .default('wlStart', 0)
    .default('wlCount', 5)
    .default('ms', 2000)
    .default('md', 100)
    .default('mp', 50)
    .default('df', 100)
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
global.sec = argv["sec"];
global.grpPrex = argv["grpPrex"];

const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx, buildSetPeriod} = require('./util/wanchain');


async function main() {

    // only admin can open group.
    let smIn = {
        grpId: argv.gid,
        preGrpId: argv.pgid,

        polyCMTimeout: argv.pct,        //day
        defaultTimeout: argv.dt,        //day
        neogationTimeout: argv.nt,      //day

        regDur: argv.rd,                //day
        workTime: argv.wt,               // 2020/10/19-14:00:00
        totalTime: argv.tt,             //day


        totalNodes: argv.tn,
        thresholds: argv.th,

        srcChainId: argv.srcid,
        dstChainId: argv.dstid,
        srcCurve: argv.scrv,
        dstCurve: argv.dcrv,
        minStakeIn: argv.ms,
        minDelegateIn: argv.md,
        minPartIn: argv.mp,
        delegateFee: argv.df,
    };
    let wlStartIndex = argv.wlStart;
    let wlCount = argv.wlCount;
    console.log(smIn);

    // waddr, wkaddr, wkpk, enodeId


    let linesRelation = await osmTools.processLineByLine(config.RelationList);
    let wlWallectAddr = [];
    let wlWkAddr = [];

    if (parseInt(linesRelation.length) < (parseInt(wlStartIndex) + parseInt(wlCount))) {
        throw new Error("Relation file content is too less");
    }

    for (let i = wlStartIndex; i < wlStartIndex + wlCount; i++) {
        //console.log("Befor split",linesRelation[i]);
        let ret = osmTools.split(linesRelation[i]);
        //console.log("After split",ret);

        // wlWallectAddr.push(osmTools.split(linesRelation[i])[0]);
        // wlWkAddr.push(osmTools.split(linesRelation[i])[1]);

        wlWallectAddr.push(ret[0]);
        wlWkAddr.push(ret[1]);
    }

    updateSmIn(smIn);
    console.log("smIn(update)", smIn);
    let txHash = await doOpenGrp(smIn, wlWkAddr, wlWallectAddr);
    let receipt = null;

    if (txHash.length) {
        while (receipt == null) {
            receipt = await getTxReceipt(txHash);
            await osmTools.sleep(1000);
        }
        if (receipt.status) {
            console.log("doOpenGrp tx %s successfully", txHash);
        } else {
            console.log("doOpenGrp tx %s fail", txHash);
        }
    }


    let grpId = smIn.grpId;
    txHash = await doSetPeriod(grpId, smIn.polyCMTimeout, smIn.defaultTimeout, smIn.neogationTimeout);

    if (txHash.length) {
        receipt = null;
        while (receipt == null) {
            receipt = await getTxReceipt(txHash);
            await osmTools.sleep(1000);
        }
        if (receipt.status) {
            console.log("doSetPeriod tx %s successfully", txHash);
        } else {
            console.log("doSetPeriod tx %s fail", txHash);
        }
    }

    console.log("========================done=========================");
}


function updateSmIn(smIn) {

    let regDay = 0;
    regDay = parseInt(smIn.regDur);

    let polyCommitTimeoutDay = parseInt(smIn.polyCMTimeout);
    console.log("gpkDay", polyCommitTimeoutDay);

    // workTime : should input by such as "2019/10/19-12:00:00"

    let ret = osmTools.getTimeStampByStr(smIn.workTime);
    smIn.workTime = ret;

    smIn.grpId = osmTools.getGrpIdByString(smIn.grpId);
    smIn.preGrpId = osmTools.getGrpIdByString(smIn.preGrpId);

    if (!!global.sec) {
        smIn.polyCMTimeout = parseInt(smIn.polyCMTimeout);
        smIn.defaultTimeout = parseInt(smIn.defaultTimeout);
        smIn.neogationTimeout = parseInt(smIn.neogationTimeout);

        smIn.regDur = parseInt(smIn.regDur);
        smIn.totalTime = parseInt(smIn.totalTime);
    } else {
        smIn.polyCMTimeout = parseInt(smIn.polyCMTimeout) * 86400;
        smIn.defaultTimeout = parseInt(smIn.defaultTimeout) * 86400;
        smIn.neogationTimeout = parseInt(smIn.neogationTimeout) * 86400;

        smIn.regDur = parseInt(smIn.regDur) * 86400;
        smIn.totalTime = parseInt(smIn.totalTime) * 86400;
    }
}


async function doOpenGrp(smIn, wlWkAddr, wlWalletAddr) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await buildOpenGrpData(smIn, wlWkAddr, wlWalletAddr);
            console.log("data of doOpenGrp", data);
            let txHash = '';


            //txHash = await sendTx(config.adminAddr, config.smgScAddr, 0x0, data);

            console.log("doOpenGrp txHash", txHash);
            resolve(txHash);
        } catch (err) {
            console.log("doOpenGrp error", err.message);
            reject(err);
        }
    });

}

async function doSetPeriod(grpId, polyCommitTimeout, defaultTimeout, neogationTimeout) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await buildSetPeriod(grpId, polyCommitTimeout, defaultTimeout, neogationTimeout);
            console.log("data of buildSetPeriod", data);
            let txHash = '';

            //txHash = await sendTx(config.adminAddr, config.gpkScAddr, 0x0, data);

            console.log("doSetPeriod txHash", txHash);
            resolve(txHash);
        } catch (err) {
            console.log("doSetPeriod error", err.message);
            reject(err);
        }
    });

}

main();