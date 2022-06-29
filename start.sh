#!/bin/bash
echo '*****************************************************************************************'
echo ' Starting Uniswap Explorer'
echo '*****************************************************************************************'
sudo npm install pm2 -g
cd './frontend' || exit
sudo npm i
pm2 --name UniswapExplorerFrontend start npm -- start
cd '../api' || exit
sudo npm i
pm2 --name UniswapExplorerAPI start npm -- start
echo '*****************************************************************************************'
echo ' Finished Uniswap Explorer setup'
echo ' Frontend visible at: http://localhost:4200'
echo '*****************************************************************************************'
