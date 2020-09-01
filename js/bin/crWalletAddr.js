const optimist = require('optimist');
const config = require('../cfg/config');
const BigInteger = require('bigi');
const fs = require('fs');
const path=require('path');

const ecurve = require('ecurve');
const ecparams = ecurve.getCurveByName('secp256k1');
const wanutil = require('wanchain-util');

let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('nc', 'Number count')
    .describe('wallet', 'Wallet address or working address')
    .default('nc', 1)
    .default('wallet', false)
    .boolean('wallet')
    .argv;

const Web3 = require('web3');
const net = require('net');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
const ethUtil = require("ethereumjs-util");

function main() {
    // --nc 20 --wallet true
    let nc = argv["nc"];
    let wallet = argv["wallet"];
    console.log(wallet);
    let fileContent='';
    for (let i = 0; i < nc; i++) {
        let ret = web3.eth.accounts.create();
        let prv = ret.privateKey;
        let prvb = Buffer.from(removePrefix(prv), 'hex');

        let pkb = baseScarMulti(prvb);
        let pkb1 = ethUtil.privateToPublic(prvb);

        let pk = bufferToHexString(pkb);
        let pk1 = bufferToHexString(pkb1);
        console.log(prv, pk,pk1);

        let keystore = web3.eth.accounts.encrypt(prv,config.password);
        keystore.waddress = wanutil.generateWaddrFromPriv(prvb,prvb).slice(2);
        keystore.crypto2 = keystore.crypto;
        fs.writeFileSync(path.join(config.ksDir,'0x'+keystore.address), JSON.stringify(keystore));
        // wallet address pk
        let oneLine = ret.address + "\t"+ pk + "\n";
        fileContent += oneLine;
    }

    if(!!wallet){
        fs.writeFileSync(config.WalletAddList,fileContent);
    }else{
        fs.writeFileSync(config.WorkingAddList,fileContent);
    }

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