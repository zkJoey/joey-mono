const localhost = {
  id: 31337,
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
};

const zkSync_testnet = {
  id: 280,
  name: "zkSync Era Testnet",
  network: "zkSync Era Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://zksync2-testnet.zksync.dev"] },
    public: { http: ["https://zksync2-testnet.zksync.dev"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://goerli.explorer.zksync.io",
    },
    default: {
      name: "Etherscan",
      url: "https://goerli.explorer.zksync.io",
    },
  },
};

const zkSync_localhost = {
  id: 270,
  name: "L2 local zkSync",
  network: "L2 local zkSync",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:3050"] },
    public: { http: ["http://127.0.0.1:3050"] },
  },
};

export { localhost, zkSync_testnet, zkSync_localhost };
