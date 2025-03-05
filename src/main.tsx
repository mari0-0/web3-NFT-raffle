import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { ThirdwebProvider } from "thirdweb/react";
import AccountSection from "./components/AccountSection.tsx";
import Hero from "./components/Hero.tsx";
import NFTDetails from "./components/NFTDetails.tsx";
import Explore from "./components/explore/Explore.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Hero/>
      },
      {
        path: "/account",
        element: <AccountSection/>
      },
      {
        path: "/details/:nftAddress/:tokenId",
        element: <NFTDetails/>
      },
      {
        path: "/explore",
        element: <Explore />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ThirdwebProvider>
        {/* <App /> */}
        <RouterProvider router={router} />
      </ThirdwebProvider>
    </ChakraProvider>
  </React.StrictMode>
);
