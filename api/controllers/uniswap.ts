import { BigNumber, Contract, providers } from "ethers";
import { UNISWAP_PAIR_ABI } from "../abi/abi";
import { UNISWAP_CONTRACT_ADDRESS } from "../addresses";


//Function to get uniswap events for the last 1000 blocks
exports.getUniswapData = async(request, response, next) => {
  try {
    const provider = providers.getDefaultProvider();

    interface UniswapArgument {
      amount0In?: number;
      amount1In?: number;
      amount0Out?: number;
      amount1Out?: number;
      reserve0?: number;
      reserve1?: number;
      sender?: string;
      to?: string;
    }

    const uniswapInterface = new Contract(UNISWAP_CONTRACT_ADDRESS, UNISWAP_PAIR_ABI, provider);

    const currentBlock = await provider.getBlockNumber();
    let eventFilter:any = "*";
    let transactionArgumentArr =[];
    const transferEvents = await uniswapInterface.queryFilter(eventFilter,currentBlock-1000,currentBlock);

    for (let i = 0; i < transferEvents.length; i++) {
      let arg:UniswapArgument = {};
      if(transferEvents[i].event == 'Swap'){
        arg.amount0In = bigNumberToDecimal(transferEvents[i].args.amount0In);
        arg.amount1In = bigNumberToDecimal(transferEvents[i].args.amount1In);
        arg.amount0Out = bigNumberToDecimal(transferEvents[i].args.amount0Out);
        arg.amount1Out = bigNumberToDecimal(transferEvents[i].args.amount1Out);
        arg.sender  = transferEvents[i].args.sender;
        arg.to = transferEvents[i].args.to;
      }else if (transferEvents[i].event == 'Sync'){
        arg.reserve0 =  bigNumberToDecimal(transferEvents[i].args.reserve0);
        arg.reserve1 =  bigNumberToDecimal(transferEvents[i].args.reserve1);
      }
      transactionArgumentArr.push(arg);
    }

    return response.status(200).json({
      'data': {transferEvents:transferEvents,transactionArgumentArr:transactionArgumentArr},
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

function bigNumberToDecimal(value: BigNumber, base = 18): number {
  const divisor = BigNumber.from(10).pow(base);
  return value.mul(10000).div(divisor).toNumber() / 10000;
}
