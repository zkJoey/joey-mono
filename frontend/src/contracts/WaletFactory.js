export const WALLET_FACTORY_ADDRESS =
  "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021";

export const WALLET_FACTORY_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_aaBytecodeHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "aaBytecodeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "salt",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "owner1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner2",
        "type": "address"
      }
    ],
    "name": "deployAccount",
    "outputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
