ps -ef | grep node | grep -v grep | grep  grpInfo | awk '{print $2}' | xargs kill -9
