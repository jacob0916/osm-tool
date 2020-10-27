const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const osmTools = require('../util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --network")
    .alias('h', 'help')
    .describe('network', 'network')
    .describe('grpPrex', 'prefix of the grp')        // Aries
    .default('network', 'internal')
    .argv;

global.network = argv["network"];
global.grpPrex = argv["grpPrex"];

const config = require('../../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

const {sendWan} = require('../util/wanchain');


async function main() {

    await doGather();
}


async function doGather() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesRelation = await osmTools.processLineByLine(config.gatherKsList);

    for (let i = 0; i < linesRelation.length; i++) {
        console.log(linesRelation[i]);
        let tokens = osmTools.split(linesRelation[i],'\/');
        let addr = tokens[tokens.length - 1];
        let fullKsPath = path.join(__dirname, linesRelation[i]);
        console.log(fullKsPath);
        let balanceWei = await web3.eth.getBalance(addr);
        console.log(addr, "balance", web3.utils.fromWei(balanceWei));

        let leftBn = web3.utils.toBN(balanceWei).sub(web3.utils.toBN(config.gasPriceTransfer).mul(web3.utils.toBN(config.gasLimitTransfer)));
        if (addr != config.ownerAddr && addr != config.adminAddr) {
            await transfer(addr, config.ownerAddr, leftBn, fullKsPath);
        }
    }
    console.log("========================done=========================");
}

async function transfer(from, to, value, ksFile) {
    await sendWan(from, to, value, ksFile);
}

main();
