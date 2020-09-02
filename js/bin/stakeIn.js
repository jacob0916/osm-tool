/*

grpId

wkPk

enodeId

stakeInValue


smStartIndex
smCount

 */

const optimist = require('optimist');
let argv = optimist
    .alias('h', 'help')
    .describe('gid', 'grpId')
    .describe('smsi', 'sm start index')
    .describe('smcnt', 'sm count')
    .describe('amount', 'stake in amount')
    .default('smsi', 0)
    .default('smcnt', 30)
    .default('amount', 2000)
    .argv;

function main() {
    // only admin can open group.
    console.log(argv);
}

main();