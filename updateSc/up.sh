#!/bin/bash
osmPath=/home/osm/workspace/openStoreman
updatePath=/home/osm/workspace/sh/updateSc
cd $osmPath
cp $osmPath/truffle-config.js $osmPath/truffle-config.js.bak
cp $osmPath/migrations/2_deploy.js $osmPath/migrations/2_deploy.js.bak 



cp $updatePath/update/2_deploy.js $osmPath/migrations/2_deploy.js
cp $updatePath/truffle-config.js  $osmPath/truffle-config.js

truffle migrate --reset --network development


mv $osmPath/truffle-config.js.bak $osmPath/truffle-config.js
mv $osmPath/migrations/2_deploy.js.bak $osmPath/migrations/2_deploy.js 

cd $osmPath
echo "done"

