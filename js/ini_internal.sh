cd bin

node ./crEnodeId.js --network internal --nc 5
node ./crWalletAddr.js --network internal --nc 5
node ./crWalletAddr.js --network internal --nc 5 --wallet
node ./buildRelation.js --network internal 

cd -

# add alloc?
# add stakeIn?
