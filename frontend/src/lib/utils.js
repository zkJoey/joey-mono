import { ethers } from 'ethers';


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
    return smartContractWalletAddress;
    // if(smartContractWalletAddress != 0x00)
    //   setSmartContractWalletAddress(smartContractWalletAddress);
  }
export { getSmartContractWalletAddress };
