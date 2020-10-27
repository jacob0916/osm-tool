const path = require('path');
exports.wanNodeURL = 'http://192.168.1.179:7654';

// exports.gskList = path.join(__dirname,"../output-internal/gskList");
// exports.gpkKsDir = path.join(__dirname,"../output-internal/gpkKs");
//
//
// exports.nodeKeyList = path.join(__dirname,"../output-internal/nodeKeyList");
// exports.WalletAddList = path.join(__dirname,"../output-internal/WalletAddList");
// exports.WorkingAddList = path.join(__dirname,"../output-internal/WorkingAddList");
// exports.RelationList = path.join(__dirname,"../output-internal/RelationList");
//
// exports.ksDir = path.join(__dirname,"../output-internal/ks");

let grpPrex = global.grpPrex || "default";
grpPrex = grpPrex.toLowerCase();

exports.gskList = path.join(__dirname,'../output-internal/',grpPrex,'/gskList');
exports.gpkKsDir = path.join(__dirname,'../output-internal/',grpPrex,'/gpkKs');


exports.nodeKeyList = path.join(__dirname,'../output-internal/',grpPrex,'/nodeKeyList');
exports.WalletAddList = path.join(__dirname,'../output-internal/',grpPrex,'WalletAddList');
exports.WorkingAddList = path.join(__dirname,'../output-internal/',grpPrex,'WorkingAddList');
exports.RelationList = path.join(__dirname,'../output-internal/',grpPrex,'RelationList');

exports.ksDir = path.join(__dirname,'../output-internal/',grpPrex,'ks');


exports.ownerAddr ='0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e';
exports.adminAddr ='0x5793e629c061e7fd642ab6a1b4d552cec0e2d606';
exports.password = "wanglu";

exports.allocValue = 12000;
exports.allocWKValue = 100;

exports.gasPrice = 180000000000;
exports.gasLimit = 10000000;

exports.gasPriceTransfer = 1e9;
exports.gasLimitTransfer = 21000;

exports.gatherKsList = path.join(__dirname,"../bin/misc/gatherList");

exports.smgScAddr = '0x8BAe89aE07787cf45d3F49471b9C6478317061d8';

exports.smgAbi = [{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"createGpkAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quotaInst","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"metric","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"preGroupId","type":"bytes32"},{"indexed":false,"name":"workStart","type":"uint256"},{"indexed":false,"name":"workDuration","type":"uint256"},{"indexed":false,"name":"registerDuration","type":"uint256"}],"name":"StoremanGroupRegisterStartEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":false,"name":"dismissTime","type":"uint256"}],"name":"StoremanGroupDismissedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"chain1","type":"uint256"},{"indexed":true,"name":"chain2","type":"uint256"},{"indexed":false,"name":"curve1","type":"uint256"},{"indexed":false,"name":"curve2","type":"uint256"}],"name":"updateGroupChainEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"storemanGroupContributeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"AddAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"RemoveAdmin","type":"event"},{"constant":false,"inputs":[{"name":"metricAddr","type":"address"},{"name":"gpkAddr","type":"address"},{"name":"quotaAddr","type":"address"},{"name":"posAddr","type":"address"}],"name":"setDependence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"name":"groupId","type":"bytes32"},{"name":"preGroupId","type":"bytes32"},{"name":"workTime","type":"uint256"},{"name":"totalTime","type":"uint256"},{"name":"registerDuration","type":"uint256"},{"name":"memberCountDesign","type":"uint256"},{"name":"threshold","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"minStakeIn","type":"uint256"},{"name":"minDelegateIn","type":"uint256"},{"name":"minPartIn","type":"uint256"},{"name":"delegateFee","type":"uint256"}],"name":"smg","type":"tuple"},{"name":"wkAddrs","type":"address[]"},{"name":"senders","type":"address[]"}],"name":"storemanGroupRegisterStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"incentiveCandidator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"PK","type":"bytes"},{"name":"enodeID","type":"bytes"}],"name":"stakeIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeAppend","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"checkCanStakeOut","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"checkCanStakeClaim","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeIncentiveClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateIncentiveClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getSelectedSmNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getSelectedStoreman","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"select","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"index","type":"uint256"}],"name":"getSelectedSmInfo","outputs":[{"name":"wkAddr","type":"address"},{"name":"PK","type":"bytes"},{"name":"enodeId","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"}],"name":"updateGroupStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"day","type":"uint256"}],"name":"getStoremanIncentive","outputs":[{"name":"incentive","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"deAddr","type":"address"},{"name":"day","type":"uint256"}],"name":"getSmDelegatorInfoIncentive","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"deAddr","type":"address"}],"name":"getSmDelegatorInfo","outputs":[{"name":"sender","type":"address"},{"name":"deposit","type":"uint256"},{"name":"incentive","type":"uint256"},{"name":"quited","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"pnAddr","type":"address"}],"name":"getSmPartnerInfo","outputs":[{"name":"sender","type":"address"},{"name":"deposit","type":"uint256"},{"name":"quited","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"}],"name":"setGpk","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"indexs","type":"uint256[]"},{"name":"slashTypes","type":"uint8[]"}],"name":"setInvalidSm","outputs":[{"name":"isContinue","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wk","type":"address"}],"name":"recordSmSlash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getThresholdByGrpId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"storemanGroupUnregister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"storemanGroupDismiss","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"checkGroupDismissable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"getStoremanInfo","outputs":[{"components":[{"name":"sender","type":"address"},{"name":"enodeID","type":"bytes"},{"name":"PK","type":"bytes"},{"name":"wkAddr","type":"address"},{"name":"isWhite","type":"bool"},{"name":"quited","type":"bool"},{"name":"delegatorCount","type":"uint256"},{"name":"delegateDeposit","type":"uint256"},{"name":"partnerCount","type":"uint256"},{"name":"partnerDeposit","type":"uint256"},{"name":"crossIncoming","type":"uint256"},{"name":"slashedCount","type":"uint256"},{"name":"incentivedDelegator","type":"uint256"},{"name":"incentivedDay","type":"uint256"},{"name":"groupId","type":"bytes32"},{"name":"nextGroupId","type":"bytes32"},{"name":"deposit","type":"uint256"},{"name":"incentive","type":"uint256"}],"name":"si","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"getStoremanGroupInfo","outputs":[{"components":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"},{"name":"deposit","type":"uint256"},{"name":"depositWeight","type":"uint256"},{"name":"selectedCount","type":"uint256"},{"name":"memberCount","type":"uint256"},{"name":"whiteCount","type":"uint256"},{"name":"whiteCountAll","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"registerTime","type":"uint256"},{"name":"registerDuration","type":"uint256"},{"name":"memberCountDesign","type":"uint256"},{"name":"threshold","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"tickedCount","type":"uint256"},{"name":"minStakeIn","type":"uint256"},{"name":"minDelegateIn","type":"uint256"},{"name":"minPartIn","type":"uint256"},{"name":"crossIncoming","type":"uint256"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"},{"name":"delegateFee","type":"uint256"}],"name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"getStoremanGroupConfig","outputs":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"},{"name":"deposit","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"},{"name":"day","type":"uint256"}],"name":"checkGroupIncentive","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"smgID","type":"bytes32"}],"name":"smgTransfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"co","type":"uint256"}],"name":"setChainTypeCo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"}],"name":"getChainTypeCo","outputs":[{"name":"co","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStoremanConf","outputs":[{"name":"backupCount","type":"uint256"},{"name":"standaloneWeight","type":"uint256"},{"name":"delegationMulti","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"backupCount","type":"uint256"},{"name":"standaloneWeight","type":"uint256"},{"name":"DelegationMulti","type":"uint256"}],"name":"updateStoremanConf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGlobalIncentive","outputs":[{"name":"contribution","type":"uint256"},{"name":"totalReward","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"stakeInEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"stakeAppendEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"}],"name":"stakeOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"stakeClaimEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"stakeIncentiveClaimEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"stakeIncentiveCrossFeeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"preGroupId","type":"bytes32"},{"indexed":false,"name":"wkAddrs","type":"address[]"}],"name":"storemanTransferEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"}],"name":"StoremanGroupUnregisterEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"delegateInEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"}],"name":"delegateOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"delegateClaimEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"delegateIncentiveClaimEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"partInEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"}],"name":"partOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"partClaimEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"wkAddr","type":"address"},{"indexed":true,"name":"finished","type":"bool"},{"indexed":false,"name":"from","type":"uint256"},{"indexed":false,"name":"end","type":"uint256"}],"name":"incentiveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"count","type":"uint256"},{"indexed":false,"name":"members","type":"address[]"}],"name":"selectedEvent","type":"event"}]

exports.gpkScAddr = '0xB04e9cDA12CaAd3C881F80629495404adcfBCe8D';

exports.gpkAbi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"groupMap","outputs":[{"name":"groupId","type":"bytes32"},{"name":"round","type":"uint16"},{"name":"ployCommitPeriod","type":"uint32"},{"name":"defaultPeriod","type":"uint32"},{"name":"negotiatePeriod","type":"uint32"},{"name":"smNumber","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfg","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"smg","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"},{"indexed":true,"name":"curveIndex","type":"uint8"},{"indexed":false,"name":"storeman","type":"address"}],"name":"SetPolyCommitLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"},{"indexed":true,"name":"curveIndex","type":"uint8"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"}],"name":"SetEncSijLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"},{"indexed":true,"name":"curveIndex","type":"uint8"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"isValid","type":"bool"}],"name":"SetCheckStatusLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"},{"indexed":true,"name":"curveIndex","type":"uint8"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"}],"name":"RevealSijLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"AddAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"RemoveAdmin","type":"event"},{"constant":false,"inputs":[{"name":"cfgAddr","type":"address"},{"name":"smgAddr","type":"address"}],"name":"setDependence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"ployCommitPeriod","type":"uint32"},{"name":"defaultPeriod","type":"uint32"},{"name":"negotiatePeriod","type":"uint32"}],"name":"setPeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"polyCommit","type":"bytes"}],"name":"setPolyCommit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"curveIndex","type":"uint8"}],"name":"polyCommitTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"dest","type":"address"},{"name":"encSij","type":"bytes"}],"name":"setEncSij","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"src","type":"address"},{"name":"isValid","type":"bool"}],"name":"setCheckStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"curveIndex","type":"uint8"},{"name":"src","type":"address"}],"name":"encSijTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"dest","type":"address"},{"name":"sij","type":"uint256"},{"name":"ephemPrivateKey","type":"uint256"}],"name":"revealSij","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"curveIndex","type":"uint8"},{"name":"dest","type":"address"}],"name":"checkSijTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"curveIndex","type":"uint8"},{"name":"src","type":"address"}],"name":"SijTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"curveIndex","type":"uint8"}],"name":"terminate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"int32"}],"name":"getGroupInfo","outputs":[{"name":"queriedRound","type":"uint16"},{"name":"curve1","type":"address"},{"name":"curve1Status","type":"uint8"},{"name":"curve1StatusTime","type":"uint256"},{"name":"curve2","type":"address"},{"name":"curve2Status","type":"uint8"},{"name":"curve2StatusTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"src","type":"address"}],"name":"getPolyCommit","outputs":[{"name":"polyCommit","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"roundIndex","type":"uint16"},{"name":"curveIndex","type":"uint8"},{"name":"src","type":"address"},{"name":"dest","type":"address"}],"name":"getSijInfo","outputs":[{"name":"encSij","type":"bytes"},{"name":"checkStatus","type":"uint8"},{"name":"setTime","type":"uint256"},{"name":"checkTime","type":"uint256"},{"name":"sij","type":"uint256"},{"name":"ephemPrivateKey","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"index","type":"uint16"}],"name":"getGpkShare","outputs":[{"name":"gpkShare1","type":"bytes"},{"name":"gpkShare2","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getGpk","outputs":[{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"},{"indexed":false,"name":"gpk1","type":"bytes"},{"indexed":false,"name":"gpk2","type":"bytes"}],"name":"GpkCreatedLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"slashType","type":"uint8"},{"indexed":true,"name":"slashed","type":"address"},{"indexed":false,"name":"partner","type":"address"},{"indexed":false,"name":"round","type":"uint16"},{"indexed":false,"name":"curveIndex","type":"uint8"}],"name":"SlashLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"}],"name":"ResetLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"round","type":"uint16"}],"name":"CloseLogger","type":"event"}]