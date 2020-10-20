function stringTobytes32(name) {
    let b = Buffer.alloc(32)
    b.write(name, 32 - name.length, 'utf8')
    let id = '0x' + b.toString('hex')
    return id
}

const optimist = require('optimist');
let argv = optimist
    .describe('grpName', 'group name')
    .argv;
global.grpName = argv["grpName"];


function getGrpIdByString(str) {
    return stringTobytes32(str);
}

function main() {
    console.log(getGrpIdByString(global.grpName));
};
main();

