const CronJob = require('cron').CronJob;
const osmTools = require('./util/osmTools');

const {spawn} = require('child_process');

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

let network = global.network;
let fgn = argv["fgn"];
let fgwt = argv["fgwt"];

function main_test() {
    console.log('Before job autoOpenGroup initialization');
    const job = new CronJob('0 0/1 * * * *', function () {
        const d = new Date();
        console.log('Every one Minute:', d);
    });
    console.log('After job autoOpenGroup initialization');
    job.start();
}


//main_test();
main();


function main() {

    console.log('Before job autoOpenGroup initialization');
    const job = new CronJob('0 0/1 * * * *', function() { // one minute
        AutoOpenGroup(network, fgn, fgwt);

    });
    console.log('After job autoOpenGroup initialization');
    job.start();
}

function AutoOpenGroup(network, curGroupName, curGrpWorktime) {

    console.log("network", network, "curGroupName", curGroupName, "curGrpWorktime", curGrpWorktime);
    let newGrpName = '';
    let newGrpWorktime = '';
    let curGroupNameTemp = '';
    if(curGroupName===''){
        //curGroupNameTemp = 'internal_000';
        curGroupNameTemp = 'jacob_000';
    }else{
        curGroupNameTemp = curGroupName;
    }
    newGrpName = osmTools.getNextGrpName(curGroupNameTemp,'_');
    newGrpWorktime = osmTools.getNextWorkTime(curGrpWorktime,7200,true);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("***********************Internal Begin opengroup %s**************************",newGrpName);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("\n\n\n");

    console.log("network", network, "newGrpName", newGrpName, "newGrpWorktime", newGrpWorktime);

    if (CheckCanAutoOpen) {
        console.log("begin open group grpName", newGrpName);
        //node openGrp.js --network testnet --gid 'testnet_006' --pgid 'testnet_005' --pct 1 --dt 1 --nt 1  --rd 2  --wt '2020/10/23-12:00:00' --tt 7 --tn 21 --th 15
        // --srcid '2153201998'   --dstid '2147483708'   --scrv  1  --dcrv 1   --ms 10000e18 --md 100e18 --mp 10000e18 --df 1000   --wlStart 0  --wlCount  11
        const openGrp = spawn('node', ['openGrp.js',
            '--network', network,
            '--gid', newGrpName,
            '--pgid', curGroupName,
            '--pct', 1200,     //20minutes
            '--dt', 1200,
            '--nt', 1200,
            '--rd', 1200,
            '--wt', newGrpWorktime,
            '--tt', 7200,
            '--tn', 4,
            '--th', 3,
            '--srcid', '2153201998',
            '--dstid', '2147483708',
            '--scrv', 1,
            '--ms', '10000e18',
            '--md', '100e18',
            '--df', 1000,
            '--wlStart', 0,
            '--wlCount', 5,
            '--sec']);

        openGrp.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        openGrp.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        openGrp.on('close', (code) => {
            console.log(`Child Process exit，exit code ${code}`);

            // fgn = osmTools.getNextGrpName(newGrpName,'_');
            // fgwt = osmTools.getNextWorkTime(newGrpWorktime,7200,true);

            fgn = newGrpName;
            fgwt = newGrpWorktime;

            console.log("\n\n\n")
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("***********************Internal End opengroup %s**************************",newGrpName);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        });
    } else {
        console.log("can not open group grpName", newGrpName);
    }
}

function CheckCanAutoOpen(network, curGroupName, curGrpWorktime) {

    return true;

    let preGroupName = osmTools.getPreGrpName(curGroupName);

    let curGroupStatus = GetGrpStatus(network, curGroupName);
    let preGroupStatus = GetGrpStatus(network, preGroupName);

    console.log("curGroupName, preGroupName,curGroupStatus,preGroupStatus curGrpWorktime",
        curGroupName, curGroupStatus, preGroupName, preGroupStatus, curGrpWorktime);
    // senario 1:  cur = Ready && (pre = dismissed or preGroup not exisit)
    if (curGroupStatus == osmTools.GroupStatus.ready && (preGroupStatus == osmTools.GroupStatus.dismissed || parseInt(preGroupStatus) == -1)) {
        return true;
    } else {
        console.error("group status wrong , can not open group");
        return false;
    }
}

function GetGrpStatus(network, grpName) {

}
