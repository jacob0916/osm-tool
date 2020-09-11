const path = require('path');
exports.wanNodeURL = 'http://192.168.1.179:7654';

exports.nodeKeyList = path.join(__dirname,"../output-internal/nodeKeyList");
exports.WalletAddList = path.join(__dirname,"../output-internal/WalletAddList");
exports.WorkingAddList = path.join(__dirname,"../output-internal/WorkingAddList");
exports.RelationList = path.join(__dirname,"../output-internal/RelationList");

exports.ksDir = path.join(__dirname,"../output-internal/ks");

exports.ownerAddr ='0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e';
exports.adminAddr ='0x5793e629c061e7fd642ab6a1b4d552cec0e2d606';
exports.password = "wanglu";

exports.allocValue = 100;
exports.allocWKValue = 10;

exports.gasPrice = 180000000000;
exports.gasLimit = 10000000;

exports.gasPriceTransfer = 1e9;
exports.gasLimitTransfer = 21000;

exports.gatherKsList = path.join(__dirname,"../bin/gatherList");

exports.smgScAddr = '0x24D8Ae2089Cee8Bde68c59f2d957e2D881981748';


exports.smgAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "createGpkAddr",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "quotaInst",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "badAddrs",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "badTypes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "halted",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "metric",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "halt",
                "type": "bool"
            }
        ],
        "name": "setHalt",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "preGroupId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "workStart",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "workDuration",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "registerDuration",
                "type": "uint256"
            }
        ],
        "name": "StoremanGroupRegisterStartEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "StoremanGroupUnregisterEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "dismissTime",
                "type": "uint256"
            }
        ],
        "name": "StoremanGroupDismissedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "preGroupId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "wkAddrs",
                "type": "address[]"
            }
        ],
        "name": "storemanTransferEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "chain1",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "chain2",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "curve1",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "curve2",
                "type": "uint256"
            }
        ],
        "name": "updateGroupChainEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "storemanGroupContributeEvent",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "metricAddr",
                "type": "address"
            },
            {
                "name": "gpkAddr",
                "type": "address"
            },
            {
                "name": "quotaAddr",
                "type": "address"
            }
        ],
        "name": "setDependence",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "workStartSecond",
                "type": "uint256"
            },
            {
                "name": "workDuration",
                "type": "uint256"
            },
            {
                "name": "registerDuration",
                "type": "uint256"
            },
            {
                "name": "preGroupId",
                "type": "bytes32"
            },
            {
                "name": "wkAddrs",
                "type": "address[]"
            },
            {
                "name": "senders",
                "type": "address[]"
            }
        ],
        "name": "storemanGroupRegisterStart",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "chain1",
                "type": "uint256"
            },
            {
                "name": "chain2",
                "type": "uint256"
            },
            {
                "name": "curve1",
                "type": "uint256"
            },
            {
                "name": "curve2",
                "type": "uint256"
            }
        ],
        "name": "updateGroupChain",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "memberCountdesign",
                "type": "uint256"
            },
            {
                "name": "threshold",
                "type": "uint256"
            },
            {
                "name": "minStakeIn",
                "type": "uint256"
            },
            {
                "name": "delegateFee",
                "type": "uint256"
            }
        ],
        "name": "updateGroupConfig",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "incentiveCandidator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "PK",
                "type": "bytes"
            },
            {
                "name": "enodeID",
                "type": "bytes"
            }
        ],
        "name": "stakeIn",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "stakeAppend",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "stakeOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "checkCanStakeOut",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "checkCanStakeClaim",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "stakeClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "stakeIncentiveClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "delegateIn",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "delegateOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "delegateClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "delegateIncentiveClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "partIn",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "partOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            }
        ],
        "name": "partClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "getSelectedSmNumber",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "select",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSelectedSmInfo",
        "outputs": [
            {
                "name": "wkAddr",
                "type": "address"
            },
            {
                "name": "PK",
                "type": "bytes"
            },
            {
                "name": "enodeId",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "status",
                "type": "uint8"
            }
        ],
        "name": "updateGroupStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "wkAddress",
                "type": "address"
            }
        ],
        "name": "getStoremanInfo",
        "outputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "PK",
                "type": "bytes"
            },
            {
                "name": "wkAddr",
                "type": "address"
            },
            {
                "name": "quited",
                "type": "bool"
            },
            {
                "name": "deposit",
                "type": "uint256"
            },
            {
                "name": "delegateDeposit",
                "type": "uint256"
            },
            {
                "name": "incentive",
                "type": "uint256"
            },
            {
                "name": "delegatorCount",
                "type": "uint256"
            },
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "nextGroupId",
                "type": "bytes32"
            },
            {
                "name": "incentivedDay",
                "type": "uint256"
            },
            {
                "name": "slashedCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "wkAddress",
                "type": "address"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "getStoremanIncentive",
        "outputs": [
            {
                "name": "incentive",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            },
            {
                "name": "deAddr",
                "type": "address"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "getSmDelegatorInfoIncentive",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "wkAddr",
                "type": "address"
            },
            {
                "name": "deAddr",
                "type": "address"
            }
        ],
        "name": "getSmDelegatorInfo",
        "outputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "deposit",
                "type": "uint256"
            },
            {
                "name": "incentive",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "gpk1",
                "type": "bytes"
            },
            {
                "name": "gpk2",
                "type": "bytes"
            }
        ],
        "name": "setGpk",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "slashType",
                "type": "uint8[]"
            },
            {
                "name": "badAddrs",
                "type": "address[]"
            }
        ],
        "name": "setInvalidSm",
        "outputs": [
            {
                "name": "isContinue",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "wk",
                "type": "address"
            }
        ],
        "name": "recordSmSlash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "getThresholdByGrpId",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "storemanGroupUnregister",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "storemanGroupDismiss",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            }
        ],
        "name": "checkGroupDismissable",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "getStoremanGroupInfo2",
        "outputs": [
            {
                "components": [
                    {
                        "name": "groupId",
                        "type": "bytes32"
                    },
                    {
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "name": "deposit",
                        "type": "uint256"
                    },
                    {
                        "name": "depositWeight",
                        "type": "uint256"
                    },
                    {
                        "name": "selectedCount",
                        "type": "uint256"
                    },
                    {
                        "name": "memberCount",
                        "type": "uint256"
                    },
                    {
                        "name": "whiteCount",
                        "type": "uint256"
                    },
                    {
                        "name": "whiteCountAll",
                        "type": "uint256"
                    },
                    {
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "name": "registerTime",
                        "type": "uint256"
                    },
                    {
                        "name": "registerDuration",
                        "type": "uint256"
                    },
                    {
                        "name": "memberCountDesign",
                        "type": "uint256"
                    },
                    {
                        "name": "threshold",
                        "type": "uint256"
                    },
                    {
                        "name": "chain1",
                        "type": "uint256"
                    },
                    {
                        "name": "chain2",
                        "type": "uint256"
                    },
                    {
                        "name": "curve1",
                        "type": "uint256"
                    },
                    {
                        "name": "curve2",
                        "type": "uint256"
                    },
                    {
                        "name": "tickedCount",
                        "type": "uint256"
                    },
                    {
                        "name": "minStakeIn",
                        "type": "uint256"
                    },
                    {
                        "name": "crossIncoming",
                        "type": "uint256"
                    },
                    {
                        "name": "gpk1",
                        "type": "bytes"
                    },
                    {
                        "name": "gpk2",
                        "type": "bytes"
                    },
                    {
                        "name": "delegateFee",
                        "type": "uint256"
                    }
                ],
                "name": "info",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "getStoremanGroupInfo",
        "outputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "deposit",
                "type": "uint256"
            },
            {
                "name": "whiteCount",
                "type": "uint256"
            },
            {
                "name": "memberCount",
                "type": "uint256"
            },
            {
                "name": "startTime",
                "type": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "getStoremanGroupConfig",
        "outputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "deposit",
                "type": "uint256"
            },
            {
                "name": "chain1",
                "type": "uint256"
            },
            {
                "name": "chain2",
                "type": "uint256"
            },
            {
                "name": "curve1",
                "type": "uint256"
            },
            {
                "name": "curve2",
                "type": "uint256"
            },
            {
                "name": "gpk1",
                "type": "bytes"
            },
            {
                "name": "gpk2",
                "type": "bytes"
            },
            {
                "name": "startTime",
                "type": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256"
            },
            {
                "name": "delegateFee",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "getStoremanGroupTime",
        "outputs": [
            {
                "name": "groupId",
                "type": "bytes32"
            },
            {
                "name": "registerTime",
                "type": "uint256"
            },
            {
                "name": "registerDuration",
                "type": "uint256"
            },
            {
                "name": "startTime",
                "type": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "bytes32"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "checkGroupIncentive",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "contribute",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "smgID",
                "type": "bytes32"
            }
        ],
        "name": "smgTransfer",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "chain1",
                "type": "uint256"
            },
            {
                "name": "chain2",
                "type": "uint256"
            },
            {
                "name": "co",
                "type": "uint256"
            }
        ],
        "name": "setChainTypeCo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "chain1",
                "type": "uint256"
            },
            {
                "name": "chain2",
                "type": "uint256"
            }
        ],
        "name": "getChainTypeCo",
        "outputs": [
            {
                "name": "co",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getStoremanConf",
        "outputs": [
            {
                "name": "backupCount",
                "type": "uint256"
            },
            {
                "name": "standaloneWeight",
                "type": "uint256"
            },
            {
                "name": "DelegationMulti",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "backupCount",
                "type": "uint256"
            },
            {
                "name": "standaloneWeight",
                "type": "uint256"
            },
            {
                "name": "DelegationMulti",
                "type": "uint256"
            }
        ],
        "name": "updateStoremanConf",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getGlobalIncentive",
        "outputs": [
            {
                "name": "contribution",
                "type": "uint256"
            },
            {
                "name": "totalReward",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]