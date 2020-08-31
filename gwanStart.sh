#!/bin/sh
cd /home/osm/gopath/src/github.com/wanchain/go-wanchain
./bootnode/dev_run_bootnode_pluto.sh > /tmp/gwan.out 2>&1 &
cd -
