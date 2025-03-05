import { ethers } from "ethers";
import { RAFFLE_CONTRACT_ABI } from "../contracts";
import { aggregatorV3InterfaceABI, PRICE_FEED_ADDRESS } from "../contracts";

const getDetails = async (raffleAddress: any) => {
  const provider = new ethers.AlchemyProvider(
    "optimism-sepolia",
    process.env.REACT_APP_ALCHEMY_API_OP
  );

  const raffleContract = new ethers.Contract(
    raffleAddress,
    RAFFLE_CONTRACT_ABI,
    provider
  );

  const entryCost = Number(await raffleContract.entryCost());
  const maxEntries = Number(await raffleContract.maxEntries());
  const totalEntries = Number(await raffleContract.totalEntries());
  const owner = await raffleContract.owner();
  const raffleStatus = await raffleContract.raffleStatus();
  const winner = await raffleContract.winner();
  const balance = Number(await raffleContract.getBalance());

  const priceFeed = new ethers.Contract(PRICE_FEED_ADDRESS, aggregatorV3InterfaceABI, provider);
  const ETH_PRICE = await priceFeed.latestRoundData().then((roundData) => {
    const price = Number(roundData[1]) / 1e8;
    return price;
  });

  let ticketPrice: any = ETH_PRICE * Number(ethers.formatEther(entryCost.toString()));
  ticketPrice = parseFloat(ticketPrice.toString()).toFixed(2);

  const details = {
    raffleAddress,
    entryCost,
    maxEntries,
    totalEntries,
    owner,
    raffleStatus,
    winner,
    balance,
    ticketPrice,
  };
  console.log(details);

  return details;
};

export { getDetails };
