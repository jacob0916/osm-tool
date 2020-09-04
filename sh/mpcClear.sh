ps -ef | grep schnorrmpc | grep -v grep | grep -v attach | awk '{print $2}' | xargs kill -9
# clear the backdoor
ps -ef | grep schnorrmpc | grep -v grep | grep  attach | awk '{print $2}' | xargs kill -9
