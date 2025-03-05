import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { getContract, prepareContractCall, resolveMethod } from "thirdweb";
import { optimismSepolia } from "thirdweb/chains";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import client from "../client";
import { parseEther } from "ethers";

const ChangeTicketPrice: React.FC<{ raffleAddress: string }> = ({
  raffleAddress,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newTicketPrice, setNewTicketPrice] = useState<string>("");
  const [isValidPrice, setIsValidPrice] = useState<boolean>(false);

  const {
    mutate: sendChangeCostTx,
    isPending: isPendingChangeCost,
    isError: isErrorChangeCost,
    isSuccess: isSuccessChangeCost,
    failureReason: failureReasonChangeCost,
  } = useSendAndConfirmTransaction();

  const handleChangePrice = () => {
    const ticketPrice = parseFloat(newTicketPrice);
    if (ticketPrice <= 0) {
      toast({
        position: "top",
        title: "Please enter a valid ticket price greater than 0",
        status: "error",
        isClosable: true,
        duration: 3500,
      });
      return;
    }

    const raffleContract = getContract({
      client,
      chain: optimismSepolia,
      address: raffleAddress ?? "",
    });
    const changeCostTransaction = prepareContractCall({
      contract: raffleContract,
      method: resolveMethod("changeEntryCost"),
      params: [parseEther(ticketPrice.toString())],
    });
    sendChangeCostTx(changeCostTransaction);
  };

  useEffect(() => {
    if (isErrorChangeCost) {
      toast({
        position: "top",
        title: `Error: ${failureReasonChangeCost?.message.toString()}`,
        status: "error",
        isClosable: true,
        duration: 3500,
      });
    }
  }, [isErrorChangeCost]);

  useEffect(() => {
    if (isSuccessChangeCost) {
      toast({
        position: "top",
        title: "Successfully Changed Ticket Price! 🎉",
        status: "success",
        isClosable: true,
        duration: 3500,
      });
      onClose(); // Close the modal on success
    }
  }, [isSuccessChangeCost]);

  useEffect(() => {
    const price = parseFloat(newTicketPrice);
    setIsValidPrice(!isNaN(price) && price > 0);
  }, [newTicketPrice]);

  return (
    <>
      <Button onClick={onOpen} variant="nav" isLoading={isPendingChangeCost}>
        <Text mr={"1rem"}>Change Ticket Price</Text>
        <MdEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Ticket Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ticket Price (ETH)</FormLabel>
              <Input
                type="number"
                placeholder="New Ticket Price"
                value={newTicketPrice}
                onChange={(e) => setNewTicketPrice(e.target.value)}
                min={0}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              isDisabled={isPendingChangeCost}
              variant={"nav"}
            >
              Cancel
            </Button>
            <Button
              bg={"RGBA(0, 0, 0, 0.92)"}
              _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
              color={"white"}
              onClick={handleChangePrice}
              isDisabled={isPendingChangeCost || !isValidPrice}
              isLoading={isPendingChangeCost}
            >
              Change Price
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeTicketPrice;
