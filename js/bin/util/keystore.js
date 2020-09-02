const fs = require('fs');
const keythereum = require("keythereum");
const path = require('path');

const keyStore = {

    getFromFile(fileName){
        let keystoreStr = fs.readFileSync(fileName, "utf8");
        return JSON.parse(keystoreStr);
    },

    getPrivateKeyByKsPath(address,password,keyStorePath){

        let filePath;
        if (address.substr(0, 2) === '0x' || address.substr(0, 2) === '0X')
            address = address.substr(2);
        let files = fs.readdirSync(keyStorePath);
        for (var i in files) {
            var item = files[i];
            if (item.toLowerCase().indexOf(address.toLowerCase()) >= 0) {
                filePath =  path.join(keyStorePath,item);
            }
        }

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>keystore filepath:" + filePath);
        let keystore = this.getFromFile(filePath);
        let keyAObj = {version:keystore.version, crypto:keystore.crypto};
        let privKeyA;
        try {
            privKeyA = keythereum.recover(password, keyAObj);
        }catch(error){
            console.log('User Transaction input : ', 'wrong password');
            return null;
        }
        return privKeyA;
    },

};
module.exports = keyStore;