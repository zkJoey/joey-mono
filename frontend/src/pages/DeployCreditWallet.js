import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';


import useWalletFactory from '../lib/hooks/useWalletFactory';
import Button from '../components/ui/Button';

const DeployCreditWallet = ({
  setCreditWalletAddress
}) => {

  const { createWallet } = useWalletFactory();
  
  const handleCreateWallet = async () => {
    const address = await createWallet();
    console.log("address: " + address)
    setCreditWalletAddress(address);
  }


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
        <Button type="button" onClick={handleCreateWallet}>Deploy Your Smart Contract Wallet</Button>
        {/* <button onClick={handleCreateWallet} className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Deploy Your Smart Contract Wallet
        </button> */}
      </div>
    </>
  );
};

export default DeployCreditWallet;
