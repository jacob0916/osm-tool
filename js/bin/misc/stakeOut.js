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

const osmTools = require('./util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('gid', 'grpId')
    .describe('smsi', 'sm start index')
    .describe('smcnt', 'sm count')
    .describe('network', 'network name')
    .describe('grpPrex', 'prefix of the grp')        // Aries
    .default('smsi', 0)
    .default('smcnt', 30)
    .default('network', 'internal')
    .argv;

console.log("=====================start====================");
global.network = argv["network"];
global.grpPrex = argv["grpPrex"];

const config = require('../../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

let {buildOpenGrpData, buildStakeOutData, getTxReceipt, sendTx} = require('./util/wanchain');

async function main() {

    // only admin can open group.
    console.log(argv);
    let grpId = osmTools.getGrpIdByString(argv.gid);
    let smStartIndex = argv.smsi;
    let smCount = argv.smcnt;
    let linesRelation = await osmTools.processLineByLine(config.RelationList);

    for (let i = smStartIndex; i < smStartIndex + smCount; i++) {
        //console.log(linesRelation[i]);
        console.log("walletAddr", osmTools.split(linesRelation[i])[0], "wkAddr:", osmTools.split(linesRelation[i])[1]);
        let txHash = await doStakeOut(osmTools.split(linesRelation[i])[0], config.smgScAddr, osmTools.split(linesRelation[i])[1]);

        console.log("============txHash", txHash);
    }
    console.log("========================done=========================");

}

async function doStakeOut(walletAddr, smgAddr, wkAddr) {
    return new Promise(async (resolve, reject) => {
        try {
            let msgValue = 0x0;
            let data = await  buildStakeOutData(wkAddr);
            let txHash = await sendTx(walletAddr, smgAddr, msgValue, data);
            resolve(txHash);
            //resolve('');
        } catch (err) {
            reject(err);
        }
    })
}

main();