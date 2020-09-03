const Web3 = require('web3');
const net = require('net');
const fs = require('fs');
const readline = require('readline');
const optimist = require('optimist');
let argv = optimist
    .usage("Usage: $0  --nc [index] --wallet [true]")
    .alias('h', 'help')
    .describe('network', 'network')
    .default('network', 'internal')
    .argv;
global.network = argv["network"];
const config = require('../cfg/config');

let web3 = new Web3(new Web3.providers.HttpProvider(config.wanNodeURL));

async function main() {
    let addr = null;
    // loop the wallet address, working address
    await build();
}

async function build() {
    // waddr, wkaddr, wkpk, enodeId
    let ret = [];
    let linesWKAddr = await processLineByLine(config.WorkingAddList);
    let linesWAddr = await processLineByLine(config.WalletAddList);
    let linesEnode = await processLineByLine(config.nodeKeyList);

    let fileContent = "";
    for (let i = 0; i < linesWKAddr.length; i++) {
        let oneLine = "";
        // wallet address  and keystore file name
        // working address and keystore file name
        // working pk
        // enodeId
        oneLine += split(linesWAddr[i])[0] + "\t";
        oneLine += split(linesWKAddr[i])[0] + "\t";
        oneLine += split(linesWKAddr[i])[1] + "\t";

        if (i == parseInt(linesWKAddr.length - 1)) {
            oneLine += split(linesEnode[i])[1];
        } else {
            oneLine += split(linesEnode[i])[1] + "\n";
        }
        fileContent += oneLine;
    }
    fs.writeFileSync(config.RelationList, fileContent);
    console.log("==================done================\n");
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

main();
