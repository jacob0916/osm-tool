const fs = require('fs');
const path = require('path');

const wanutil = require('wanchain-util');

const osmTools = require('./util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('nc', 'Number count')
    .describe('wallet', 'Wallet address or working address')
    .describe('network', 'network')
    .describe('grpPrex', 'prefix of the grp')        // Aries
    .default('nc', 1)
    .default('network', 'internal')
    .default('wallet', false)
    .boolean('wallet')
    .argv;
global.network = argv["network"];
global.grpPrex = argv["grpPrex"];

const config = require('../cfg/config');

const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
const ethUtil = require("ethereumjs-util");

function main() {
    let nc = argv["nc"];
    global.network = argv["network"];
    let wallet = argv["wallet"];

    console.log(wallet);
    let fileContent = '';
    for (let i = 0; i < nc; i++) {
        let ret = web3.eth.accounts.create();
        let prv = ret.privateKey;
        let prvb = Buffer.from(osmTools.removePrefix(prv), 'hex');

        let pkb = osmTools.baseScarMulti(prvb);
        let pkb1 = ethUtil.privateToPublic(prvb);

        let pk = osmTools.bufferToHexString(pkb);
        let pk1 = osmTools.bufferToHexString(pkb1);
        console.log(prv, pk, pk1);

        let keystore = web3.eth.accounts.encrypt(prv, config.password);
        keystore.waddress = wanutil.generateWaddrFromPriv(prvb, prvb).slice(2);
        keystore.crypto2 = keystore.crypto;
        fs.writeFileSync(path.join(config.ksDir, '0x' + keystore.address.toLowerCase()), JSON.stringify(keystore));
        // wallet address pk
        let oneLine = ret.address.toLowerCase() + "\t" + pk.toLowerCase();
        if (i != parseInt(nc - 1)) {
            oneLine += "\n";
        }
        fileContent += oneLine;
    }

    if (!!wallet) {
        fs.writeFileSync(config.WalletAddList, fileContent);
    } else {
        fs.writeFileSync(config.WorkingAddList, fileContent);
    }

    console.log("===============done=================\n");
}

main();