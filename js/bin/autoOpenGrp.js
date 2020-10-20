
const CronJob = require('cron').CronJob;
const osmTools = require('./util/osmTools');

const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('network', 'network name')
    .describe('fgn', 'first group name')              // such as : testnet_001  Aries_002
    .describe('fgwt', 'first group worktime')        // 2020/10/23-12:00:00
    .string('wt')
    .default('network', 'internal')
    .argv;
global.network = argv["network"];

function main_test(){
    console.log('Before job autoOpenGroup initialization');
    const job = new CronJob('0 0/1 * * * *', function() {
        const d = new Date();
        console.log('Every one Minute:', d);
    });
    console.log('After job autoOpenGroup initialization');
    job.start();
}

//main_test();
main();


function main(){
    let fgrpId = 0;
    // from first group name, get frist group id.
    let pGrpId = 0;
    let ppGrpId = 0;
    // get parent group id , get parent of parent group id

}

//node openGrp.js --network testnet --gid 'testnet_006' --pgid 'testnet_005' --pct 1 --dt 1 --nt 1  --rd 2  --wt '2020/10/23-12:00:00' --tt 7 --tn 21 --th 15 --srcid '2153201998'   --dstid '2147483708'   --scrv  1  --dcrv 1   --ms 10000e18 --md 100e18 --mp 10000e18 --df 1000   --wlStart 0  --wlCount  11
function AutoOpenGroup(){

}