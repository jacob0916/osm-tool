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
const net = require('net');
const fs = require('fs');
const readline = require('readline');
const BigNumber = require('bignumber.js');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('gid', 'grpId')
    .describe('smsi', 'sm start index')
    .describe('smcnt', 'sm count')
    .describe('network', 'network name')
    .default('smsi', 0)
    .default('smcnt', 30)
    .default('network', 'internal')
    .argv;

console.log("=====================start====================");
global.network = argv["network"];
const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

let {buildOpenGrpData, buildStakeOutData, getTxReceipt, sendTx} = require('./util/wanchain');

async function main() {

    // only admin can open group.
    console.log(argv);
    let grpId = getGrpIdByString(argv.gid);
    let smStartIndex = argv.smsi;
    let smCount = argv.smcnt;
    let linesRelation = await processLineByLine(config.RelationList);

    for (let i = smStartIndex; i < smStartIndex + smCount; i++) {
        //console.log(linesRelation[i]);
        console.log("walletAddr",split(linesRelation[i])[0],"wkAddr:",split(linesRelation[i])[1]);
        let txHash = await doStakeOut(split(linesRelation[i])[0],config.smgScAddr,split(linesRelation[i])[1]);

        console.log("============txHash",txHash);
    }
    console.log("========================done=========================");

}

async function doStakeOut(walletAddr, smgAddr, wkAddr) {
    return new Promise(async (resolve, reject) => {
        try {
            let msgValue=0x0;
            let data = await  buildStakeOutData(wkAddr);
            let txHash = await sendTx(walletAddr, smgAddr, msgValue, data);
            resolve(txHash);
            //resolve('');
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