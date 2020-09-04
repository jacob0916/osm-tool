shpath=./app.js

nodepath=../osm1/js-storeman-agent
wa=0x5793e629c061e7fd642ab6a1b4d552cec0e2d606
index=1

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

#NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --metric --grpInfo --fakeSmagent --static
NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --metric --grpInfo  --static
