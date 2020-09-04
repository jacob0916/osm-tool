#!/bin/sh

schnorrmpc=../osm2/schnorrmpc/bin/schnorrmpc
datadir=../osm2/schnorrmpc/data
#pwddir=../osm2/keystore/pwd
pwdfile=../osm2/pwd.json
keystore=../osm2/keystore
ipcpath=../osm2/schnorrmpc/data/gwan.ipc
nodekeypath=../osm2/schnorrmpc/data/nodekey
port=27718
#echo $schnorrmpc
#echo $datadir
#echo $pwddir
#echo $ipcpath
#echo $nodekeypath
#echo $port
$schnorrmpc --verbosity 4 --port $port --storeman  --datadir $datadir --keystore $keystore --password $pwdfile --ipcpath $ipcpath --maxpeers 500 --nodekey $nodekeypath --threshold 3 --totalnodes 4 

