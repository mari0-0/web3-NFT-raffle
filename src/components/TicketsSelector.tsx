import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
	IconButton,
	Input,
	useNumberInput,
	Box,
	HStack,
	Stack,
	Text,
	Button,
	useToast,
} from "@chakra-ui/react";
import { IoTicketOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { getContract, prepareContractCall, resolveMethod } from "thirdweb";
import { optimismSepolia } from "thirdweb/chains";
import client from "../client";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { Navigate } from "react-router-dom";

interface Props {
	raffleDetails: {
		raffleAddress: string;
		entryCost: number;
		maxEntries: number;
		totalEntries: number;
		owner: string;
		raffleStatus: boolean;
		winner: string;
		balance: number;
		ticketPrice: number;
	};
}

const TicketsSelector: React.FC<Props> = ({ raffleDetails }) => {
	const activeAccount = useActiveAccount();
	const activeAddress = activeAccount?.address ?? "";

	const [inputValue, setInputValue] = useState(1);
	const {
		mutate: sendBuyTicketsTx,
		isPending: isPendingBuyTickets,
		isError: isErrorBuyTickets,
		isSuccess: isSuccessBuyTickets,
		failureReason: failureReasonBuyTickets,
	} = useSendAndConfirmTransaction();
	const {
		mutate: sendWithdrawTx,
		isPending: isPendingWithdraw,
		isError: isErrorWithdraw,
		isSuccess: isSuccessWithdraw,
		failureReason: failureReasonWithdraw,
	} = useSendAndConfirmTransaction();
	const {
		mutate: sendCancelTx,
		isPending: isPendingCancel,
		isError: isErrorCancel,
		isSuccess: isSuccessCancel,
		failureReason: failureReasonCancel,
	} = useSendAndConfirmTransaction();

	const toast = useToast();

	const availableTickets =
		raffleDetails.maxEntries - raffleDetails.totalEntries;

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 1,
			min: 1,
			max: availableTickets,
			value: inputValue,
			onChange: (valueString) => setInputValue(Number(valueString)),
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	const handleMaxClick = () => {
		setInputValue(availableTickets);
	};

	const getTotalPriceInUSD = () => {
		return parseFloat(
			(raffleDetails.ticketPrice * inputValue).toString()
		).toFixed(1);
	};

	const handleBuyClick = () => {
		const raffleContract = getContract({
			client,
			chain: optimismSepolia,
			address: raffleDetails.raffleAddress,
		});

		const buyTicketsTransaction = prepareContractCall({
			contract: raffleContract,
			method: "function buyEntry(uint256 _numberOfEntries) public payable",
			params: [BigInt(inputValue)],
			value: BigInt(raffleDetails.entryCost * inputValue),
		});

		sendBuyTicketsTx(buyTicketsTransaction);
	};

	const handleWithdrawClick = () => {
		const raffleContract = getContract({
			client,
			chain: optimismSepolia,
			address: raffleDetails.raffleAddress,
		});

		const withdrawTransaction = prepareContractCall({
			contract: raffleContract,
			method: resolveMethod("withdrawBalance"),
			params: [],
		});

		sendWithdrawTx(withdrawTransaction);
	};

	const handleCancelRaffle = () => {
		const raffleContract = getContract({
			client,
			chain: optimismSepolia,
			address: raffleDetails.raffleAddress ?? "",
		});
		const cancelRaffleTransaction = prepareContractCall({
			contract: raffleContract,
			method: "function cancelRaffle()",
			// params: [],
		});
		sendCancelTx(cancelRaffleTransaction);
	};

	useEffect(() => {
		if (isErrorBuyTickets) {
			toast({
				position: "top",
				title: `Error: ${failureReasonBuyTickets?.message.toString()}`,
				status: "error",
				isClosable: true,
				duration: 3500,
			});
		}
		if (isErrorWithdraw) {
			toast({
				position: "top",
				title: `Error: ${failureReasonWithdraw?.message.toString()}`,
				status: "error",
				isClosable: true,
				duration: 3500,
			});
		}
		if (isErrorCancel) {
			console.log(failureReasonCancel?.message.toString());
			toast({
				position: "top",
				title: `Error: ${failureReasonCancel?.message.toString()}`,
				status: "error",
				isClosable: true,
			});
		}
	}, [isErrorBuyTickets, isErrorWithdraw, isErrorCancel]);

	useEffect(() => {
		if (isSuccessBuyTickets) {
			toast({
				position: "top",
				title: "Successfully Bought Tickets! 🎉",
				status: "success",
				isClosable: true,
				duration: 3500,
			});
		}
		if (isSuccessWithdraw) {
			toast({
				position: "top",
				title: "Successfully Withdrawn Amount! 🎉",
				status: "success",
				isClosable: true,
				duration: 3500,
			});
		}
		if (isSuccessCancel) {
			toast({
				position: "top",
				title: "Successfully cancelled Raffle! 🎉",
				status: "success",
				isClosable: true,
				duration: 3500,
			});
			<Navigate to="/account" />;
		}
	}, [isSuccessBuyTickets, isSuccessWithdraw, isSuccessCancel]);

	return (
		<>
			{(activeAddress !== raffleDetails.owner) ? raffleDetails.raffleStatus  && (
				<Stack
					px={"2rem"}
					py={"1.5rem"}
					border={"1px solid"}
					borderColor={"gray.300"}
					borderRadius={"3xl"}
				>
					<HStack justifyContent={"space-between"}>
						<Text fontWeight={600} fontSize={"xl"}>
							Buy Tickets
						</Text>
						<Text
							alignSelf={"center"}
							fontWeight={200}
							fontSize={"md"}
							color={"gray.500"}
						>
							1 Ticket = {raffleDetails.ticketPrice} USD
						</Text>
					</HStack>
					<HStack mt="1rem" justifyContent={"space-between"}>
						<Box display="flex" alignItems="center" position="relative">
							<Input
								{...input}
								pl={"3rem"}
								border="none"
								borderRadius="none"
								_focus={{ border: "none", boxShadow: "none" }}
								width="100%"
								fontSize={"3xl"}
							/>
							<Box position="absolute" left={3}>
								<IoTicketOutline size={"1.7rem"} />
							</Box>
						</Box>
						{/* INC DEC MAX BUTTONS */}
						<HStack spacing={"4"}>
							<IconButton
								{...dec}
								aria-label="Decrease"
								icon={<MinusIcon />}
								bg={"RGBA(0, 0, 0, 0.92)"}
								_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
								color={"white"}
							/>
							<IconButton
								{...inc}
								aria-label="Increase"
								icon={<AddIcon />}
								bg={"RGBA(0, 0, 0, 0.92)"}
								_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
								color={"white"}
							/>
							<Button
								borderRadius={"full"}
								colorScheme="yellow"
								size={"sm"}
								onClick={handleMaxClick}
							>
								Max
							</Button>
						</HStack>
					</HStack>
				</Stack>
			) : ""}
			<HStack justifyContent={"end"}>
				{activeAddress === raffleDetails.owner ? (
					!raffleDetails.raffleStatus ? (
						<>
							<Button
								py={"1.5rem"}
								px={"1.2rem"}
								bg={"RGBA(0, 0, 0, 0.92)"}
								_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
								color={"white"}
								onClick={handleWithdrawClick}
								isLoading={isPendingWithdraw}
							>
								Withdraw Balance
							</Button>
						</>
					) : (
						<>
							<Button
								py={"1.5rem"}
								px={"1.2rem"}
								colorScheme="red"
								onClick={handleCancelRaffle}
								isLoading={isPendingCancel}
							>
								Cancel Raffle
							</Button>
							<Button
								py={"1.5rem"}
								px={"1.2rem"}
								bg={"RGBA(0, 0, 0, 0.92)"}
								_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
								color={"white"}
								isDisabled={true}
							>
								Withdraw Balance
							</Button>
						</>
					)
				) : !raffleDetails.raffleStatus ? (
					<Button
						py={"1.5rem"}
						px={"1.2rem"}
						bg={"RGBA(0, 0, 0, 0.92)"}
						_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
						color={"white"}
						isDisabled={true}
					>
						Raffle Completed
					</Button>
				) : (
					<Button
						py={"1.5rem"}
						px={"1.2rem"}
						bg={"RGBA(0, 0, 0, 0.92)"}
						_hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
						color={"white"}
						onClick={handleBuyClick}
						isLoading={isPendingBuyTickets}
					>
						Enter Now {getTotalPriceInUSD()} USD
					</Button>
				)}
			</HStack>
		</>
	);
};

export default TicketsSelector;
