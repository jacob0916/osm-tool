/*

=====
smIn
====
regDur              rd
gpkDur              gd
htlcDur             hd
totalNodes          tn
thresholds          th
grpId               gid
preGrpId            pgid


srcChainId      2153201998      srcid
dstChainId      2147483708      dstid
srcCurve        1               scrv
dstCurve        1               dcrv
minStakeIn                      ms
minDelegateIn                   md
delegateFee                     df


===
wlWkAddr                []
===

===
wlWalletAddr            []
===

gasPrice
gas
 */
const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('network', 'network name')
    .describe('gid', 'grpId')
    .describe('pgid', 'preGrpId')

    .describe('pct', 'polyCommitTimeout uint:day')          //day
    .describe('dt', 'defaultTimeout uint:day')              //day
    .describe('nt', 'neogationTimeout uint:day')            //day

    .describe('rd', 'regDur uint:day')                      //day
    .describe('wt','worktime "2020/10/19-12:00:00"')        //string
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

    .string('wt')
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

const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx, buildSetPeriod} = require('./util/wanchain');

function stringTobytes32(name) {
    let b = Buffer.alloc(32);
    b.write(name, 32 - name.length, 'utf8');
    let id = '0x' + b.toString('hex');
    return id
}


function getGrpIdByString(str) {
    return stringTobytes32(str);
}

async function main() {

    // only admin can open group.
    let smIn = {
        grpId: argv.gid,
        preGrpId: argv.pgid,

        polyCMTimeout: argv.pct,        //day
        defaultTimeout: argv.dt,        //day
        neogationTimeout: argv.nt,      //day

        regDur: argv.rd,                //day
        workTime:argv.wt,               // 2020/10/19-14:00:00
        totalTime: argv.tt,             //day


        totalNodes: argv.tn,
        thresholds: argv.th,

        srcChainId: argv.srcid,
        dstChainId: argv.dstid,
        srcCurve: argv.scrv,
        dstCurve: argv.dcrv,
        minStakeIn: argv.ms,
        minDelegateIn: argv.md,
        minPartIn:argv.mp,
        delegateFee: argv.df,
    };
    let wlStartIndex = argv.wlStart;
    let wlCount = argv.wlCount;
    console.log(smIn);

    // waddr, wkaddr, wkpk, enodeId


    let linesRelation = await processLineByLine(config.RelationList);
    let wlWallectAddr = [];
    let wlWkAddr = [];
    for (let i = wlStartIndex; i < wlStartIndex + wlCount; i++) {
        console.log(linesRelation[i]);
        wlWallectAddr.push(split(linesRelation[i])[0]);
        wlWkAddr.push(split(linesRelation[i])[1]);
    }

    updateSmIn(smIn);
    console.log("smIn(update)",smIn);
    await doOpenGrp(smIn, wlWkAddr, wlWallectAddr);

    let grpId = smIn.grpId;
    await doSetPeriod(grpId,smIn.polyCMTimeout,smIn.defaultTimeout,smIn.neogationTimeout);
    console.log("========================done=========================");
}


function updateSmIn(smIn) {
    // build workTime and totalTime
    // let regDay = 0;
    // if(parseInt(smIn.regDur%86400) == 0){
    //     regDay = parseInt(smIn.regDur/86400);
    // }else{
    //     regDay = parseInt(smIn.regDur/86400) + 1;
    // }
    // console.log("regDay",regDay);
    //
    // let gpkDay = 0;
    // if(parseInt(smIn.gpkDur%86400) == 0){
    //     gpkDay = parseInt(smIn.gpkDur/86400);
    // }else{
    //     gpkDay = parseInt(smIn.gpkDur/86400) + 1;
    // }

    let regDay = 0;
    regDay = parseInt(smIn.regDur);

    let polyCommitTimeoutDay = parseInt(smIn.polyCMTimeout);
    console.log("gpkDay",polyCommitTimeoutDay);

    // workTime : should input by such as "2019/10/19-12:00:00"
    // smIn.workTime = parseInt(Date.now() / 1000/86400 + regDay )*86400 + 3600*4;
    // smIn.workTime = smIn.workTime + gpkDay*86400;

    let ret = getTimeStampByStr(smIn.workTime);
    smIn.workTime = ret;

    smIn.grpId = getGrpIdByString(smIn.grpId);
    smIn.preGrpId = getGrpIdByString(smIn.preGrpId);

    smIn.polyCMTimeout = parseInt(smIn.polyCMTimeout)*86400;
    smIn.defaultTimeout = parseInt(smIn.defaultTimeout)*86400;
    smIn.neogationTimeout = parseInt(smIn.neogationTimeout)*86400;

    smIn.regDur = parseInt(smIn.regDur)*86400;
    smIn.totalTime = parseInt(smIn.totalTime)*86400;

}

// "2019/10/19-12:00:00"
function getTimeStampByStr(dateTimeStr){
    let  errInvalidDateTimeStr = new Error("invalid date and time string ,should like 2019/10/19-12:00:00");

        let  t = dateTimeStr.split("-");
        if(t.length != 2){
            console.log("invalid date and time string ,should like 2019/10/19-12:00:00");
            throw errInvalidDateTimeStr;
        }else{
            let [year,month,day] = t[0].split("/");
            let [h,minute,second] = t[1].split(":");

            if(parseInt(t[0].split("/").length) != 3 || t[1].split(":").length != 3){
                throw errInvalidDateTimeStr
            }
            let  myDate= new Date(year,parseInt(month)-1,day,h,minute,second);
            return  myDate.getTime()/1000;
        }
}
async function doOpenGrp(smIn, wlWkAddr, wlWalletAddr) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await buildOpenGrpData(smIn, wlWkAddr, wlWalletAddr);
            console.log("data of doOpenGrp",data);
            let txHash = '';


            txHash = await sendTx(config.adminAddr, config.smgScAddr, 0x0, data);

            console.log("doOpenGrp txHash",txHash);
            resolve(txHash);
        } catch (err) {
            console.log("doOpenGrp error",err.message);
            reject(err);
        }
    });

}

async function doSetPeriod(grpId, polyCommitTimeout, defaultTimeout, neogationTimeout) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await buildSetPeriod(grpId, polyCommitTimeout, defaultTimeout,neogationTimeout);
            console.log("data of buildSetPeriod",data);
            let txHash = '';

            txHash = await sendTx(config.adminAddr, config.gpkScAddr, 0x0, data);

            console.log("doSetPeriod txHash",txHash);
            resolve(txHash);
        } catch (err) {
            console.log("doSetPeriod error",err.message);
            reject(err);
        }
    });

}

async function processLineByLine(fileName) {
    return new Promise((resolve, reject) => {

        try {
            let lines = [];
            const rl = readline.createInterface({
                input: fs.createReadStream(fileName),
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                lines.push(line)
            });
            rl.on('close', () => {
                resolve(lines);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function split(line, sep = '\t') {
    return line.split(sep);
}

main();