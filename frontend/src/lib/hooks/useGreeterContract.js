import { GREETER_ADDRESS, GREETER_ABI } from "../../contracts/GreeterContract";

import { useContract, useProvider, useSigner } from "wagmi";

import { utils, Wallet, Provider, EIP712Signer, types } from "zksync-web3";
// import {
//     utils,
//     Wallet,
//     Provider,
//     Contract,
//     EIP712Signer,
//     types,
//   } from "zksync-web3";
  
// import ethers
import { ethers } from "ethers";

const useGreeterContract = ({creditWalletAddress}) => {
  const { data: signer, isError, isLoading } = useSigner();

  const provider = Provider.getDefaultProvider();
  const greeterContract = useContract({
    address: GREETER_ADDRESS,
    abi: GREETER_ABI,
    signerOrProvider: signer || provider,
  });

  // generate random signer
  const humaPool = ethers.Wallet.createRandom().connect(provider);

  const salt = ethers.constants.HashZero;

  const changeGreeting = async () => {
    let aaTx = await greeterContract.populateTransaction.setGreeting(
        "asfdgfh"
      );
      console.log("Populated greet transaction:", aaTx);
      const gasLimit = await provider.estimateGas(aaTx);
      const gasPrice = await provider.getGasPrice();
      console.log("gasLimit", gasLimit);
        console.log("gasPrice", gasPrice);

      aaTx = {
        ...aaTx,
        from: creditWalletAddress,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        chainId: (await provider.getNetwork()).chainId,
        nonce: await provider.getTransactionCount(creditWalletAddress),
        type: 113,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
        value: ethers.BigNumber.from(0),
      };
      console.log("aaTx", aaTx);
      console.log("EIP712Signer", EIP712Signer);
      console.log("EIP712Signer.getSignedDigest", EIP712Signer.getSignedDigest);
      console.log("EIP712Signer.getSignedDigest(aaTx)", EIP712Signer.getSignedDigest(aaTx));
      const signedTxHash = EIP712Signer.getSignedDigest(aaTx);

      // open metamask to sign signedTxHash
      console.log("signing with metamask");
      console.log("signedTxHash", signedTxHash);
        const signature2 = await signer.signMessage(signedTxHash);


      const signature = ethers.utils.concat([
        // Note, that `signMessage` wouldn't work here, since we don't want
        // the signed hash to be prefixed with `\x19Ethereum Signed Message:\n`
        ethers.utils.joinSignature(signature2),
      ]);
    
      aaTx.customData = {
        ...aaTx.customData,
        customSignature: signature,
      };
    
      const sentTx = await provider.sendTransaction(utils.serialize(aaTx));
      await sentTx.wait();
    
      console.log(await greeterContract.greet());
    
    
    
  };

  const getGreeting = async () => {
    const greeting = await greeterContract.greet();
    return greeting;
  };

  return { getGreeting, changeGreeting };
};

export default useGreeterContract;
