shpath=./app.js

nodepath=../osm6/js-storeman-agent
wa=0x8c36830398659c303e4aedb691af8c526290452a
index=6

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --grpInfo
