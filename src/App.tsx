import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";




const App: React.FC = () => {

  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* <Hero /> */}
      {/* {activeNavTab === "Account" && <AccountSection/>} */}
    </>
  );
};

export default App;
