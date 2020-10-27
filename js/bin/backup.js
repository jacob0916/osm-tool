const fs = require('fs');

const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('nc', 'backup count')
    .default('nc', 10)
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
let nc = argv["nc"];

const config = require('../cfg/config');


const osmTools = require('./util/osmTools');

const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));
let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx, buildSetPeriod,buildSmConf,getSMConf} = require('./util/wanchain');
async function main() {
       try{
           let ret = await getSMConf();
           console.log("Entering backup.js main.....");
           let hexnc = Web3.utils.toHex(nc);
           //let data = await buildSmConf(nc,ret['standaloneWeight'],ret['delegationMulti']);
           let data = await buildSmConf(hexnc,ret['standaloneWeight'],ret['delegationMulti']);

           console.log("backup count %s  standaloneWeight %s, delegationMulti %s",hexnc,ret['standaloneWeight'],ret['delegationMulti']);
           console.log("data of update sm conf", data);

           let txHash = '';
           if(!config.dryRun){
               txHash = await sendTx(config.adminAddr, config.smgScAddr, 0x0, data);
           }

           console.log("updateSmConf txHash", txHash);

           let receipt = null;

           if (txHash.length) {
               while (receipt == null) {
                   receipt = await getTxReceipt(txHash);
                   await osmTools.sleep(1000);
               }
               if (receipt.status) {
                   console.log("updateSmConf tx %s successfully", txHash);
               } else {
                   console.log("updateSmConf tx %s fail", txHash);
               }
           }

       }catch(err){
           console.log("updateSmConf err",err );
       }
}
main();