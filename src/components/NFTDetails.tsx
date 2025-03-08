import React, { useEffect, useState } from "react";
import {
	HStack,
	Image,
	Heading,
	Stack,
	Progress,
	Text,
	Box,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { getContract } from "thirdweb";
import client from "../client";
import { optimismSepolia } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getDetails } from "./getDetails";
import TicketsSelector from "./TicketsSelector";
import { IoTicketOutline } from "react-icons/io5";
import CopyButton from "./CopyButton";
import profilePic from "../assets/images/hero-nft1.png";
import { SiEthereum } from "react-icons/si";
import ChangeTicketPrice from "./ChangeTicketPrice";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";
import NFTDetailsSkeleton from "./NFTDetailsSkeleton";

// const getIpfsGatewayUrl = (ipfsUrl: string): string => {
// 	return ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
// };

function truncateAddress(address: string): string {
	if (address.length <= 10) {
		return address; // If the address is already short, return it as is
	}
	const start = address.substring(0, 6); // First 6 characters
	const end = address.substring(address.length - 6); // Last 6 characters
	return `${start}...${end}`;
}

interface RaffleDetails {
	raffleAddress: string;
	entryCost: number;
	maxEntries: number;
	totalEntries: number;
	owner: string;
	raffleStatus: boolean;
	winner: string;
	balance: number;
	ticketPrice: number;
}

const NFTDetails: React.FC = () => {
	const params = useParams<{ nftAddress: string; tokenId: string }>();
	const [nft, setNft] = useState<any>(null);
	const [nftContractDetails, setNftContractDetails] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const activeAccount = useActiveAccount();
	const activeAdddress = activeAccount?.address ?? "";

	const [raffleDetails, setRaffleDetails] = useState<RaffleDetails | null>(
		null
	);
	const location = useLocation();
	const raffleAddress = location.state;

	useEffect(() => {
		const fetchNFT = async () => {
			setRaffleDetails(await getDetails(raffleAddress));
			try {
				const nftContract = getContract({
					client,
					chain: optimismSepolia,
					address: params.nftAddress || "",
				});

				const nftContractMetadata = await getContractMetadata({
					contract: nftContract,
				});
				setNftContractDetails(nftContractMetadata);

				const nftData = await getNFT({
					contract: nftContract,
					tokenId: BigInt(params.tokenId || ""),
				});
				setNft(nftData);
			} catch (err) {
				setError("Failed to fetch NFT details.");
			} finally {
				setLoading(false);
			}
		};

		if (params.nftAddress && params.tokenId) {
			fetchNFT();
		}
	}, [params.nftAddress, params.tokenId]);

	if (loading) {
		return <NFTDetailsSkeleton />;
	}

	if (error) {
		return <Heading>{error}</Heading>;
	}

	const progressValue = raffleDetails
		? (raffleDetails.totalEntries / raffleDetails.maxEntries) * 100
		: 0;

	return (
		nft &&
		raffleDetails && (
			<HStack my={"3rem"} alignItems={"start"}>
				<Box mt={"1rem"} boxSize="md" height={"fit-content"}>
					<MediaRenderer
						client={client}
						src={nft.metadata.image}
						alt={nft.metadata.name}
						style={{ width: "100%", height: "100%", borderRadius: "20px" }}
					/>
				</Box>
				{/* <Image
          src={getIpfsGatewayUrl(nft.metadata.image)}
          alt={nft.metadata.name}
          mt={"1rem"}
          boxSize="md"
          borderRadius={"20px"}
          objectFit={"contain"}
        /> */}
				<Stack
					ml={"2rem"}
					w={"60%"}
					spacing={4}
					alignSelf={"flex-start"}
					justifyContent={"start"}
				>
					<HStack justifyContent={"space-between"}>
						<HStack spacing={4}>
							<Heading fontSize={"xx-large"}>{nftContractDetails.name}</Heading>
							<Heading fontSize={"lg"} color={"GrayText"} pt={2}>
								{nftContractDetails.symbol}
							</Heading>
						</HStack>
						{raffleDetails.owner === activeAdddress && (
							<ChangeTicketPrice raffleAddress={raffleAddress} />
						)}
					</HStack>

					<Heading>{nft.metadata.name}</Heading>
					<HStack mt={"2rem"}>
						<Image
							mr={"1rem"}
							src={profilePic}
							boxSize={"60px"}
							borderRadius={"full"}
						/>
						<Stack>
							<Text fontWeight={600}>Owner</Text>
							<HStack>
								<Text>{truncateAddress(raffleDetails.owner)}</Text>
								<CopyButton address={raffleDetails.owner} />
							</HStack>
						</Stack>
					</HStack>
					<HStack
						w={"100%"}
						px={"2rem"}
						py={"1.5rem"}
						border={"1px solid"}
						borderColor={"gray.300"}
						borderRadius={"3xl"}
					>
						<Stack
							w={"50%"}
							mr={"1rem"}
							borderRight={"1px solid"}
							borderColor={"gray.300"}
						>
							<Text fontSize={"lg"} fontWeight={800}>
								Ticket Price
							</Text>
							<HStack>
								<Text fontSize={"2xl"} fontWeight={600}>
									{raffleDetails.entryCost / 10e18}
								</Text>
								<SiEthereum />
							</HStack>
						</Stack>
						<Stack w={"50%"}>
							<Text fontSize={"lg"} fontWeight={600}>
								Tickets Sold / Total
							</Text>
							<HStack>
								<IoTicketOutline size={"1.3rem"} />
								<Text fontWeight={600} fontSize={"sm"} alignSelf={"end"}>
									{raffleDetails.totalEntries} / {raffleDetails.maxEntries}
								</Text>
								<Progress
									w={"65%"}
									value={progressValue}
									borderRadius={"lg"}
									size="sm"
									colorScheme="yellow"
								/>
							</HStack>
						</Stack>
					</HStack>

					<TicketsSelector raffleDetails={raffleDetails} />
					{/* <button onClick={handleGetInputValue}>Get Input Value</button> */}
				</Stack>
			</HStack>
		)
	);
};

export default NFTDetails;
