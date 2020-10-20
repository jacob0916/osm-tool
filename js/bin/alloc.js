const Web3 = require('web3');
const osmTools = require('./util/osmTools');
const pu = require('promisefy-util');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('network', 'network')
    .default('network', 'internal')
    .argv;

global.network = argv["network"];
const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

const sender = config.ownerAddr;

async function alloc(addr, amount) {
    try {
        let tx = await pu.promisefy(web3.eth.sendTransaction, [{
            from: sender,
            to: addr,
            value: web3.utils.toWei(web3.utils.toBN(amount))
        }], web3.eth);
        console.log("alloc tx hash :", tx);
    } catch (err) {
        console.log("err:", err)
    }
    console.log(addr, web3.utils.toWei(web3.utils.toBN(amount)).toString(10));
}

async function main() {
    let addr = null;
    // loop the wallet address, working address
    await doAlloc();
}


async function doAlloc() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesRelation = await osmTools.processLineByLine(config.RelationList);

    for (let i = 0; i < linesRelation.length; i++) {
        //for (let i = 0; i < 1; i++) {
        if (parseInt(i) == 0) {
            await alloc(osmTools.split(linesRelation[i])[0], config.allocValue);
        } else {
            await alloc(osmTools.split(linesRelation[i])[0], config.allocValue);
        }
        await alloc(osmTools.split(linesRelation[i])[1], config.allocWKValue);
    }

    console.log("========================done=========================");
}


main();
