shpath=./app.js

nodepath=../osm4/js-storeman-agent
wa=0x23DcbE0323605A7A00ce554baBCFF197bAF99B10
index=4

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --grpInfo
