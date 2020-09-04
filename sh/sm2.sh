shpath=./app.js

nodepath=../osm2/js-storeman-agent
wa=0x82EF7751A5460BC10F731558f0741705BA972f4E
index=2

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --grpInfo
