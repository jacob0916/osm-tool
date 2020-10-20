const osmTools = require('./util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .describe('grpName', 'group name')
    .argv;
global.grpName = argv["grpName"];


function getGrpIdByString(str) {
    return osmTools.stringTobytes32(str);
}

function main() {
    console.log(getGrpIdByString(global.grpName));
};
main();

