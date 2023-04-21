require("hardhat-contract-sizer");
require("@matterlabs/hardhat-zksync-deploy");
require("@nomicfoundation/hardhat-chai-matchers");
require("@matterlabs/hardhat-zksync-solc");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");


require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-prettier");
require("solidity-coverage");

require("hardhat-abi-exporter");
require("dotenv").config();
const fs = require("fs");

const EMPTY_URL = "empty url";
const EMPTY_PRIVATE_KEY = "0x0000000000000000000000000000000000000000000000000000000000000000";

let goerliUrl = process.env["GOERLI_URL"];
if (!goerliUrl) {
    goerliUrl = EMPTY_URL;
}
let mumbaiUrl = process.env["MUMBAI_URL"];
if (!mumbaiUrl) {
    mumbaiUrl = EMPTY_URL;
}
let polygonUrl = process.env["POLYGON_URL"];
if (!polygonUrl) {
    polygonUrl = EMPTY_URL;
}
let mainnetUrl = process.env["MAINNET_URL"];
if (!mainnetUrl) {
    mainnetUrl = EMPTY_URL;
}
let deployer = process.env["DEPLOYER"];
if (!deployer) {
    deployer = EMPTY_PRIVATE_KEY;
}
let proxyOwner = process.env["PROXY_OWNER"];
if (!proxyOwner) {
    proxyOwner = EMPTY_PRIVATE_KEY;
}
let lender = process.env["LENDER"];
if (!lender) {
    lender = EMPTY_PRIVATE_KEY;
}
let ea = process.env["EA"];
if (!ea) {
    ea = EMPTY_PRIVATE_KEY;
}
let eaService = process.env["EA_SERVICE"];
if (!eaService) {
    eaService = EMPTY_PRIVATE_KEY;
}
let pdsService = process.env["PDS_SERVICE"];
if (!pdsService) {
    pdsService = EMPTY_PRIVATE_KEY;
}
let treasury = process.env["TREASURY"];
if (!treasury) {
    treasury = EMPTY_PRIVATE_KEY;
}
let ea_bcp = process.env["EA_BASE_CREDIT"];
if (!ea_bcp) {
    ea_bcp = EMPTY_PRIVATE_KEY;
}
let invoicePayer = process.env["INVOICE_PAYER"];
if (!invoicePayer) {
    invoicePayer = EMPTY_PRIVATE_KEY;
}
let baseCreditPoolOperator = process.env["BASE_CREDIT_POOL_OPERATOR"];
if (!baseCreditPoolOperator) {
    baseCreditPoolOperator = EMPTY_PRIVATE_KEY;
}
let receivableFactoringPoolOperator = process.env["RECEIVABLE_FACTORING_POOL_OPERATOR"];
if (!receivableFactoringPoolOperator) {
    receivableFactoringPoolOperator = EMPTY_PRIVATE_KEY;
}
let receivableFactoringPoolOwnerTreasury = process.env["RECEIVABLE_FACTORING_POOL_OWNER_TREASURY"];
if (!receivableFactoringPoolOwnerTreasury) {
    receivableFactoringPoolOwnerTreasury = EMPTY_PRIVATE_KEY;
}
let baseCreditPoolOwnerTreasury = process.env["BASE_CREDIT_POOL_OWNER_TREASURY"];
if (!baseCreditPoolOwnerTreasury) {
    baseCreditPoolOwnerTreasury = EMPTY_PRIVATE_KEY;
}

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "zkTestnet";

const mainnetGwei = 21;

function mnemonic() {
    try {
        return fs.readFileSync("./mnemonic.txt").toString().trim();
    } catch (e) {
        if (defaultNetwork !== "localhost") {
            console.log(
                "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
            );
        }
    }
    return "";
}

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    zksolc: { 
      version: "1.3.8", 
      compilerSource: "binary", 
      settings: { 
        optimizer: { 
          enabled: true, 
          mode: "z", 
        }, 
      }, 
    }, 
    
    /**
     * gas reporter configuration that let's you know
     * an estimate of gas for contract deployments and function calls
     * More here: https://hardhat.org/plugins/hardhat-gas-reporter.html
     */
    // gasReporter: {
    //     currency: "USD",
    //     coinmarketcap: process.env.COINMARKETCAP || null,
    // },

    // if you want to deploy to a testnet, mainnet, or xdai, you will need to configure:
    // 1. An Infura key (or similar)
    // 2. A private key for the deployer
    // DON'T PUSH THESE HERE!!!
    // An `example.env` has been provided in the Hardhat root. Copy it and rename it `.env`
    // Follow the directions, and uncomment the network you wish to deploy to.

    networks: {

        zkTestnet: {
            url: "https://zksync2-testnet.zksync.dev", // URL of the zkSync network RPC
            ethNetwork: "goerli", // URL of the Ethereum Web3 RPC, or the identifier of the network (e.g. `mainnet` or `goerli`)
            zksync: true,
            verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification',
          },
        // goerli: {
        //     url: goerliUrl,
        //     accounts: [
        //         deployer,
        //         proxyOwner,
        //         lender,
        //         ea,
        //         eaService,
        //         pdsService,
        //         treasury,
        //         ea_bcp,
        //         invoicePayer,
        //         baseCreditPoolOperator,
        //         receivableFactoringPoolOperator,
        //         baseCreditPoolOwnerTreasury,
        //         receivableFactoringPoolOwnerTreasury,
        //     ],
        // },
        
    
    // namedAccounts: {
    //     deployer: {
    //         default: 0, // here this will by default take the first account as deployer
    //     },
    // },

    // abiExporter: {
    //     path: "./abi",
    //     runOnCompile: true,
    //     clear: true,
    //     flat: true,
    //     only: [],
    //     spacing: 2,
    //     pretty: false,
    // },

    }
};
