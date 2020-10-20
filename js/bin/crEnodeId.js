const BigInteger = require('bigi');
const fs = require('fs');

const ecurve = require('ecurve');
const ecparams = ecurve.getCurveByName('secp256k1');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('nc', 'Number count')
    .describe('network', 'network')
    .default('nc', 1)
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
const config = require('../cfg/config');

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
        let prvb = Buffer.from(removePrefix(prv), 'hex');

        let pkb = baseScarMulti(prvb);
        let pkb1 = ethUtil.privateToPublic(prvb);

        let pk = bufferToHexString(pkb);
        let pk1 = bufferToHexString(pkb1);
        console.log(prv, pk, pk1);

        // let keystore = web3.eth.accounts.encrypt(prv,config.password);
        // keystore.waddress = wanutil.generateWaddrFromPriv(prvb,prvb).slice(2);
        // keystore.crypto2 = keystore.crypto;
        // fs.writeFileSync(path.join(config.ksDir,'0x'+keystore.address), JSON.stringify(keystore));
        // nodekey enodeId
        let oneLine = removePrefix(prv).toLowerCase() + "\t" + pk.toLowerCase();
        if (i != parseInt(nc - 1)) {
            oneLine += "\n";
        }
        fileContent += oneLine;
    }

    fs.writeFileSync(config.nodeKeyList, fileContent);
    console.log("===============done=================\n");
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


function baseScarMulti(sk) {
    let curvePt = ecparams.G.multiply(BigInteger.fromBuffer(sk));
    let ret = curvePt.getEncoded(false);
    let str = ret.toString('hex');
    str = str.slice(2);
    return Buffer.from(str, 'hex');
}

main();