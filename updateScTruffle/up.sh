#!/bin/bash
echo "network is "$1
osmPath=/home/jacob/wanchain/two-way-bridge-contracts
updatePath=/home/jacob/wanchain/two-way-bridge-contracts/upgrade

cd $osmPath

mv $osmPath/migrations/2_deploy.js /tmp/2_deploy.js.bak 

cp $updatePath/2_deploy.js $osmPath/migrations/2_deploy.js

truffle migrate --reset --network $1

mv /tmp/2_deploy.js.bak $osmPath/migrations/2_deploy.js 

cd $osmPath
echo "done"

