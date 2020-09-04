#!/bin/bash


fsmagtcfg=../../osm1/js-storeman-agent/agent/osm/src/metric/fakesmagent/config.js
incntWrite=../../osm1/js-storeman-agent/agent/osm/src/metric/incntSlshWriter.js
#fsmagtcfg=config.js

n=0;while read a b;do addr[$n]=$b;((n++));done<adds.info
#echo ${addr[*]}
#0 tm
#1 htlc 
#2 gpk
#3 groupId
#4 ip:port

echo ${addr[0]}
echo ${addr[1]}
echo ${addr[2]}
echo ${addr[3]}
echo ${addr[4]}
echo ${addr[5]}
echo ${addr[6]}
echo ${addr[7]}

sed -i "s#\(^[ \t].*tm:'\).*\('\)#\1${addr[0]}\2#g" $fsmagtcfg
sed -i "s#\(^[ \t].*htlc:'\).*\('\,\)#\1${addr[1]}\2#g" $fsmagtcfg
sed -i "s#\(.*grpId[ \t]*=[ \t]*\"\).*\(\"\;\)#\1${addr[3]}\2#g" $incntWrite
sed -i "s#\(exports\.GPK[ \t]*=[ \t]*\"\).*\(\"\;\)#\1${addr[2]}\2#g" $fsmagtcfg


cfg1=../../osm1/js-storeman-agent/conf/config.json
cfg2=../../osm2/js-storeman-agent/conf/config.json
cfg3=../../osm3/js-storeman-agent/conf/config.json
cfg4=../../osm4/js-storeman-agent/conf/config.json
cfg5=../../osm5/js-storeman-agent/conf/config.json
cfg6=../../osm6/js-storeman-agent/conf/config.json

sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg1
sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg2
sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg3
sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg4
sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg5
sed -i "s#\(^[ \t].*\"wanWeb3Url\":[ \t]*\"http:\/\/\).*\(:.*\)#\1${addr[4]}\2#g" $cfg6

osmcfg1=../../osm1/js-storeman-agent/agent/osm/cfg/config-testnet.js
osmcfg2=../../osm2/js-storeman-agent/agent/osm/cfg/config-testnet.js
osmcfg3=../../osm3/js-storeman-agent/agent/osm/cfg/config-testnet.js
osmcfg4=../../osm4/js-storeman-agent/agent/osm/cfg/config-testnet.js
osmcfg5=../../osm5/js-storeman-agent/agent/osm/cfg/config-testnet.js
osmcfg6=../../osm6/js-storeman-agent/agent/osm/cfg/config-testnet.js

sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg1
sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg2
sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg3
sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg4
sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg5
sed -i "s#\(^[ \t].*smg:[ \t]*'\).*\('.*\)#\1${addr[5]}\2#g" $osmcfg6

sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg1
sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg2
sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg3
sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg4
sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg5
sed -i "s#\(^[ \t].*gpk:[ \t]*'\).*\('.*\)#\1${addr[6]}\2#g" $osmcfg6

sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg1
sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg2
sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg3
sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg4
sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg5
sed -i "s#\(^[ \t].*metric:[ \t]*'\).*\('.*\)#\1${addr[7]}\2#g" $osmcfg6


