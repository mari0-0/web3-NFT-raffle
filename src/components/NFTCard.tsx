import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import CopyButton from "./CopyButton";
import CreateNFTRaffleButton from "./CreateNFTRaffleButton";
import { getContract, prepareContractCall, resolveMethod } from "thirdweb";
import client from "../client";
import { optimismSepolia } from "thirdweb/chains";
import { MediaRenderer, useSendAndConfirmTransaction } from "thirdweb/react";
import { Link } from "react-router-dom";
import emitter from "./emiter";

interface Props {
  imageHash: string | undefined;
  name: string;
  address: string;
  activeTab: "Owned" | "Active" | "Completed";
  tokenId: number;
  raffleAddress?: string;
}

function truncateAddress(address: string): string {
  if (address.length <= 10) {
    return address;
  }
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 6);
  return `${start}...${end}`;
}

const getIpfsGatewayUrl = (ipfsUrl: string): string => {
  return ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
};

const NFTCard: React.FC<Props> = ({
  imageHash,
  name,
  address,
  activeTab,
  tokenId,
  raffleAddress,
}) => {
  const fallbackImage = getIpfsGatewayUrl(
    "ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X"
  );
  const toast = useToast();

  const {
    mutate: sendCancelTx,
    isPending: isPendingCancel,
    isError: isErrorCancel,
    isSuccess: isSuccessCancel,
    failureReason: failureReasonCancel,
  } = useSendAndConfirmTransaction();

  const handleCancelRaffle = () => {
    console.log("Cancelling", raffleAddress);

    const raffleContract = getContract({
      client,
      chain: optimismSepolia,
      address: raffleAddress ?? "",
    });
    const cancelRaffleTransaction = prepareContractCall({
      contract: raffleContract,
      method: "function cancelRaffle()",
      // params: [],
    });
    sendCancelTx(cancelRaffleTransaction);
  };

  useEffect(() => {
    console.log("There may be some errors");
    if (isErrorCancel) {
      console.log(failureReasonCancel?.message.toString());
      toast({
        position: "top",
        title: `Error: ${failureReasonCancel?.message.toString()}`,
        status: "error",
        isClosable: true,
      });
    }
  }, [isErrorCancel]);

  useEffect(() => {
    if(isSuccessCancel){
      toast({
        position: "top",
        title: "Successfully cancelled Raffle! 🎉",
        status: "success",
        isClosable: true,
        duration: 3500,
      });
      emitter.emit("Active success");
    }
  }, [isSuccessCancel])

  return (
    <Card mb={"2rem"} mx={"1rem"} maxW="md" variant={"outline"} bg={"#FFFFF0"} borderRadius={'xl'}>
      <CardHeader>
        <Center height="350px">
          <Box w={'100%'} h={'100%'} overflow={'hidden'}>
          {imageHash ? (
            // <Image
            //   src={getIpfsGatewayUrl(imageHash)}
            //   onError={(e) => {
            //     e.currentTarget.src = fallbackImage;
            //   }}
            //   alt={name}
            //   borderRadius={'lg'}
            //   style={{ maxWidth: "100%", maxHeight: "100%" }}
            // />
            <MediaRenderer client={client} src={imageHash}/>
          ) : (
            // <Image
            //   src={fallbackImage}
            //   alt="fallback"
            //   borderRadius={'lg'}
            //   style={{ maxWidth: "100%", maxHeight: "100%" }}
            // />
            <MediaRenderer client={client} src={fallbackImage}/>
          )}
          </Box>
        </Center>
      </CardHeader>
      <CardBody p={0}>
        <Stack spacing="3" p={"1rem"}>
          <Heading size="md">{name}</Heading>
          <HStack>
            <Text letterSpacing="2px">{truncateAddress(address)}</Text>
            <CopyButton address={address} />
          </HStack>
        </Stack>
      </CardBody>
      <CardFooter w={"100%"}>
        {activeTab === "Owned" && (
          <CreateNFTRaffleButton NFTaddress={address} tokenId={tokenId} />
        )}
        {activeTab === "Active" && (
          <>
            <Button
              onClick={handleCancelRaffle}
              isLoading={isPendingCancel}
              w="100%"
              mr={2}
              bg={"#F56565"}
              _hover={{ bg: "#FC8181" }}
            >
              Cancel Raffle
            </Button>
            {/* <Button
              variant={"outline"}
              isDisabled={isPendingCancel}
              w="100%"
              mr={2}
            >
              Change Price
            </Button> */}
            <Link to={`/details/${address}/${tokenId}`} state={raffleAddress} style={{width: '100%', marginLeft: 2}}>
              <Button
                bg={"RGBA(0, 0, 0, 0.92)"}
                _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
                color={"white"}
                w="100%"
              >
                View
              </Button>
            </Link>
          </>
        )}
        {activeTab === "Completed" && (
          <Button
            w="100%"
            bg={"RGBA(0, 0, 0, 0.16)"}
            isDisabled
            _hover={"none"}
          >
            Raffle Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
