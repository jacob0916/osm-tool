function stringTobytes32(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8')
    let id = '0x' + b.toString('hex')
    return id
}


function byte32ToString(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8')
    let id = '0x' + b.toString('hex')
    return id
}


let hex_change = function (v) {
    let res;
    switch (v) {
        case "a":
            res = 10;
            break;
        case "b":
            res = 11;
            break;
        case "c":
            res = 12;
            break;
        case "d":
            res = 13;
            break;
        case "e":
            res = 14;
            break;
        case "f":
            res = 15;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            res = Number(v);
            break;
        default:
            res = 0;
            break;
    }
    return res;
}

function byte32ToString(grpIdStr) {
    let grpId;
    if (grpIdStr.substring(0, 2).toLowerCase() == '0x') {
        grpId = grpIdStr.substring(2);
        console.log("grpId", grpId);
    }
    let count = grpId.length / 2;
    if (grpId.length % 2) {
        throw new Error("invalid string");
    }
    let ret = '';
    for (let i = 0; i < count; i++) {
        let code = 0;
        code += Number(hex_change(grpId[2 * i])) * 16;
        code += Number(hex_change(grpId[2 * i + 1]));
        if (!!code) {
            ret += '' + String.fromCharCode(code);
        }
    }

    return ret;
}

const optimist = require('optimist');
let argv = optimist
    .describe('grpId', 'group Id')
    .string('grpId')
    .argv;
global.grpIdStr = argv["grpId"];


function getGrpIdByString(hexStr) {
    return byte32ToString(hexStr);
}

function main() {
    //console.log("argv",argv);
    console.log("grpIdStr:", global.grpIdStr);
    console.log("grpName:", getGrpIdByString(global.grpIdStr));
};
main();

//node grpIdToName.js --grpId 0x000000000000000000000000000000000000000000746573746e65745f303032
//grpIdStr: 0x000000000000000000000000000000000000000000746573746e65745f303032
//grpId 000000000000000000000000000000000000000000746573746e65745f303032
//grpName: testnet_002

