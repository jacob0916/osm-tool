/*

=====
smIn
====
regDur              rd
gpkDur              gd
htlcDur             hd
totalNodes          tn
thresholds          th
grpId               gid
preGrpId            pgid


srcChainId      2153201998      srcid
dstChainId      2147483708      dstid
srcCurve        1               scrv
dstCurve        1               dcrv
minStakeIn                      ms
minDelegateIn                   md
delegateFee                     df


===
wlWkAddr                []
===

===
wlWalletAddr            []
===

gasPrice
gas
 */
const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('rd', 'regDur uint:second')
    .describe('gd', 'gpkDur')
    .describe('hd', 'htlcDur')
    .describe('tn', 'total nodes')
    .describe('th', 'thresholds nodes')
    .describe('gid', 'grpId')
    .describe('pgid', 'preGrpId')
    .describe('srcid', 'srcChainId')
    .describe('dstid', 'dstChainId')
    .describe('scrv', 'srcCurve')
    .describe('dcrv', 'dstCurve')
    .describe('ms', 'minStakeIn uint:wei')
    .describe('md', 'minDelegateIn')
    .describe('df', 'delegateFee')
    .describe('wlStart', 'White start index')
    .describe('wlCount', 'White count')
    .default('tn', 21)
    .default('th', 17)
    .default('srcid', '2153201998')
    .default('dstid', '2147483708')
    .default('scrv', 1)
    .default('dcrv', 1)
    .default('wlStart', 0)
    .default('wlCount', 5)
    .default('ms', 2000)
    .default('md', 100)
    .default('df', 100)
    .argv;

let {buildOpenGrpData, buildStakeInData, getTxReceipt, sendTx} = require('./util/wanchain');

function stringTobytes32(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8')
    let id = '0x' + b.toString('hex')
    return id
}


function getGrpIdByString(str) {
    return stringTobytes32(str);
}

function main() {
    // only admin can open group.
    let smIn = {
        regDur: argv.rd,
        gpkDur: argv.gd,
        htlcDur: argv.hd,
        totalNodes: argv.tn,
        thresholds: argv.th,
        grpId: argv.gid,
        preGrpId: argv.pgid,
        srcChainId: argv.srcid,
        dstChainId: argv.dstid,
        srcCurve: argv.scrv,
        dstCurve: argv.dcrv,
        minStakeIn: argv.ms,
        minDelegateIn: argv.md,
        delegateFee: argv.df,
        workTime: '',
        totalTime: ''
    };
    let wlStartIndex = argv.wlStart;
    let wlCount = argv.wlCount;
    console.log(smIn);
}

main();
