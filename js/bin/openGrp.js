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
    .describe('rd', 'regDur uint:second')
    .describe('gd', 'gpkDur')
    .describe('hd', 'htlcDur')
    .describe('tn', 'total nodes')
    .describe('th', 'thresholds nodes')
    .describe('gid', 'grpId')
    .describe('pgid', 'preGrpId')
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
    .describe('network', 'network name')
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

let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx} = require('./util/wanchain');

function stringTobytes32(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8')
    let id = '0x' + b.toString('hex')
    return id
}


function getGrpIdByString(str) {
    return stringTobytes32(str);
}

async function main() {

    // only admin can open group.
    let smIn = {
        regDur: argv.rd,
        gpkDur: argv.gd,
        htlcDur: argv.hd,
        totalNodes: argv.tn,
        thresholds: argv.th,
        grpId: argv.gid,
        preGrpId: argv.pgid,
        srcChainId: argv.srcid,
        dstChainId: argv.dstid,
        srcCurve: argv.scrv,
        dstCurve: argv.dcrv,
        minStakeIn: argv.ms,
        minDelegateIn: argv.md,
        minPartIn:argv.mp,
        delegateFee: argv.df,
        workTime: '',
        totalTime: ''
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
    console.log("smIn",smIn);
    await doOpenGrp(smIn, wlWkAddr, wlWallectAddr);
    console.log("========================done=========================");
}


function updateSmIn(smIn) {
    // build workTime and totalTime
    smIn.workTime = parseInt(Date.now() / 1000) + smIn.regDur + smIn.gpkDur;
    smIn.totalTime = smIn.htlcDur;
    smIn.grpId = getGrpIdByString(smIn.grpId);
    smIn.preGrpId = getGrpIdByString(smIn.preGrpId);
}

async function doOpenGrp(smIn, wlWkAddr, wlWalletAddr) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await buildOpenGrpData(smIn, wlWkAddr, wlWalletAddr);
            console.log("data of doOpenGrp",data);
            let txHash = '';

            //todo should change
            //txHash = await sendTx(config.ownerAddr, config.smgScAddr, 0x0, data);
            txHash = await sendTx(config.adminAddr, config.smgScAddr, 0x0, data);
            console.log("doOpenGrp txHash",txHash);
            resolve(txHash);
        } catch (err) {
            console.log("doOpenGrp error",err.message);
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