
import React from "react";

import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi'


const createWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const abi = 
    [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            }
          ],
          "name": "NewWallet",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "createWallet",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
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
    // makes createWallet function call to 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf
    const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abi, signer);
    const tx = await contract.createWallet();
    const rc = await tx.wait();
    const event = rc.events.find(event => event.event === 'NewWallet');
    console.log(event);
    console.log(event.args[0]);
    console.log(address);


    const x = await contract.wallets(address);
    console.log(x);
}



const DeployAA = () => {
  return (
    <>
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Start your Credit Line
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-medium text-gray-700">
          A smart contract can make credit lines more secure by automating the
          lending and repayment process, and ensuring that funds are only
          released when specific conditions are met.
        </p>
        <button onClick={createWallet} className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Deploy Your Smart Contract Wallet
        </button>
      </div>
    </>
  );
};

export default DeployAA;
