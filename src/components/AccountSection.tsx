import {
	Button,
	HStack,
	Heading,
	Stack,
	Image,
	Text,
	Center,
} from "@chakra-ui/react";
import { Alchemy, Network } from "alchemy-sdk";
import {
	useActiveAccount,
	useActiveWalletConnectionStatus,
} from "thirdweb/react";
import profilePic from "../assets/images/hero-nft1.png";
import CopyButton from "./CopyButton";
import React, { useEffect, useState } from "react";
import NFTList from "./NFTList";
import { getContract } from "thirdweb";
import { optimismSepolia } from "thirdweb/chains";
import { FACTORY_CONTRACT_ABI, FACTORY_CONTRACT_ADDRESS } from "../contracts";
import client from "../client";
import { ethers } from "ethers";
import { getNFT } from "thirdweb/extensions/erc721";
import emitter from "./emiter";
import NFTCardSkeleton from "./NFTCardSkeleton";

const config = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_OP,
	network: Network.OPT_SEPOLIA,
};
const alchemy = new Alchemy(config);

function truncateAddress(address: string): string {
	if (address.length <= 10) {
		return address; // If the address is already short, return it as is
	}
	const start = address.substring(0, 6); // First 6 characters
	const end = address.substring(address.length - 6); // Last 6 characters
	return `${start}...${end}`;
}

const AccountSection = () => {
	const status = useActiveWalletConnectionStatus();
	const activeAccount = useActiveAccount();
	const activeAddress = activeAccount?.address ?? "";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [nfts, setNfts] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState("Owned");
	const [loading, setLoading] = useState(false); // Add loading state
	// const [refreshKey, setRefreshKey] = useState(0);

	async function activeRaffleNFTs() {
		async function cleanData(complexData: any) {
			const filteredData = complexData.filter(
				(item: any) => item[2] !== "0x0000000000000000000000000000000000000000"
			);

			const data = await Promise.all(
				filteredData.map(async (item: any) => {
					const nftContract = getContract({
						client,
						chain: optimismSepolia,
						address: item[2],
					});

					const nft = await getNFT({
						contract: nftContract,
						tokenId: item[3],
					});

					return {
						raffleAddress: item[0],
						entryCost: item[1],
						name: nft.metadata.name,
						nftAddress: item[2],
						tokenId: item[3],
						imageUrl: nft.metadata.image,
					};
				})
			);

			return data;
		}

		const provider = new ethers.AlchemyProvider(
			"optimism-sepolia",
			process.env.REACT_APP_ALCHEMY_API_OP
		);
		const factoryContractEthers = new ethers.Contract(
			FACTORY_CONTRACT_ADDRESS,
			FACTORY_CONTRACT_ABI,
			provider
		);

		const activeRafflesRaw = await factoryContractEthers.getUserActiveRaffles(
			activeAddress
		);

		const activeRaffles = await cleanData(activeRafflesRaw);

		console.log("Processed Active Raffles:", activeRaffles);

		return activeRaffles;
	}

	function fetchNFTs(tab: string) {
		console.log("Fetching " + tab + " NFTs");
		if (tab === "Owned") {
			const fetchNFTs = async () => {
				setLoading(true);
				try {
					const nfts = await alchemy.nft.getNftsForOwner(activeAddress);
					console.log(nfts);
					setNfts(nfts.ownedNfts); // Assuming the API response has an 'ownedNfts' property
				} catch (error) {
					console.error("Error fetching NFTs:", error);
				} finally {
					setLoading(false);
				}
			};

			if (activeAddress) {
				fetchNFTs();
			}
		}

		if (tab === "Active") {
			const fetchActiveRaffles = async () => {
				setLoading(true); // Set loading to true before fetching data
				try {
					const activeRaffles = await activeRaffleNFTs();
					setNfts(activeRaffles);
				} catch (error) {
					console.error("Error fetching active raffles:", error);
				} finally {
					setLoading(false); // Set loading to false after data is fetched
				}
			};

			if (activeAddress) {
				fetchActiveRaffles();
			}
		}
	}

	useEffect(() => {
		const handleOwnedSuccess = () => fetchNFTs("Owned");
		const handleActiveSuccess = () => fetchNFTs("Active");

		emitter.on("Owned success", handleOwnedSuccess);
		emitter.on("Active success", handleActiveSuccess);

		// Cleanup event listener on component unmount
		return () => {
			emitter.off("Owned success", handleOwnedSuccess);
			emitter.off("Active success", handleActiveSuccess);
		};
	}, []);

	useEffect(() => {
		fetchNFTs(activeTab);
	}, [activeTab, activeAddress]);

	return (
		<React.Fragment>
			{status === "connecting" ? (
				<Center>
					<Heading mt="4rem" textAlign="center">
						Connecting...
					</Heading>
				</Center>
			) : status === "connected" ? (
				<Stack pt="4rem">
					<HStack>
						<Image src={profilePic} borderRadius="full" height="120px" />
						<Stack ml="2rem">
							<Heading letterSpacing="3px">
								{activeAddress.substring(0, 6)}
							</Heading>
							<HStack>
								<Text letterSpacing="2px">
									{truncateAddress(activeAddress)}
								</Text>
								<CopyButton address={activeAddress} />
							</HStack>
						</Stack>
					</HStack>
					<HStack mt="3rem">
						<Button
							variant="nav"
							className={activeTab !== "Owned" ? "notActiveButton" : ""}
							onClick={() => setActiveTab("Owned")}
						>
							<Heading mr="2rem" fontSize="1.7rem">
								Owned
							</Heading>
						</Button>
						<Button
							variant="nav"
							className={activeTab !== "Active" ? "notActiveButton" : ""}
							onClick={() => setActiveTab("Active")}
						>
							<Heading mr="2rem" fontSize="1.7rem">
								Active
							</Heading>
						</Button>
						<Button
							variant="nav"
							className={activeTab !== "Completed" ? "notActiveButton" : ""}
							onClick={() => setActiveTab("Completed")}
						>
							<Heading mr="2rem" fontSize="1.7rem">
								Completed
							</Heading>
						</Button>
					</HStack>
					{activeTab === "Owned" ? (
						loading ? (
							<HStack mt={"2rem"} spacing={"2rem"}>
								<NFTCardSkeleton activeTab="Owned" />
								<NFTCardSkeleton activeTab="Owned" />
								<NFTCardSkeleton activeTab="Owned" />
							</HStack>
						) : (
							<NFTList nfts={nfts} activeTab={activeTab} />
						)
					) : undefined}
					{activeTab === "Active" ? (
						loading ? (
							<HStack mt={"2rem"} spacing={"2rem"}>
								<NFTCardSkeleton activeTab="Active" />
								<NFTCardSkeleton activeTab="Active" />
								<NFTCardSkeleton activeTab="Active" />
							</HStack>
						) : (
							<NFTList nfts={nfts} activeTab={activeTab} />
						)
					) : undefined}
					{activeTab === "Completed" && (
						<NFTList nfts={[]} activeTab={activeTab} />
					)}
				</Stack>
			) : (
				<Center>
					<Heading mt="4rem" textAlign="center">
						Connect Wallet
					</Heading>
				</Center>
			)}
		</React.Fragment>
	);
};

export default AccountSection;
