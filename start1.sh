#!/bin/sh

schnorrmpc=../osm1/schnorrmpc/bin/schnorrmpc
datadir=../osm1/schnorrmpc/data
#pwddir=../osm1/keystore/pwd
pwdfile=../osm1/pwd.json
keystore=../osm1/keystore
ipcpath=../osm1/schnorrmpc/data/gwan.ipc
nodekeypath=../osm1/schnorrmpc/data/nodekey
port=27717
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

