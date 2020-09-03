const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');

let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
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

const sender = config.ownerAddr;

async function alloc(addr, amount) {
    try {
        let tx = await pu.promisefy(web3.eth.sendTransaction, [{
            from: sender,
            to: addr,
            value: web3.utils.toWei(web3.utils.toBN(amount))
        }], web3.eth);
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
    let linesRelation = await processLineByLine(config.RelationList);

    for (let i = 0; i < linesRelation.length; i++) {
        await alloc(split(linesRelation[i])[0], config.allocValue);
        await alloc(split(linesRelation[i])[1], config.allocWKValue);
    }

    console.log("========================done=========================");
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
