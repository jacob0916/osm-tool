#find ../ -type f | grep ks | grep -v admin | grep bak  > gatherList
find ../output-testnet -type f | grep ks | grep -v admin | grep -v 0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e | grep -v 0x5793e629c061e7fd642ab6a1b4d552cec0e2d606 | grep -v 0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8 >gatherList
