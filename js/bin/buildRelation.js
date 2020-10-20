const fs = require('fs');
const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('network', 'network')
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
const config = require('../cfg/config');
const osmTools = require('./util/osmTools');
async function main() {
    // loop the wallet address, working address
    await build();
}

async function build() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesWKAddr = await osmTools.processLineByLine(config.WorkingAddList);
    let linesWAddr = await osmTools.processLineByLine(config.WalletAddList);
    let linesEnode = await osmTools.processLineByLine(config.nodeKeyList);

    let fileContent = "";
    for (let i = 0; i < linesWKAddr.length; i++) {
        let oneLine = "";
        // wallet address  and keystore file name
        // working address and keystore file name
        // working pk
        // enodeId
        oneLine += osmTools.split(linesWAddr[i])[0] + "\t";
        oneLine += osmTools.split(linesWKAddr[i])[0] + "\t";
        oneLine += osmTools.split(linesWKAddr[i])[1] + "\t";

        if (i == parseInt(linesWKAddr.length - 1)) {
            oneLine += osmTools.split(linesEnode[i])[1];
        } else {
            oneLine += osmTools.split(linesEnode[i])[1] + "\n";
        }
        fileContent += oneLine;
    }
    fs.writeFileSync(config.RelationList, fileContent);
    console.log("==================done================\n");
}
main();
