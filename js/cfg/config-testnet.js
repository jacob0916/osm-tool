const path = require('path');
exports.wanNodeURL = 'http://192.168.1.2:8545';

exports.nodeKeyList = path.join(__dirname,"../output-testnet/nodeKeyList");
exports.WalletAddList = path.join(__dirname,"../output-testnet/WalletAddList");
exports.WorkingAddList = path.join(__dirname,"../output-testnet/WorkingAddList");
exports.RelationList = path.join(__dirname,"../output-testnet/RelationList");

exports.ksDir = path.join(__dirname,"../output-testnet/ks");

exports.ownerAddr ='0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8';
exports.adminAddr ='0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e';
exports.password = "wanglu";

exports.allocValue = 100;
exports.allocWKValue = 10;

exports.gasPrice = 180000000000;
exports.gasLimit = 10000000;

exports.gasPriceTransfer = 1e9;
exports.gasLimitTransfer = 21000;

exports.gatherKsList = path.join(__dirname,"../bin/gatherList");

exports.smgScAddr = '0x63687EAAdeBfB529da387275771c20cA0FeE6e5B';


exports.smgAbi = [{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"createGpkAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quotaInst","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"metric","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"preGroupId","type":"bytes32"},{"indexed":false,"name":"workStart","type":"uint256"},{"indexed":false,"name":"workDuration","type":"uint256"},{"indexed":false,"name":"registerDuration","type":"uint256"}],"name":"StoremanGroupRegisterStartEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":false,"name":"dismissTime","type":"uint256"}],"name":"StoremanGroupDismissedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":true,"name":"chain1","type":"uint256"},{"indexed":true,"name":"chain2","type":"uint256"},{"indexed":false,"name":"curve1","type":"uint256"},{"indexed":false,"name":"curve2","type":"uint256"}],"name":"updateGroupChainEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"storemanGroupContributeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"AddAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"}],"name":"RemoveAdmin","type":"event"},{"constant":false,"inputs":[{"name":"metricAddr","type":"address"},{"name":"gpkAddr","type":"address"},{"name":"quotaAddr","type":"address"},{"name":"posAddr","type":"address"}],"name":"setDependence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"name":"groupId","type":"bytes32"},{"name":"preGroupId","type":"bytes32"},{"name":"workTime","type":"uint256"},{"name":"totalTime","type":"uint256"},{"name":"registerDuration","type":"uint256"},{"name":"memberCountDesign","type":"uint256"},{"name":"threshold","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"minStakeIn","type":"uint256"},{"name":"minDelegateIn","type":"uint256"},{"name":"minPartIn","type":"uint256"},{"name":"delegateFee","type":"uint256"}],"name":"smg","type":"tuple"},{"name":"wkAddrs","type":"address[]"},{"name":"senders","type":"address[]"}],"name":"storemanGroupRegisterStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"incentiveCandidator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"PK","type":"bytes"},{"name":"enodeID","type":"bytes"}],"name":"stakeIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeAppend","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"checkCanStakeOut","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"checkCanStakeClaim","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"stakeIncentiveClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"delegateIncentiveClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partOut","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wkAddr","type":"address"}],"name":"partClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getSelectedSmNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getSelectedStoreman","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"select","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"index","type":"uint256"}],"name":"getSelectedSmInfo","outputs":[{"name":"wkAddr","type":"address"},{"name":"PK","type":"bytes"},{"name":"enodeId","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"}],"name":"updateGroupStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"day","type":"uint256"}],"name":"getStoremanIncentive","outputs":[{"name":"incentive","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"deAddr","type":"address"},{"name":"day","type":"uint256"}],"name":"getSmDelegatorInfoIncentive","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"},{"name":"deAddr","type":"address"}],"name":"getSmDelegatorInfo","outputs":[{"name":"sender","type":"address"},{"name":"deposit","type":"uint256"},{"name":"incentive","type":"uint256"},{"name":"quited","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"}],"name":"setGpk","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"},{"name":"indexs","type":"uint256[]"},{"name":"slashTypes","type":"uint8[]"}],"name":"setInvalidSm","outputs":[{"name":"isContinue","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wk","type":"address"}],"name":"recordSmSlash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"getThresholdByGrpId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"storemanGroupUnregister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"storemanGroupDismiss","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"groupId","type":"bytes32"}],"name":"checkGroupDismissable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wkAddr","type":"address"}],"name":"getStoremanInfo","outputs":[{"components":[{"name":"sender","type":"address"},{"name":"enodeID","type":"bytes"},{"name":"PK","type":"bytes"},{"name":"wkAddr","type":"address"},{"name":"isWhite","type":"bool"},{"name":"quited","type":"bool"},{"name":"delegatorCount","type":"uint256"},{"name":"delegateDeposit","type":"uint256"},{"name":"partnerCount","type":"uint256"},{"name":"partnerDeposit","type":"uint256"},{"name":"crossIncoming","type":"uint256"},{"name":"slashedCount","type":"uint256"},{"name":"incentivedDelegator","type":"uint256"},{"name":"incentivedDay","type":"uint256"},{"name":"groupId","type":"bytes32"},{"name":"nextGroupId","type":"bytes32"},{"name":"deposit","type":"uint256"}],"name":"si","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"getStoremanGroupInfo","outputs":[{"components":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"},{"name":"deposit","type":"uint256"},{"name":"depositWeight","type":"uint256"},{"name":"selectedCount","type":"uint256"},{"name":"memberCount","type":"uint256"},{"name":"whiteCount","type":"uint256"},{"name":"whiteCountAll","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"registerTime","type":"uint256"},{"name":"registerDuration","type":"uint256"},{"name":"memberCountDesign","type":"uint256"},{"name":"threshold","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"tickedCount","type":"uint256"},{"name":"minStakeIn","type":"uint256"},{"name":"minDelegateIn","type":"uint256"},{"name":"minPartIn","type":"uint256"},{"name":"crossIncoming","type":"uint256"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"},{"name":"delegateFee","type":"uint256"}],"name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"getStoremanGroupConfig","outputs":[{"name":"groupId","type":"bytes32"},{"name":"status","type":"uint8"},{"name":"deposit","type":"uint256"},{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"curve1","type":"uint256"},{"name":"curve2","type":"uint256"},{"name":"gpk1","type":"bytes"},{"name":"gpk2","type":"bytes"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"},{"name":"day","type":"uint256"}],"name":"checkGroupIncentive","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"smgID","type":"bytes32"}],"name":"smgTransfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"},{"name":"co","type":"uint256"}],"name":"setChainTypeCo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"chain1","type":"uint256"},{"name":"chain2","type":"uint256"}],"name":"getChainTypeCo","outputs":[{"name":"co","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStoremanConf","outputs":[{"name":"backupCount","type":"uint256"},{"name":"standaloneWeight","type":"uint256"},{"name":"delegationMulti","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"backupCount","type":"uint256"},{"name":"standaloneWeight","type":"uint256"},{"name":"DelegationMulti","type":"uint256"}],"name":"updateStoremanConf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGlobalIncentive","outputs":[{"name":"contribution","type":"uint256"},{"name":"totalReward","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]