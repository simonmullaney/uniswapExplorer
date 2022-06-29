#!/bin/bash
echo '*****************************************************************************************'
echo ' Stopping Uniswap Explorer'
echo '*****************************************************************************************'

pm2 stop UniswapExplorerFrontend
pm2 stop UniswapExplorerAPI
pm2 delete UniswapExplorerAPI
pm2 delete UniswapExplorerFrontend


echo '*****************************************************************************************'
echo ' Uniswap Explorer Stopped'
echo '*****************************************************************************************'
