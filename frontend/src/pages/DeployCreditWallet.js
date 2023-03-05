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
  const [isDeploying, setIsDeploying] = useState(false);
  
  const handleCreateWallet = async () => {
    setIsDeploying(true);
    console.log("handleCreateWallet");
    const address = await createWallet();
    console.log("address: " + address)
    setCreditWalletAddress(address);
    setIsDeploying(false);
    // go to credit line page
    window.location.href = "/credit-optns";
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold">Start Here</h1>
      <p className="text-lg font-medium text-gray-700">
        Deploy your account abstraction wallet to get started.
      </p>
      <Button type="button" variant='primary' loading={isDeploying} onClick={handleCreateWallet}>Deploy</Button>
    </Container>
  );
};

export default DeployCreditWallet;
