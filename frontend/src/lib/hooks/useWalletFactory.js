import {
  WALLET_FACTORY_ADDRESS,
  WALLET_FACTORY_ABI,
} from "../../contracts/WaletFactory";

import { useContract, useProvider, useSigner } from "wagmi";

import { utils, Wallet, Provider, EIP712Signer, types } from "zksync-web3";

// import ethers
import { ethers } from "ethers";

const useWalletFactory = () => {
  const { data: signer, isError, isLoading } = useSigner();

  const provider = useProvider();
  const aaFactory = useContract({
    address: WALLET_FACTORY_ADDRESS,
    abi: WALLET_FACTORY_ABI,
    signerOrProvider: signer || provider,
  });

  // generate random signer
  const humaPool = ethers.Wallet.createRandom().connect(provider);

  const salt = ethers.constants.HashZero;

  const createWallet = async () => {
    const owner1address = await signer.getAddress();

    console.log("Creating wallet");
    console.log("Owner1 address: " + owner1address);
    console.log("HumaPool address: " + humaPool.address);
    console.log("Salt: " + salt);

    // log typeofs
    console.log("Type of owner1: " + typeof owner1address);
    console.log("Type of humaPool: " + typeof humaPool.address);
    console.log("Type of salt: " + typeof salt);
    const tx = await aaFactory.deployAccount(
      salt,
      owner1address,
      humaPool.address
    );
    await tx.wait();
    console.log("Bytecodehash: " + (await aaFactory.aaBytecodeHash()));
    const abiCoder = new ethers.utils.AbiCoder();
    const multisigAddress = utils.create2Address(
      WALLET_FACTORY_ADDRESS,
      await aaFactory.aaBytecodeHash(),
      salt,
      abiCoder.encode(
        ["address", "address"],
        [owner1address, humaPool.address]
      )
    );
    console.log(`AA deployed on address ${multisigAddress}`);
    console.log(`Owner1 address: ${owner1address}`);
    console.log(`HumaPool address: ${humaPool.address}`);
    // print the balance of the SimpleAA
    const balance = await provider.getBalance(multisigAddress);
    console.log(`Balance of the AA: ${balance}`);
    // await contract.createWallet();
    // const address = await signer.getAddress();
    const smartContractWalletAddress = await aaFactory.wallets(owner1address);
    // console.log("SASD", smartContractWalletAddress);
    console.log("SASD", smartContractWalletAddress);
    return smartContractWalletAddress;
  };

  const getCreditWalletAddress = async () => {
    const address = await signer.getAddress();
    const smartContractWalletAddress = await aaFactory.wallets(address);
    return smartContractWalletAddress;
  };

  return { createWallet, getCreditWalletAddress };
};

export default useWalletFactory;
