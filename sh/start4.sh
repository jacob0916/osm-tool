#!/bin/sh

schnorrmpc=../osm4/schnorrmpc/bin/schnorrmpc
datadir=../osm4/schnorrmpc/data
pwddir=../osm4/keystore/pwd
pwdfile=../osm4/pwd.json
keystore=../osm4/keystore
ipcpath=../osm4/schnorrmpc/data/gwan.ipc
nodekeypath=../osm4/schnorrmpc/data/nodekey
port=27720
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

