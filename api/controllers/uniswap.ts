import { BigNumber, Contract, Wallet } from "ethers";
import { UNISWAP_CONTRACT_ABI } from "../abi/abi";
import { UNISWAP_CONTRACT_ADDRESS } from "../addresses";


exports.getUniswapData = async(request, response, next) => {

  const uniswapInterface = new Contract(UNISWAP_CONTRACT_ADDRESS, UNISWAP_CONTRACT_ABI);
  console.log("uniswapInterface: ",uniswapInterface);

}
