
/*

=====
smIn
====
regDur
gpkDur
htlcDur
totalNodes
thresholds
grpId
preGrpId


srcChainId      2153201998
dstChainId      2147483708
srcCurve        1
dstCurve        1
minStakeIn
minDelegateIn
delegateFee


===
wlWkAddr                []
===

===
wlWalletAddr            []
===

gasPrice
gas
 */

function stringTobytes32(name){
    let b = Buffer.alloc(32)
    b.write(name, 32-name.length,'utf8')
    let id = '0x'+b.toString('hex')
    return id
}

function getGrpIdByNow(){
    let now = parseInt(Date.now()/1000);
    return stringTobytes32(now.toString());
}

