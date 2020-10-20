/*
=================
parameters.
=================
grpId
wkPk
enodeId
stakeInValue
smStartIndex
smCount
 */

const Web3 = require('web3');
const fs = require('fs');
const readline = require('readline');
const BigNumber = require('bignumber.js');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('gid', 'grpId')
    .describe('smsi', 'sm start index')
    .describe('smcnt', 'sm count')
    .describe('amount', 'stake in amount')
    .describe('network', 'network name')
    .default('smsi', 0)
    .default('smcnt', 30)
    .default('amount', 2000)
    .default('network', 'internal')
    .argv;

console.log("=====================start====================");
global.network = argv["network"];
const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx} = require('./util/wanchain');

async function main() {

    // only admin can open group.
    console.log(argv);
    let grpId = getGrpIdByString(argv.gid);
    let smStartIndex = argv.smsi;
    let smCount = argv.smcnt;
    //let msgValue = web3.utils.toBN(argv.amount);
    console.log("argv.amount", argv.amount);
    let amountBig;
    amountBig = new BigNumber(argv.amount);
    console.log("amountBig", amountBig.toString(10));
    // waddr, wkaddr, wkpk, enodeId
    let linesRelation = await processLineByLine(config.RelationList);

    for (let i = smStartIndex; i < smStartIndex + smCount; i++) {
        console.log(linesRelation[i]);
        let msgValueTempBig;

        msgValueTempBig = amountBig.minus(new BigNumber(i * 100));
        let msgValueTemp;
        msgValueTemp = msgValueTempBig.toString(10);

        console.log("msgValueTemp", msgValueTemp);


        let txHash = await doStake(split(linesRelation[i])[0],
            config.smgScAddr,
            msgValueTemp,
            grpId,
            split(linesRelation[i])[2],
            split(linesRelation[i])[3]);

        console.log("============txHash", txHash);
    }
    console.log("========================done=========================");

}

async function doStake(walletAddr, smgAddr, msgValue, grpId, wkPk, enodeId) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await  buildStakeInData(grpId, wkPk, enodeId);
            let txHash = await sendTx(walletAddr, smgAddr, msgValue, data);
            resolve(txHash);
        } catch (err) {
            reject(err);
        }
    })
}


function stringTobytes32(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8');
    let id = '0x' + b.toString('hex');
    return id
}


function getGrpIdByString(str) {
    return stringTobytes32(str);
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