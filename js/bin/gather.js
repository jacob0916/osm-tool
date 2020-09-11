const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');
const path = require('path');


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

const {sendWan} = require('./util/wanchain');


async function main() {

    await doGather();
}


async function doGather() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesRelation = await processLineByLine(config.gatherKsList);

    for (let i = 0; i < linesRelation.length; i++) {
        console.log(linesRelation[i]);
        let tokens = split(linesRelation[i]);
        let addr = tokens[tokens.length-1];
        let fullKsPath = path.join(__dirname,linesRelation[i]);
        console.log(fullKsPath);
        let balanceWei = await web3.eth.getBalance(addr);
        console.log(addr,"balance",web3.utils.fromWei(balanceWei));

        let leftBn = web3.utils.toBN(balanceWei).sub(web3.utils.toBN(config.gasPriceTransfer).mul(web3.utils.toBN(config.gasLimitTransfer)));
        if(addr != config.ownerAddr && addr != config.adminAddr){
            await transfer(addr,config.ownerAddr, leftBn, fullKsPath);
        }
    }
    console.log("========================done=========================");
}

async function transfer(from,to,value, ksFile) {
    await sendWan(from, to, value,ksFile);
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

function split(line, sep = '\/') {
    return line.split(sep);
}

main();
