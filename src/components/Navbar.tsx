import { Flex, Button, HStack, chakra, Heading } from "@chakra-ui/react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@fontsource/dela-gothic-one/greek.css";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import client from "../client";
import { Link } from "react-router-dom";
import {
	base,
	baseSepolia,
	ethereum,
	optimism,
	optimismSepolia,
	sepolia,
} from "thirdweb/chains";

const wallets = [
	createWallet("io.metamask"),
	createWallet("com.coinbase.wallet"),
	walletConnect(),
	createWallet("com.trustwallet.app"),
	createWallet("me.rainbow"),
	createWallet("app.phantom"),
];

const Navbar: React.FC = () => {
	const activeAccount = useActiveAccount();

  // useEffect(() => {
  //   const walletButton = document.querySelector(".walletConnectButton");
  //   if (walletButton) {
  //     const imageDiv = walletButton.getElementsByTagName('div')[0]
  //     // console.log(imageDiv.style.backgroundImage)
  //     // imageDiv.style.backgroundImage = 'url("https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg")'
  //     // imageDiv.style.backgroundSize = 'cover'
  //     // imageDiv.style.backgroundPosition = 'center'
  //     // imageDiv.style.backgroundRepeat = 'no-repeat'
  //   }
  // }, [])

	return (
		<chakra.header id="header">
			<Flex
				w="100%"
				py="5"
				align="center"
				justify="space-between"
				backgroundColor={"#FBF9F2"}
			>
				<HStack spacing="3">
					<Link to="/">
						<Button variant={"nav"} p="0">
							<Heading
								// sx={{ borderRight: "1px solid #718096", paddingRight: "20px" }}
								as={"h2"}
							>
								Xaffle.
							</Heading>
						</Button>
					</Link>
					{/* <Link to={"/explore"}>
						<Button variant="nav">Eplore</Button>
					</Link>
					<Link to={"/collections"}>
						<Button variant="nav">Collections</Button>
					</Link> */}
				</HStack>

				<Flex>
					{activeAccount?.address && (
						<>
							{/* <Link to={"/activity"} style={{ alignSelf: "center" }}>
								<Button variant="nav">Activity</Button>
							</Link> */}
							<Link to="/account" style={{ alignSelf: "center" }}>
								<Button mr="20px" variant={"nav"}>
									Account
								</Button>
							</Link>
						</>
					)}
					{/* https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg */}
					<ConnectButton
						theme={"dark"}
						client={client}
						wallets={wallets}
						chain={optimismSepolia}
						connectModal={{
							size: "wide",
							titleIcon: "",
							showThirdwebBranding: false,
							title: "Connect Wallet",
						}}
						detailsButton={{
							className: "walletConnectButton",
						}}
						detailsModal={{
							showTestnetFaucet: true,
							networkSelector: {
								sections: [
									{
										label: "Testnet",
										chains: [optimismSepolia, sepolia, baseSepolia],
									},
									{ label: "Mainnet", chains: [optimism, ethereum, base] },
								],
							},
						}}
					/>
				</Flex>
			</Flex>
		</chakra.header>
	);
};

export default Navbar;
