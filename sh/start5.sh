#!/bin/sh

schnorrmpc=../osm5/schnorrmpc/bin/schnorrmpc
datadir=../osm5/schnorrmpc/data
pwddir=../osm5/keystore/pwd
pwdfile=../osm5/pwd.json
keystore=../osm5/keystore
ipcpath=../osm5/schnorrmpc/data/gwan.ipc
nodekeypath=../osm5/schnorrmpc/data/nodekey
port=27721
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

