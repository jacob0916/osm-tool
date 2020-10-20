const Web3 = require('web3');
const readline = require('readline');
const ethUtil = require("ethereumjs-util");
const wanutil = require('wanchain-util');

const fs = require('fs');
const path = require('path');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0 --network internal")
    .alias('h', 'help')
    .describe('network', 'network')
    .describe('gpk', 'gpk hex string')
    .default('network', 'internal')
    .string('gpk')
    .argv;

global.network = argv["network"];
const config = require('../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

async function createGPKKs(prv, ksFileName, gpkStr) {
    console.log("ksFilename", ksFileName);
    let prvb = Buffer.from(removePrefix(prv), 'hex');
    let pkb1 = ethUtil.privateToPublic(prvb);
    let pk1 = bufferToHexString(pkb1);
    console.log(prv);

    let keystore = web3.eth.accounts.encrypt(prv, config.password);
    keystore.waddress = wanutil.generateWaddrFromPriv(prvb, prvb).slice(2);
    keystore.crypto2 = keystore.crypto;
    let gAddress = ethUtil.pubToAddress(Buffer.from(gpkStr.substr(2), 'hex')).toString('hex').toLowerCase(); // no 0x
    keystore.address = gAddress;
    fs.writeFileSync(path.join(config.gpkKsDir, ksFileName), JSON.stringify(keystore));
}

async function main() {
    console.log("gpk:", argv["gpk"].toString());
    await doCreateKs();
}


function removePrefix(hexStr) {
    if (hexStr.length < 2) throw ErrInvalidHexString;
    if (hexStr.substring(0, 2) === "0x" || hexStr.substring(0, 2) === "0X") {
        return hexStr.substring(2);
    } else {
        return hexStr;
    }
}

function bufferToHexString(buff) {
    return "0x" + buff.toString('hex');
}

async function doCreateKs() {
    let skList = await processLineByLine(config.gskList);

    for (let i = 0; i < skList.length; i++) {
        await createGPKKs(split(skList[i])[0], (argv["gpk"] == undefined ? '' : argv["gpk"]) + '_' + (parseInt(i) < 10 ? '0' + i.toString(10) : i.toString()), argv["gpk"]);
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
