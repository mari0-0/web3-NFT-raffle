import React from "react";
import {
  HStack,
  Image,
  Heading,
  Stack,
  Progress,
  Text,
  Box,
  Input,
  IconButton,
  Button,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { IoTicketOutline } from "react-icons/io5";
import profilePic from "../assets/images/hero-nft1.png";
import { SiEthereum } from "react-icons/si";

const NFTDetailsSkeleton: React.FC = () => {
  return (
    <HStack my={"3rem"} alignItems={"start"}>
      <Skeleton borderRadius={"20px"}>
        <Image fallbackSrc="https://via.placeholder.com/500" boxSize="md" />
      </Skeleton>
      <Stack
        ml={"2rem"}
        w={"60%"}
        spacing={4}
        alignSelf={"flex-start"}
        justifyContent={"start"}
      >
        <HStack justifyContent={"space-between"}>
          <HStack spacing={4}>
            <Skeleton>
              <Heading fontSize={"xx-large"}>Vikings</Heading>
            </Skeleton>
            <Skeleton>
              <Heading fontSize={"lg"} color={"GrayText"} pt={2}>
                VKNGS
              </Heading>
            </Skeleton>
          </HStack>
        </HStack>
        <Skeleton w={"40%"}>
          <Heading>#1</Heading>
        </Skeleton>
        <HStack mt={"2rem"}>
          <SkeletonCircle mr={"1rem"} size={"60px"} />
          <Stack>
            <Skeleton>
              <Text fontWeight={600}>Owner</Text>
            </Skeleton>
            <Skeleton>
              <Text>0x0000000000000</Text>
            </Skeleton>
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
            <Skeleton w={"80%"}>
              <Text fontSize={"lg"} fontWeight={800}>
                Ticket Price
              </Text>
            </Skeleton>
            <HStack>
              <Skeleton>
                <Text fontSize={"lg"} fontWeight={600}>
                  0.00001
                </Text>
              </Skeleton>
            </HStack>
          </Stack>
          <Stack w={"50%"}>
            <Skeleton w={'50%'}>
              <Text fontSize={"lg"} fontWeight={600}>
                Tickets
              </Text>
            </Skeleton>
            <HStack>
              <Skeleton w={"90%"}>
                <Text fontWeight={600} fontSize={"sm"} alignSelf={"end"}>
                  11 / 1000
                </Text>
              </Skeleton>
            </HStack>
          </Stack>
        </HStack>

        <Stack
          px={"2rem"}
          py={"1.5rem"}
          border={"1px solid"}
          borderColor={"gray.300"}
          borderRadius={"3xl"}
        >
          <HStack justifyContent={"space-between"}>
            <Skeleton>
              <Text fontWeight={600} fontSize={"xl"}>
                Buy Tickets
              </Text>
            </Skeleton>
            <Skeleton>
              <Text
                alignSelf={"center"}
                fontWeight={200}
                fontSize={"md"}
                color={"gray.500"}
              >
                1 Ticket = 10 USD
              </Text>
            </Skeleton>
          </HStack>
          <HStack mt="1rem" justifyContent={"space-between"}>
            <Box display="flex" alignItems="center" position="relative">
              <Skeleton>
                <Input
                  pl={"3rem"}
                  border="none"
                  borderRadius="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  width="100%"
                  fontSize={"3xl"}
                />
              </Skeleton>
            </Box>
            <HStack spacing={"4"}>
              <Skeleton>
                <IconButton
                  aria-label="Decrease"
                  bg={"RGBA(0, 0, 0, 0.92)"}
                  _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
                  color={"white"}
                />
              </Skeleton>
              <Skeleton>
                <IconButton
                  aria-label="Increase"
                  bg={"RGBA(0, 0, 0, 0.92)"}
                  _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
                  color={"white"}
                />
              </Skeleton>
            </HStack>
          </HStack>
        </Stack>
        <HStack justifyContent={"end"}>
          <Skeleton>
            <Button
              py={"1.5rem"}
              px={"1.2rem"}
              bg={"RGBA(0, 0, 0, 0.92)"}
              _hover={{ bg: "RGBA(0, 0, 0, 0.8)" }}
              color={"white"}
            >
              Enter Now 10 USD
            </Button>
          </Skeleton>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default NFTDetailsSkeleton;
