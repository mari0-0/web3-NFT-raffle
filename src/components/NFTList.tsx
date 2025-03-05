import { Center, Grid, Heading } from "@chakra-ui/react";
import NFTCard from "./NFTCard";

interface ListTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nfts: any[];
  activeTab: "Owned" | "Active" | "Completed";
}

const NFTList: React.FC<ListTypes> = ({ nfts, activeTab }) => {


  return (
    <>
      {nfts.length > 0 ? (
        <Grid mt={"2rem"} templateColumns="repeat(3, 1fr)">
          {nfts.map((nft, i) => (
            <NFTCard
              imageHash={nft.image?.originalUrl || nft.imageUrl ||undefined}
              name={nft.name}
              address={nft.contract?.address || nft.nftAddress}
              tokenId={nft.tokenId}
              key={i}
              activeTab={activeTab}
              raffleAddress={nft?.raffleAddress || undefined}
            />
          ))}
        </Grid>
      ) : (
        <Center mt={"3rem"}>
          <Heading>No NFT's To Display</Heading>
        </Center>
      )}
    </>
  );
};

export default NFTList;
