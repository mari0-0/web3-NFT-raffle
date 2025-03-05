import {
  Stack,
  Heading,
  Container,
  Grid,
  GridItem,
  Image,
  Center,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import heroNft1 from "../assets/images/hero-nft1.png";
import heroNft2 from "../assets/images/hero-nft2.png";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Hero: React.FC = () => {
  return (
    <>
      {/* HEADING */}
      <Stack paddingTop={"6rem"}>
        <Heading size={"4xl"} letterSpacing={"5px"}>
          COLLECT &nbsp; & &nbsp; RAFFLE
        </Heading>
        <Heading pt={"1rem"} size={"4xl"} letterSpacing={"5px"}>
          YOUR &nbsp; FAVOURITE &nbsp; NFT'S
        </Heading>
      </Stack>
      {/* HERO GRID 1 */}
      <Grid templateColumns="repeat(3, 1fr)" gap={10} pt={"7rem"}>
        <GridItem
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Center fontWeight={"600"} fontSize={"1.2rem"} lineHeight={"2.6rem"}>
            Discover diverse NFT collections, from pixel art classics to
            avant-garde marvels. Something for every digital art enthusiast.
          </Center>
          <Center pt={"1.7rem"}>
            <HStack
              pr={"1rem"}
              pl="3rem"
              py={"0.75rem"}
              border={"1px solid black"}
              borderRadius={"full"}
            >
              <Text fontWeight={"500"} fontSize={"1.2rem"}>
                Explore Active Raffles
              </Text>
              <Button
                px="2rem"
                py={"3rem"}
                borderRadius={"full"}
                backgroundColor={"#FFDEAE"}
              >
                <ChevronRightIcon fontSize="2rem" />
              </Button>
            </HStack>
          </Center>
        </GridItem>
        <GridItem w={"100%"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Image src={heroNft1} height={'70%'} className="hero-nft1" alt="Hero NFT 1" />
        </GridItem>
        <GridItem w={"100%"}>
          <Grid
            h="100%"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          >
            <GridItem
              colSpan={2}
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading>5K +</Heading>
              <Center>
                <Container fontWeight={"700"} fontSize={"1.4rem"}>
                  Collections
                </Container>
              </Center>
            </GridItem>
            <GridItem
              colSpan={2}
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Heading>1K +</Heading>
              <Center>
                <Container fontWeight={"700"} fontSize={"1.4rem"}>
                  Raffles
                </Container>
              </Center>
            </GridItem>
            <GridItem colSpan={4}>
              <Center>
                <HStack
                  pr={"1rem"}
                  pl="3rem"
                  py={"0.75rem"}
                  border={"1px solid black"}
                  borderRadius={"full"}
                >
                  <Text fontWeight={"500"} fontSize={"1.2rem"}>
                    Explore Collections
                  </Text>
                  <Button
                    px="2rem"
                    py={"3rem"}
                    borderRadius={"full"}
                    backgroundColor={"#FFDEAE"}
                  >
                    <ChevronRightIcon fontSize="2rem" />
                  </Button>
                </HStack>
              </Center>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      {/* POPLUAR RAFFLE */}
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={3} colSpan={2}>
          <Image height={"600px"} src={heroNft2} borderRadius={"70px"} />
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={2}
          display={"flex"}
          alignItems={"start"}
          flexDirection="column"
          justifyContent={"end"}
          mb={"5rem"}
        >
          <Heading fontSize={"1.7rem"} fontWeight={"500"}>
            Total Tickets
          </Heading>
          <Heading
            mt={"3rem"}
            fontSize={"2.4rem"}
            fontWeight={"400"}
            letterSpacing={"3px"}
          >
            6.40 ETH
          </Heading>
          <Text
            mt={"1rem"}
            fontSize={"1.3rem"}
            fontWeight={"700"}
            letterSpacing={"3px"}
          >
            $5430.50
          </Text>
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={2}
          display={"flex"}
          alignItems={"start"}
          flexDirection="column"
          justifyContent={"end"}
        >
          <Heading fontSize={"1.7rem"} fontWeight={"500"} ml={"20px"}>
            Raffle In
          </Heading>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            mt={"1rem"}
          >
            <GridItem
              padding={"1rem"}
              bg={"#FEC7C7"}
              m={"20px"}
              fontWeight={800}
              fontSize={"1.3rem"}
            >
              10
            </GridItem>
            <GridItem
              padding={"1rem"}
              bg={"#FEC7C7"}
              m={"20px"}
              fontWeight={800}
              fontSize={"1.3rem"}
            >
              20
            </GridItem>
            <GridItem
              padding={"1rem"}
              bg={"#FEC7C7"}
              m={"20px"}
              fontWeight={800}
              fontSize={"1.3rem"}
            >
              10
            </GridItem>
            <GridItem fontWeight={300}>
              <Center>Hours</Center>
            </GridItem>
            <GridItem fontWeight={300}>
              <Center>Minutes</Center>
            </GridItem>
            <GridItem fontWeight={300}>
              <Center>Seconds</Center>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          borderTop={"1px solid black"}
          pt={"2rem"}
        >
          <HStack>
            <Image src={heroNft1} height={"100px"} borderRadius={"full"} />
            <Heading ml={"2rem"}>@Mari0</Heading>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Hero;
