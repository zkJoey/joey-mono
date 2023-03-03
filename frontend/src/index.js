import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Layout from './components/Layout';
import { ethers } from 'ethers';

// pages
import Home from './pages/Home';
import Pay from './components/Pay';
import DeployCreditWallet from './pages/DeployCreditWallet';
import CreditLine from './pages/CreditLine';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Web3Modal
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from '@web3modal/react'

import { Link, useLocation } from 'react-router-dom';
import PayPage from './pages/PayPage';

// import {getCreditWalletAddress} from './utils/utils'


// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_PROJECT_ID env variable')
}
const projectId = process.env.REACT_APP_PROJECT_ID

const localhost = {
  id: 31337,
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
}

const chains = [arbitrum, mainnet, polygon, localhost];

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
  const [creditWalletAddress , setCreditWalletAddress] = useState(null);
  const [creditStatus, setCreditStatus] = useState(null);
  useEffect(() => {
    
    const getCreditWalletAddress = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "wallets",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abi, signer);
      const creditWalletAddress = await contract.wallets(address);
      console.log("SASD", creditWalletAddress);
      if(creditWalletAddress != 0x00)
        setCreditWalletAddress(creditWalletAddress);
    }
    getCreditWalletAddress();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
    <React.StrictMode>
    <Router>
      <Layout creditWalletAddress={creditWalletAddress}>
        <Routes>
          <Route path="/" element={<DeployCreditWallet setCreditWalletAddress={setCreditWalletAddress}/>}></Route>
          <Route path="/credit-line" element={<CreditLine creditWalletAddress={creditWalletAddress} setCreditStatus={setCreditStatus} />}></Route>
          <Route path="/pay" element={<PayPage creditStatus={creditStatus} creditWalletAddress={creditWalletAddress}  />}></Route>
        </Routes>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Layout>
    </Router>
  </React.StrictMode>
  </WagmiConfig>
  );
}  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
