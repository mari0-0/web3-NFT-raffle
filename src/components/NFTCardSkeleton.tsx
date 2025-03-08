import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  activeTab: "Owned" | "Active" | "Completed";
}

const NFTCardSkeleton: React.FC<Props> = ({ activeTab }) => {
  return (
    <Card mb={"2rem"} mx={"1rem"} maxW="md" variant={"outline"} bg={"#FFFFF0"} borderRadius={'2xl'}>
      <CardHeader>
        <Center height="350px">
          <Skeleton h={'300px'} w={'300px'} borderRadius={'xl'}>
            This is image
          </Skeleton>
        </Center>
      </CardHeader>
      <CardBody p={0}>
        <Stack spacing="3" p={"1rem"}>
          <Skeleton w={"30%"}>
            <Heading size="md">#1</Heading>
          </Skeleton>
          <Skeleton w={"70%"}>
            <Text letterSpacing="2px">0x00000</Text>
          </Skeleton>
        </Stack>
      </CardBody>
      <CardFooter w={"100%"}>
        {activeTab === "Owned" && (
          <Skeleton w={"100%"}>
            <Button>Create Raffle</Button>
          </Skeleton>
        )}
        {activeTab === "Active" && (
          <>
            <Skeleton mr={2}>
              <Button>Cancel Raffle</Button>
            </Skeleton>
            <Skeleton mr={2} w={"100%"}>
              <Button>View</Button>
            </Skeleton>
          </>
        )}
        {activeTab === "Completed" && (
          <Skeleton w={"100%"}>
            <Button>Completed</Button>
          </Skeleton>
        )}
      </CardFooter>
    </Card>
  );
};

export default NFTCardSkeleton;
