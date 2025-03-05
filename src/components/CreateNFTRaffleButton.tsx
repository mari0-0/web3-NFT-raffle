/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { getContract, prepareContractCall, prepareEvent } from "thirdweb";
import { FACTORY_CONTRACT_ADDRESS } from "../contracts";
import client from "../client";
import { optimismSepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useContractEvents,
  useSendAndConfirmTransaction,
  useSendTransaction,
} from "thirdweb/react";
import { approve } from "thirdweb/extensions/erc721";
import emitter from "./emiter";

const factoryContract = getContract({
  client,
  chain: optimismSepolia,
  address: FACTORY_CONTRACT_ADDRESS,
});

const raffleCreatedEvent = prepareEvent({
  signature: "event RaffleCreated(address raffleAddress, address creator)",
});

const CreateNFTRaffleButton: React.FC<{
  NFTaddress: string;
  tokenId: number;
}> = ({ NFTaddress, tokenId }) => {
  const NFTcontract = getContract({
    client,
    chain: optimismSepolia,
    address: NFTaddress,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxEntriesValue, setMaxEntriesValue] = useState("");
  const [entryPriceValue, setEntryPriceValue] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const acitveAccount = useActiveAccount();
  const raffleContractAddress = useRef("");
  const toast = useToast();

  const {
    mutate: sendFactoryTx,
    isPending: isPendingFactory,
    isError: isErrorFactory,
    isSuccess: isSuccessFactory,
    failureReason: failureReasonFactory,
  } = useSendTransaction();

  const {
    mutate: sendRaffleTx,
    isPending: isPendingRaffle,
    isError: isErrorRaffle,
    isSuccess: isSuccessRaffle,
    failureReason: failureReasonRaffle,
  } = useSendAndConfirmTransaction();

  const {
    mutate: sendApproveTx,
    isPending: isPendingApprove,
    isError: isErrorApprove,
    isSuccess: isSuccessApprove,
    failureReason: failureReasonApprove,
  } = useSendAndConfirmTransaction();

  const { data: raffleCreatedData } = useContractEvents({
    contract: factoryContract,
    events: [raffleCreatedEvent],
    watch: true,
  });

  const callNFTApprove = async () => {
    const nftApproveTx = approve({
      contract: NFTcontract,
      to: raffleContractAddress.current,
      tokenId: BigInt(tokenId),
    });

    const txResult = await sendApproveTx(nftApproveTx);
    console.log(txResult);
  };

  const callRaffleStarted = () => {
    const raffleContract = getContract({
      client,
      chain: optimismSepolia,
      address: raffleContractAddress.current,
    });

    console.log(NFTaddress, BigInt(tokenId));

    const raffleStartTransaction = prepareContractCall({
      contract: raffleContract,
      method: "function raffleStarted(address _nftAddress, uint256 _nftId)",
      params: [NFTaddress, BigInt(tokenId)],
    });
    console.log("test1");
    sendRaffleTx(raffleStartTransaction);
  };

  // ERROR MESSAGES
  useEffect(() => {
    if (isErrorFactory) {
      toast({
        position: "top",
        title: `Error: ${failureReasonFactory?.message.toString()}`,
        status: "error",
        isClosable: true,
        duration: 3500,
      });
      setIsButtonLoading(false);
    }
    if (isErrorApprove) {
      toast({
        position: "top",
        title: `Error: ${failureReasonApprove?.message.toString()}`,
        status: "error",
        isClosable: true,
        duration: 3500,
      });
      setIsButtonLoading(false);
    }
    if (isErrorRaffle) {
      toast({
        position: "top",
        title: `Error: ${failureReasonRaffle?.message.toString()}`,
        status: "error",
        isClosable: true,
        duration: 3500,
      });
      setIsButtonLoading(false);
    }
  }, [
    isErrorFactory,
    failureReasonFactory,
    isErrorApprove,
    isErrorRaffle,
    failureReasonApprove,
    failureReasonRaffle,
  ]);

  // CONTRACT CALLS //
  useEffect(() => {
    if (isSuccessFactory && raffleContractAddress.current === "") {
      type RaffleCreatedEvent = {
        args: {
          raffleAddress: string;
          creator: string;
        };
      };
      console.log(raffleCreatedData);
      const raffleObj = (raffleCreatedData?.[raffleCreatedData.length - 1] ??
        {}) as RaffleCreatedEvent;
      const RAFFLE_CREATED_BY = raffleObj.args.creator;
      const RAFFLE_CONTRACT_ADDRESS = raffleObj.args.raffleAddress;
      console.log(RAFFLE_CONTRACT_ADDRESS, RAFFLE_CREATED_BY);

      const userAddress = acitveAccount?.address ?? "";

      if (RAFFLE_CREATED_BY === userAddress) {
        raffleContractAddress.current = RAFFLE_CONTRACT_ADDRESS;
        callNFTApprove();

        // hasRunEffectRef.current = true; // Set the ref to true to prevent re-running the effect
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raffleCreatedData]);

  useEffect(() => {
    if (isSuccessFactory) {
      setIsButtonLoading(true);
    }
  }, [isSuccessFactory]);

  useEffect(() => {
    if (isSuccessApprove) {
      callRaffleStarted();
    }
  }, [isSuccessApprove]);

  useEffect(() => {
    if (isSuccessRaffle) {
      setIsButtonLoading(false);
      onClose();
      toast({
        position: "top",
        title: "Successfully created Raffle! 🎉",
        status: "success",
        isClosable: true,
        duration: 3500,
      });
      emitter.emit("Owned success");
    }
  }, [isSuccessRaffle]);

  const handleRaffleCreation = async (event: any) => {
    event.preventDefault();

    if (isSuccessFactory) {
      if (isSuccessApprove) {
        callRaffleStarted();
      } else {
        callNFTApprove();
      }
    } else {
      const entryPrice = parseFloat(entryPriceValue) * 10 ** 18;
      const factoryTx = prepareContractCall({
        contract: factoryContract,
        method:
          "function createRaffle(uint256 _entryCost, uint256 _maxEntries) returns (address)",
        params: [BigInt(entryPrice), BigInt(maxEntriesValue)],
      });
      sendFactoryTx(factoryTx);
    }
  };

  const handleMaxEntriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxEntriesValue(event.target.value);
  };

  const handleEntryPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntryPriceValue(event.target.value);
  };

  const isValidPositiveNumber = (value: string) => {
    const numberValue = parseFloat(value);
    return numberValue > 0 && !isNaN(numberValue);
  };

  const isCreateButtonDisabled =
    !isValidPositiveNumber(maxEntriesValue) ||
    !isValidPositiveNumber(entryPriceValue);

  return (
    <>
      <Button
        bg={"RGBA(0, 0, 0, 0.92)"}
        _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
        color={"white"}
        onClick={onOpen}
        w={"100%"}
      >
        Create Raffle
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Raffle</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Entry Price (ETH)</FormLabel>
              <Input
                placeholder="0 ETH"
                type="number"
                value={entryPriceValue}
                onChange={handleEntryPriceChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Maximum Entries</FormLabel>
              <Input
                placeholder="0"
                type="number"
                value={maxEntriesValue}
                onChange={handleMaxEntriesChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={'none'}
              _hover={{ bg: "beige" }}
              color={"RGBA(0, 0, 0, 0.92)"}
              onClick={onClose}
              type="button"
              isDisabled={
                isPendingFactory ||
                isButtonLoading ||
                isPendingApprove ||
                isPendingRaffle
              }
            >
              Cancel
            </Button>
            <Button
              bg={"RGBA(0, 0, 0, 0.92)"}
              _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
              color={"white"}
              ml={3}
              onClick={handleRaffleCreation}
              isDisabled={isCreateButtonDisabled}
              isLoading={
                isPendingFactory ||
                isButtonLoading ||
                isPendingApprove ||
                isPendingRaffle
              }
              type="button"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNFTRaffleButton;
