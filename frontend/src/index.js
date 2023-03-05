import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Layout from "./components/Layout";
import { ethers } from "ethers";

// pages
import Home from "./pages/Home";
import Pay from "./components/Pay";
import CreditInfoPage from "./pages/CreditInfoPage";
import DeployCreditWallet from "./pages/DeployCreditWallet";
import CreditLine from "./pages/CreditLine";
import CreditOptns from "./pages/CreditOptns"
import CollateralPage from "./pages/CollateralPage"
import MultisigPage from "./pages/MultisigPage"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Web3Modal
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";

import { Link, useLocation } from "react-router-dom";
import PayPage from "./pages/PayPage";
import { zkSync_localhost } from "./lib/chains";

import { WALLET_FACTORY_ADDRESS } from "./contracts/WaletFactory";
import LoadingFullpage from "./components/ui/LoadingFullpage";
import AddVendor from "./components/AddVendor";
import DummyGreeter from "./pages/DummyGreeter";

// import {getCreditWalletAddress} from './utils/utils'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable");
}
const projectId = process.env.REACT_APP_PROJECT_ID;

const chains = [zkSync_localhost];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: projectId,
    version: "1", // or "2"
    appName: "Joey Finance",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
  const [creditWalletAddress, setCreditWalletAddress] = useState(null);
  const [creditStatus, setCreditStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCreditWalletAddress = async () => {
      setIsLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const abi = [
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "wallets",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ];
        const contract = new ethers.Contract(
          WALLET_FACTORY_ADDRESS,
          abi,
          signer
        );
        const creditWalletAddress = await contract.wallets(address);
        console.log("SASD", creditWalletAddress);
        if (creditWalletAddress != 0x00)
          setCreditWalletAddress(creditWalletAddress);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    getCreditWalletAddress();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <React.StrictMode>
        <Router>
          <LoadingFullpage isLoading={isLoading} />
          <Layout creditWalletAddress={creditWalletAddress}>
            <Routes>
              <Route
                path="/"
                element={
                  <DeployCreditWallet
                    setCreditWalletAddress={setCreditWalletAddress}
                  />
                }
              ></Route>
              <Route
                path="/credit-line"
                element={
                  <CreditLine
                    creditWalletAddress={creditWalletAddress}
                    setCreditStatus={setCreditStatus}
                  />
                }
              ></Route>
               <Route
                path="/credit-optns"
                element={
                  <CreditOptns
                  />
                }
              ></Route>
               <Route
                path="/collateral"
                element={
                  <CollateralPage
                  />
                }
              ></Route>
              <Route
                path="/pay"
                element={
                  <PayPage
                    creditStatus={creditStatus}
                    creditWalletAddress={creditWalletAddress}
                  />
                }
              ></Route>
              <Route
                path="/pay/:vendorAddress"
                element={
                  <PayPage
                    creditStatus={creditStatus}
                    creditWalletAddress={creditWalletAddress}
                  />
                }
              ></Route>
              <Route
                path="/credit-info"
                element={
                  <CreditInfoPage
                    creditStatus={creditStatus}
                    creditWalletAddress={creditWalletAddress}
                  />
                }
              ></Route>
              <Route path="/add-vendor" element={<AddVendor />}></Route>

              <Route path="/greeting" element={<DummyGreeter />}></Route>

              <Route path="/multisig" element={<MultisigPage />} />
            </Routes>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          </Layout>
        </Router>
      </React.StrictMode>
    </WagmiConfig>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
