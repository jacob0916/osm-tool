const fs = require('fs');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('nc', 'Number count')
    .describe('network', 'network')
    .describe('grpPrex', 'prefix of the grp')        // Aries
    .default('nc', 1)
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
global.grpPrex = argv["grpPrex"];

const config = require('../cfg/config');

const osmTools = require('./util/osmTools');

const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
const ethUtil = require("ethereumjs-util");

function main() {
    let nc = argv["nc"];
    global.network = argv["network"];
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

        // let keystore = web3.eth.accounts.encrypt(prv,config.password);
        // keystore.waddress = wanutil.generateWaddrFromPriv(prvb,prvb).slice(2);
        // keystore.crypto2 = keystore.crypto;
        // fs.writeFileSync(path.join(config.ksDir,'0x'+keystore.address), JSON.stringify(keystore));
        // nodekey enodeId
        let oneLine = osmTools.removePrefix(prv).toLowerCase() + "\t" + pk.toLowerCase();
        if (i != parseInt(nc - 1)) {
            oneLine += "\n";
        }
        fileContent += oneLine;
    }

    fs.writeFileSync(config.nodeKeyList, fileContent,{flag:'a+'});
    console.log("===============done=================\n");
}

main();