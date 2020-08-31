#!/bin/bash

groupInfo=../../osm1/schnorrmpc/data/groupInfo.json

ans=0
	index0=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][0]["index"]'`
	index1=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][1]["index"]'`
	index2=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][2]["index"]'`
	index3=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][3]["index"]'`
	enode0=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][0]["nodeId"]'`
	enode1=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][1]["nodeId"]'`
	enode2=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][2]["nodeId"]'`
	enode3=`cat $groupInfo | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["grpInfo"][0]["grpElms"][3]["nodeId"]'`

n=0;while read a b;do enodes[$n]=$b;nodekeys[$n]=$a;((n++));done<enode.info

#echo "enodes:"${enodes[*]}
#echo "nodekeys:"${nodekeys[@]}

#echo "enodes[1]:"${enodes[1]}
#echo "nodekeys[1]:"${nodekeys[1]}

for i in {0..3}
do
	index=$(eval echo '$'"index"${i}) 
	enode=$(eval echo '$'"enode"${i}) 

	j=`expr $i + 1`
	#echo $j
	nodekeyfile="../../osm"${j}"/schnorrmpc/data/nodekey"
	
	k=0
        for enId in ${enodes[@]}
	do
		if [ "$enId" = "$enode" ];then
			#echo "k="$k
			nodekey=${nodekeys[$k]}
			break
		fi
		((k++))
	done

	echo "j="$j
	echo "enode="$enode
	echo "nodekey="$nodekey
	echo "nodekeyfile="$nodekeyfile
	echo "============================"
	echo $nodekey >$nodekeyfile
done
