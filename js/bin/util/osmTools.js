const net = require('net');
const fs = require('fs');
const readline = require('readline');

const ecurve = require('ecurve');
const ecparams = ecurve.getCurveByName('secp256k1');
const BigInteger = require('bigi');

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


async function processLineByLine(fileName) {
    return new Promise((resolve, reject) => {

        try {
            let lines = [];
            const rl = readline.createInterface({
                input: fs.createReadStream(fileName),
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                lines.push(line)
            });
            rl.on('close', () => {
                resolve(lines);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function split(line, sep = '\t') {
    return line.split(sep);
}


function removePrefix(hexStr) {
    if (hexStr.length < 2) throw ErrInvalidHexString;
    if (hexStr.substring(0, 2) === "0x" || hexStr.substring(0, 2) === "0X") {
        return hexStr.substring(2);
    } else {
        return hexStr;
    }
}

function bufferToHexString(buff) {
    return "0x" + buff.toString('hex');
}


function baseScarMulti(sk) {
    let curvePt = ecparams.G.multiply(BigInteger.fromBuffer(sk));
    let ret = curvePt.getEncoded(false);
    let str = ret.toString('hex');
    str = str.slice(2);
    return Buffer.from(str, 'hex');
}


// "2019/10/19-12:00:00"
function getTimeStampByStr(dateTimeStr) {
    let errInvalidDateTimeStr = new Error("invalid date and time string ,should like 2019/10/19-12:00:00");

    let t = dateTimeStr.split("-");
    if (t.length != 2) {
        console.log("invalid date and time string ,should like 2019/10/19-12:00:00");
        throw errInvalidDateTimeStr;
    } else {
        let [year, month, day] = t[0].split("/");
        let [h, minute, second] = t[1].split(":");

        if (parseInt(t[0].split("/").length) != 3 || t[1].split(":").length != 3) {
            throw errInvalidDateTimeStr
        }
        let myDate = new Date(year, parseInt(month) - 1, day, h, minute, second);
        return myDate.getTime() / 1000;
    }
}
// uint m
function getStrByTimeStamp(curTS){
    let myDate = new Date();
    myDate.setTime(parseInt(curTS) * 1000);

    // console.log(myDate.toDateString());
    // console.log(myDate.toLocaleDateString());
    // console.log(myDate.toLocaleString());
    // console.log(myDate.toLocaleTimeString());

    let ret ='';
    ret += replaceAll('-','/',myDate.toLocaleDateString());
    ret += '-' + myDate.toLocaleTimeString();
    return ret;
}


function replaceAll(find, replace, str) {
    var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}

function getGrpIdByString(str) {
    return stringTobytes32(str);
}

function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

// testnet_001
function getNextGrpName(curGrpName,seperator){
    let [prefix, number] = curGrpName.toString().split(seperator);
    let nextNumber = parseInt(number) + 1;

    let ret = '';
    ret += prefix + seperator + PrefixInteger(nextNumber, number.length);
    return ret;
}

function getPreGrpName(curGrpName,seperator){
    let [prefix, number] = curGrpName.toString().split(seperator);
    let nextNumber = parseInt(number) - 1;

    if(parseInt(nextNumber) <=0 ){
        throw new Error("the pre group number is negative");
    }

    let ret = '';
    ret += prefix + seperator + PrefixInteger(nextNumber, number.length);
    return ret;
}
//2020/10/23-12:00:00
function getNextWorkTime(curWorkTime, duringDay){
    let curTS = getTimeStampByStr(curWorkTime);
    curTS += parseInt(duringDay) * 86400;
    return getStrByTimeStamp(curTS);

}
//2020/10/23-12:00:00
function getPreWorkTime(curWorkTime, duringDay){
    let curTS = getTimeStampByStr(curWorkTime);
    curTS -= parseInt(duringDay * 86400);

    return getStrByTimeStamp(curTS);
}

module.exports = {
    byte32ToString,
    stringTobytes32,
    processLineByLine,
    split,
    removePrefix,
    bufferToHexString,
    baseScarMulti,
    getTimeStampByStr,
    getGrpIdByString,
    getNextGrpName,
    getPreGrpName,
    getNextWorkTime,
    getPreWorkTime,
}