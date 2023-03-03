import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';


import useWalletFactory from '../lib/hooks/useWalletFactory';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

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
    <Container>
      <h1 className="text-2xl font-bold">Deploy your credit wallet</h1>
      <p className="text-lg font-medium text-gray-700">
        A smart contract can make credit lines more secure by automating the lending and repayment process, and ensuring that funds are only released when specific conditions are met.
      </p>
      <Button type="button" variant='primary' onClick={handleCreateWallet}>Deploy Your Smart Contract Wallet</Button>
    </Container>
  );
};

export default DeployCreditWallet;
