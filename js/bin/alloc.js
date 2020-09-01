const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');

const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

const pu = require('promisefy-util');

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
    await build();
}


async function build() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesWKAddr = await processLineByLine(config.WorkingAddList);
    let linesWAddr = await processLineByLine(config.WalletAddList);
    let linesEnode = await processLineByLine(config.nodeKeyList);

    console.log(linesWKAddr, linesWAddr, linesEnode);

    for (let i = 0; i < linesWKAddr.length; i++) {
        let elem = [];
        elem.push(split(linesWAddr[i])[0]);     // wallet address
        elem.push(split(linesWKAddr[i])[0]);    // working address
        elem.push(split(linesWKAddr[i])[1]);    // working pk
        elem.push(split(linesEnode[i])[1]);     // enodeId

        ret.push(elem);

        await alloc(elem[0], config.allocValue);
        await alloc(elem[1], config.allocWKValue);
    }
    console.log(ret);
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
