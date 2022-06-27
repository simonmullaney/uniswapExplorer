import { BigNumber, Contract, providers } from "ethers";
import { UNISWAP_PAIR_ABI } from "../abi/abi";
import { UNISWAP_CONTRACT_ADDRESS } from "../addresses";



exports.getUniswapData = async(request, response, next) => {
  try {
    const provider = providers.getDefaultProvider()
    // console.log("provider: ",provider);

    const uniswapInterface = new Contract(UNISWAP_CONTRACT_ADDRESS, UNISWAP_PAIR_ABI, provider);

    // console.log("uniswapInterface: ",uniswapInterface);
    const currentBlock = await provider.getBlockNumber();
    console.log("Current Block: ",currentBlock);

    let eventFilter:any = "*"
    const transferEvents = await uniswapInterface.queryFilter(eventFilter,currentBlock-10,currentBlock);
    console.log("transferEvents: ",transferEvents);

    return response.status(200).json({
          'data': transferEvents,
          'message': 'Success',
          'status': 'success',
          'response': 200
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return response.status(500).json({
      'data': [],
      'message': error,
      'status': 'fail',
      'response': 500
    });
  }
}
