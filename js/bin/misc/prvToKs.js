const Web3 = require('web3');
const ethUtil = require("ethereumjs-util");
const wanutil = require('wanchain-util');

const osmTools = require('./util/osmTools');

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
global.grpPrex = argv["grpPrex"];

const config = require('../../cfg/config');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

async function createGPKKs(prv, ksFileName, gpkStr) {
    console.log("ksFilename", ksFileName);
    let prvb = Buffer.from(osmTools.removePrefix(prv), 'hex');
    let pkb1 = ethUtil.privateToPublic(prvb);
    let pk1 = osmTools.bufferToHexString(pkb1);
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

async function doCreateKs() {
    let skList = await osmTools.processLineByLine(config.gskList);

    for (let i = 0; i < skList.length; i++) {
        await createGPKKs(osmTools.split(skList[i])[0], (argv["gpk"] == undefined ? '' : argv["gpk"]) + '_' + (parseInt(i) < 10 ? '0' + i.toString(10) : i.toString()), argv["gpk"]);
    }

    console.log("========================done=========================");
}

main();
