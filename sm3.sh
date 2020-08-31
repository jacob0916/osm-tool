shpath=./app.js

nodepath=../osm3/js-storeman-agent
wa=0xfFb044cD928C1B7Ef6CC15932D06A9ce3351C2dC
index=3

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --grpInfo
