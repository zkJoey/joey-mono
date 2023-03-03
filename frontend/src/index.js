import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Layout from './components/Layout';
import { ethers } from 'ethers';

// pages
import Home from './pages/Home';
import DeployAA from './pages/DeployAA';
import CreditLine from './pages/CreditLine';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import MyWalletButton from './components/MyWalletButton'

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

// import {getSmartContractWalletAddress} from './utils/utils'


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


const routes = {
  'Home': '/',
  'Credit Line': '/credit-line',
  'Exchange': '/exchange',
}

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [smartContractWalletAddress, setSmartContractWalletAddress] = useState(null);
  const location = useLocation();

  useEffect(() => {
    
    const getSmartContractWalletAddress = async () => {
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
      const smartContractWalletAddress = await contract.wallets(address);
      console.log("SASD", smartContractWalletAddress);
      if(smartContractWalletAddress != 0x00)
        setSmartContractWalletAddress(smartContractWalletAddress);
    }
    getSmartContractWalletAddress();
  }, []);

  const NavItem = ({ name, route }) => {
    return (<li>
      <Link
        to={route}
        className={
          location.pathname === {route}
            ? 'block py-2 pr-4 pl-3 md:p-0'
            : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
        }
        onClick={() => {
          setIsNavExpanded(false);
        }}
      >
        {name}
      </Link>
    </li>);
    };

  return (
    <header className={isNavExpanded ? 'menu-open pb-40' : 'pb-40'}>
      <nav className="border-gray-200 px-2 sm:px-4 py-2.5 primary-menu left-0 rigt-0 z-20 fixed w-full bg-white border-b">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              setIsNavExpanded(false);
            }}
          >
            {/* <img src="https://chainway.xyz/img/favicon.jpg" alt="Boilerplate" width="30" height="60" className="mr-4" /> */}
            <span className="self-center text-xl font-bold whitespace-nowrap">
            Joey Finance
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="svg-trigger" viewBox="0 0 100 100">
              <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
              <path d="m 30,50 h 40"></path>
              <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 items-center">
              {Object.keys(routes).map((name) => (
                <NavItem key={name} name={name} route={routes[name]} />
              ))}
              <li>
              <Web3Button />
              <Web3NetworkSwitch />
              {smartContractWalletAddress && <MyWalletButton address={smartContractWalletAddress} />}
              
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
  <React.StrictMode>
  <Router>
    <Layout>

      <Header />
      <Routes>
        <Route path="/" element={<DeployAA />}></Route>
        <Route path="/credit-line" element={<CreditLine />}></Route>
      </Routes>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Layout>
  </Router>
</React.StrictMode>
</WagmiConfig>
);
