shpath=./app.js

nodepath=../osm5/js-storeman-agent
wa=0xe89476b7cc8fa1e503f2ae4a43e53eda4bfbac07
index=5

cd $nodepath
keystore=../keystore/working
password=../keystore/pwd.json

pwd=$(dirname $(readlink -f "$0"))
echo $pwd

NODE_PATH=. node  $shpath --testnet --i $index  --dbip 192.168.1.179 --dbport 27017 -c ETH --wa $wa --keystore $keystore --password $password --grpInfo
