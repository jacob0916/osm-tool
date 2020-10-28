const CronJob = require('cron').CronJob;
const osmTools = require('./util/osmTools');

const {spawn} = require('child_process');

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('network', 'network name')
    .describe('fgn', 'first group name')              // such as : testnet_001  Aries_002
    .describe('fgwt', 'first group worktime')        // 2020/10/23-12:00:00
    .describe('grpPrex', 'prefix of the grp')        // Aries

    .describe('pct', 'polyCommitTimeout uint:day')          //day
    .describe('dt', 'defaultTimeout uint:day')              //day
    .describe('nt', 'neogationTimeout uint:day')            //day
    .describe('tt', 'totalTime uint:day')                   //day

    .string('wt')
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
global.grpPrex = argv["grpPrex"];

let network = global.network;
let fgn = argv["fgn"];
let fgwt = argv["fgwt"];
let pct = argv["pct"];
let dt = argv["dt"];
let nt = argv["nt"];
let tt = argv["tt"];

let rd = 2;     //  day
let tn = 21;    // total nodes
let th = 15;        // threshold nodes
let df = 1000;     // delegate fee

let wlStart = 0;  // white list start index
let wlCount = 11; // white list count(including working white list)

let backupCount = 10;

let srcid = '2153201998';
let dstid = '2147483708';
let scrv = 1;          // source curve
let dcrv = 1;          // des curve

let ms = '10000e18';  // wei
let md = '100e18';    // wei
let mp = '10000e18';  // wei


let pwd = '';

const config = require('../cfg/config');

let {getGrpStatus} = require('./util/wanchain');

main();

async function main() {

    let firstPwd = await osmTools.getPwd("please input pwd of contract admin");
    let secPwd = await osmTools.getPwd("please input pwd again");

    if (firstPwd !== secPwd) {
        console.log("password is not same!");
        process.exit(0);
    }

    pwd = firstPwd;
    if (!osmTools.checkPwd(config.adminAddr, pwd, config.ksDir)) {
        console.log("wrong password!");
        process.exit(0);
    } else {
        console.log("password is OK!");
    }
    config.password = pwd;

    console.log('Before job autoOpenGroup initialization');
    const job = new CronJob('0 0/1 * * * *', function () { // one minute
        //const job = new CronJob('00 52 10 * * 2', function() { // Tuesday 10:52:00
        AutoOpenGroup(network, fgn, fgwt);
    });
    job.start();
}


async function InitFirstGroup() {
    return new Promise(async(resolve, reject) => {
        try{

            console.log("........Entering InitFirstGroup..........");
            await BuildConf();
            await CreateEnodeId();
            await CreateWorkAddr();
            await CreateWalletAddr();
            await BuildRelation();
            await cpAdminKs();

            await BackupCount();
            resolve(true);
        }catch(err){
            console.error("InitFirstGroup error : %s",err);
            reject(err);
        }
    });

}

function CreateEnodeId() {
    return new Promise((resolve, reject) => {

        console.log("Entering CreateEnodeId.......");

        const crNodeId = spawn('node', ['enodeId.js',
            '--network', network,
            '--grpPrex', global.grpPrex,
            '--nc', wlCount]);

        crNodeId.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        crNodeId.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        crNodeId.on('close', (code) => {
            console.log(`Child Process [createNodeId] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });

}


function BackupCount() {
    return new Promise((resolve, reject) => {

        console.log("Entering backupCount.......");

        const crNodeId = spawn('node', ['backup.js',
            '--network', network,
            '--nc', backupCount]);

        crNodeId.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        crNodeId.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        crNodeId.on('close', (code) => {
            console.log(`Child Process [backupCount] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });

}


function CreateWorkAddr() {
    return new Promise((resolve, reject) => {

        console.log("Entering CreateWorkAddr.......");

        const crWkAddr = spawn('node', ['walletAddr.js',
            '--network', network,
            '--grpPrex', global.grpPrex,
            '--nc', wlCount]);

        crWkAddr.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        crWkAddr.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        crWkAddr.on('close', (code) => {
            console.log(`Child Process [create working  address] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });

}


function CreateWalletAddr() {
    return new Promise((resolve, reject) => {

        console.log("Entering CreateWalletAddr.......");

        const crWalletAddr = spawn('node', ['walletAddr.js',
            '--network', network,
            '--grpPrex', global.grpPrex,
            '--nc', wlCount, '--wallet']);

        crWalletAddr.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        crWalletAddr.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        crWalletAddr.on('close', (code) => {
            console.log(`Child Process [create wallet  address] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });

}

function BuildRelation() {
    return new Promise((resolve, reject) => {

        console.log("Entering BuildRelation.......");

        const buildRelation = spawn('node', ['buildRelation.js',
            '--network', network,
            '--grpPrex', global.grpPrex]);

        buildRelation.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        buildRelation.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        buildRelation.on('close', (code) => {
            console.log(`Child Process [build Realtion wallet  address] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });
}

function BuildConf() {
    return new Promise((resolve, reject) => {
        console.log("Entering BuildConf.......");
        console.log("Build conf : defaultDir:%s rootdir:%s",config.defaultDir,config.rootDir);

        const buildRelation = spawn('cp', ['-rf',config.defaultDir,config.rootDir]);
        buildRelation.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        buildRelation.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        buildRelation.on('close', (code) => {
            console.log(`Child Process [BuildConf] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
    });
}

function cpAdminKs() {
    return new Promise((resolve, reject) => {

        console.log("Entering cpAdminKs.......");

        var process = require('child_process');
        console.log("Build conf : globalAdminKsDir:%s ksDir:%s",config.globalAdminKsDir,config.ksDir);
        process.exec('cp '+config.globalAdminKsFiles+" "+config.ksDir,function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                reject(error);
            }else{
                resolve(true);
            }
        });
        /*
        const buildRelation = spawn('cp', [config.globalAdminKsFiles,config.ksDir]);
        buildRelation.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        buildRelation.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        buildRelation.on('close', (code) => {
            console.log(`Child Process [cpAdminKs ] exit，exit code ${code}`);
            if(parseInt(code)){
                reject(code);
            }else{
                resolve(code);
            }
        });
        */
    });
}



async function AutoOpenGroup(network, curGroupName, curGrpWorktime) {

    let newGrpName = '';
    let newGrpWorktime;
    let curGroupNameTemp = '';

    console.log("Entering AutoOpenGroup..........");

    if (curGroupName === '') {
        curGroupNameTemp = global.grpPrex + '_' + '000';
        console.log("...............curGroupNameTemp is %s......",curGroupNameTemp);
        global.firstGrp = true;
    } else {
        global.firstGrp = false;
        curGroupNameTemp = curGroupName;
    }
    console.log("network", network, "curGroupName", curGroupName, "curGrpWorktime", curGrpWorktime);
    console.log(">>>>>>>>>>>>>>>curGroupNameTemp<<<<<<<<<<<<<<<<%s",curGroupNameTemp);

    newGrpName = osmTools.getNextGrpName(curGroupNameTemp, '_');
    newGrpWorktime = osmTools.getNextWorkTime(curGrpWorktime, parseInt(tt));

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("***********************Begin opengroup %s**************************", newGrpName);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("\n\n\n");

    console.log("network", network, "newGrpName", newGrpName, "newGrpWorktime", newGrpWorktime);

    if (global.firstGrp) {

        try{
            await InitFirstGroup();
        }catch(err){
            console.error("init first group error : %s",err)
            process.exit(0);
        }

    }
    if (CheckCanAutoOpen || global.firstGrp) {
        console.log("begin open group grpName", newGrpName);
        //node openGrp.js --network testnet --gid 'testnet_006' --pgid 'testnet_005' --pct 1 --dt 1 --nt 1  --rd 2  --wt '2020/10/23-12:00:00' --tt 7 --tn 21 --th 15
        // --srcid '2153201998'   --dstid '2147483708'   --scrv  1  --dcrv 1   --ms 10000e18 --md 100e18 --mp 10000e18 --df 1000   --wlStart 0  --wlCount  11
        const openGrp = spawn('node', ['openGrp.js',
            '--network', network,
            '--grpPrex', global.grpPrex,
            '--pwd', pwd,
            '--gid', newGrpName,
            '--pgid', curGroupName,
            '--pct', pct,
            '--dt', dt,
            '--nt', nt,
            '--rd', rd,
            '--wt', newGrpWorktime,
            '--tt', tt,
            '--tn', tn,
            '--th', th,
            '--srcid', srcid,
            '--dstid', dstid,
            '--scrv', scrv,
            '--dcrv', dcrv,
            '--ms', ms,
            '--md', md,
            '--mp', mp,
            '--df', df,
            '--wlStart', wlStart,
            '--wlCount', wlCount]);

        openGrp.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        openGrp.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        openGrp.on('close', (code) => {
            console.log(`Child Process exit，exit code ${code}`);
            fgn = curGroupNameTemp;
            fgn = osmTools.getNextGrpName(fgn, '_');
            fgwt = osmTools.getNextWorkTime(curGrpWorktime, tt);

            console.log("\n\n\n");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("***********************End opengroup %s**************************", newGrpName);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        });
    } else {
        console.log("can not open group grpName", newGrpName);
    }
}

async function CheckCanAutoOpen(network, curGroupName, curGrpWorktime) {
    //todo for test only
    return true;

    let curGroupStatus = 0;
    let preGroupStatus = 0;
    let preGroupName = osmTools.getPreGrpName(curGroupName);
    try{
        curGroupStatus = await getGrpStatus(osmTools.getGrpIdByString(curGroupName));
        preGroupStatus = await getGrpStatus(osmTools.getGrpIdByString(preGroupName));
    }catch(err){
        console.error("CheckCanAutoOpen error. error is %s",err);
        process.exit(0);
    }

    console.log("curGroupName, preGroupName,curGroupStatus,preGroupStatus curGrpWorktime",
        curGroupName, curGroupStatus, preGroupName, preGroupStatus, curGrpWorktime);
    // senario 1:  cur = Ready && (pre = dismissed or preGroup not exisit)
    if (curGroupStatus == osmTools.GroupStatus.ready && (preGroupStatus == osmTools.GroupStatus.dismissed || parseInt(preGroupStatus) == 0)) {
        return true;
    } else {
        console.error("group status wrong , can not open group");
        return false;
    }
}