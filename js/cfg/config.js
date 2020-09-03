let config = {};

(function() {
    if(global.network == undefined){
        global.network = "internal";
    }
    if (global.network === "internal") {
        console.log("use internal config");
        config = require('./config-internal');
    }
    if (global.network === "testnet") {
        console.log("use testnet config");
        config = require('./config-testnet');
    }
    if (global.network === "mainnet") {
        console.log("use mainnet config");
        config = require('./config-mainnet');
    }
})();

module.exports = config;