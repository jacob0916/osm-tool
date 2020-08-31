ps -ef | grep gwan | grep -v grep |  awk '{print $2}' | xargs kill -9
