import { ethers } from "ethers";
import { 
	FACTORY_CONTRACT_ADDRESS, 
	FACTORY_CONTRACT_ABI 
} from "../../contracts";


const getExploreDetails = async () => {
  const provider = new ethers.AlchemyProvider(
    "optimism-sepolia",
    process.env.REACT_APP_ALCHEMY_API_OP
  );

  const factoryContract = new ethers.Contract(
    FACTORY_CONTRACT_ADDRESS,
    FACTORY_CONTRACT_ABI,
    provider
  );

	const allActiveRaffles: string[] = await factoryContract.getAllActiveRaffles();
	console.log(allActiveRaffles)
	//TODO:
	//1. Image URL
	//2. Owner
	//3. Contract Name
	//4. Nft name
	//5. Nft ID
	//6. max entries
	//7. total entries
	//8. ticket price in usd
	//9. NFT floor price if possible
}

export default getExploreDetails;