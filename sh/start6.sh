#!/bin/sh

schnorrmpc=../osm6/schnorrmpc/bin/schnorrmpc
datadir=../osm6/schnorrmpc/data
pwddir=../osm6/keystore/pwd
pwdfile=../osm6/pwd.json
keystore=../osm6/keystore
ipcpath=../osm6/schnorrmpc/data/gwan.ipc
nodekeypath=../osm6/schnorrmpc/data/nodekey
port=27722
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

