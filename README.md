##Getting started

To start the project run:
`bash start.sh`

To stop the project run:
`bash start.sh`

## Uniswap explorer

Full stack application, that displays historical data of a [uniswap contract](https://etherscan.io/address/0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc), with features:

- Tx hash, link to block explorer for that hash
- Parsed values displaying the amounts of assets in human readable form.
- The backend uses ethers.js to fetch all events in the last 1000 blocks
- The backend interacts with authenticated users only, that are connected via MetaMask
- The frontend fetches historical data for display using the backend API only
- API cache implemented for Uniswap queries using [memory-cache](https://www.npmjs.com/package/memory-cache) for similar queries made within 20 seconds of each other
