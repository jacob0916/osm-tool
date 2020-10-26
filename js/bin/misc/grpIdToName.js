const osmTools = require('../util/osmTools');

const optimist = require('optimist');
let argv = optimist
    .describe('grpId', 'group Id')
    .string('grpId')
    .argv;
global.grpIdStr = argv["grpId"];


function getGrpIdByString(hexStr) {
    return osmTools.byte32ToString(hexStr);
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

