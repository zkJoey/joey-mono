import {
  WALLET_FACTORY_ADDRESS,
  WALLET_FACTORY_ABI,
} from "../../contracts/WaletFactory";

import { useContract, useProvider, useSigner } from "wagmi";

const useWalletFactory = () => {
  const { data: signer, isError, isLoading } = useSigner()




  const provider = useProvider();
  const contract = useContract({
    address: WALLET_FACTORY_ADDRESS,
    abi: WALLET_FACTORY_ABI,
    signerOrProvider: signer || provider,
  });

  const createWallet = async () => {
    await contract.createWallet();
    const address = await signer.getAddress();
    const smartContractWalletAddress = await contract.wallets(address);
    return smartContractWalletAddress;
  };

  const getCreditWalletAddress = async () => {
    const address = await signer.getAddress();
    const smartContractWalletAddress = await contract.wallets(address);
    return smartContractWalletAddress;
  }

  return { createWallet, getCreditWalletAddress};
};

export default useWalletFactory;
