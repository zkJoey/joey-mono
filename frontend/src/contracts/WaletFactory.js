export const WALLET_FACTORY_ADDRESS =
  "0x56DD798Fa6934E3133b0b78A47B41E07ef1c9114";

export const WALLET_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_aaBytecodeHash",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "aaBytecodeHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner1",
        type: "address",
      },
      {
        internalType: "address",
        name: "humaPool",
        type: "address",
      },
    ],
    name: "deployAccount",
    outputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wallets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
