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
      <h1 className="text-2xl font-bold">Start Here</h1>
      <p className="text-lg font-medium text-gray-700">
        Deploy your smart contract wallet to get started.
      </p>
      <Button type="button" variant='primary' onClick={handleCreateWallet}>Deploy</Button>
    </Container>
  );
};

export default DeployCreditWallet;
