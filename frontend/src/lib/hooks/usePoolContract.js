import { useEffect, useState } from "react";
import { useContract, useProvider, useSigner } from "wagmi";

import {
  BASE_CREDIT_POOL_ADDRESS,
  BASE_CREDIT_POOL_ABI,
} from "../../contracts/PoolContract";

import { WALLET_ABI } from "../../contracts/Wallet";

const usePoolContract = ( creditWalletAddress ) => {
  const { data: signer, isError, isLoading } = useSigner();

  const provider = useProvider();
  const contract = useContract({
    address: BASE_CREDIT_POOL_ADDRESS,
    abi: BASE_CREDIT_POOL_ABI,
    signerOrProvider: signer || provider,
  });
  console.log("creditWalletAddress", creditWalletAddress);
  const walletContract = useContract({
    address: creditWalletAddress,
    abi: WALLET_ABI,
    signerOrProvider: signer || provider,
  });

  // useEffect (() => {
  //     const getWalletContract = async () => {
  //         setWalletContract(walletContract);
  //     }
  //     getWalletContract();
  // }, [creditWalletAddress]);

  const callDrawdown = async (
    receiver,
    borrowAmount
  ) => {
    console.log("BASE_CREDIT_POOL_ADDRESS", BASE_CREDIT_POOL_ADDRESS);
    console.log("BASE_CREDIT_POOL_ABI", BASE_CREDIT_POOL_ABI);
    console.log("WALLET_ABI", WALLET_ABI);
    console.log("creditWalletAddress", creditWalletAddress);


    console.log("callDrawdown", { borrowAmount, receiver });
    // creates a transaction data then sends it to the wallet contract
    const tx = await contract.populateTransaction['drawdown'](
      borrowAmount,
      receiver,
    );
    console.log("tx", tx);
    console.log("walletContract", walletContract);
    const response = await walletContract.invoke(BASE_CREDIT_POOL_ADDRESS, 0, tx.data);
    console.log("response", response);
    // // sends the transaction data to the pool contract
    // const tx2 = await contract.populateTransaction.callWallet(
    //   creditWalletAddress,
    //   tx.data,
    // );

    };

  const getCreditRecordMapping = async () => {
    const creditRecordMapping = await contract.creditRecordMapping(creditWalletAddress);
    return creditRecordMapping;
  };

  return { callDrawdown, getCreditRecordMapping };
};

export default usePoolContract;
