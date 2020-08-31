#!/bin/sh

schnorrmpc=../osm3/schnorrmpc/bin/schnorrmpc
datadir=../osm3/schnorrmpc/data
#pwddir=../osm3/keystore/pwd
pwdfile=../osm3/pwd.json
keystore=../osm3/keystore
ipcpath=../osm3/schnorrmpc/data/gwan.ipc
nodekeypath=../osm3/schnorrmpc/data/nodekey
port=27719
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

