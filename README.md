### Welcome to Joey Finance!
![zkjoey](https://user-images.githubusercontent.com/7723863/222960347-211eca1d-ded1-47d5-a2d6-5d55c6953156.jpg)


# 👀 Problem

- Currently, it's difficult for web3 companies/entities to receive funding and loans for growth against the on-chain (and off-chain) revenue. For the space to grow, funding is vital. Unfortunately, traditional financial institutions do not have the know-how to serve them.
    - Types of customers
        - content creators in Web3
        - Web3 companies selling to Web2/3
        - Gaming firms
        - Consumer
        - Science
        - B2B
- Today, each wallet functions as a debit card. We envision a credit line for every wallet so people can borrow or spend as needed, similar to a credit card in real life.
    - a business could have a revolving credit facility based on the on and off-chain revenue underwriting
    - individuals could have an on-chain credit card (wallet) with a limit linked and signalled against their off-chain credit score, for example

---

## Project Description

Today, each wallet functions as a debit card. We envision a credit line for every wallet so people can borrow or spend as needed, similar to a credit card in real life.

Credit Wallet built using multi-sig Account Abstraction on ZKSync

Businesses or individuals can have credit facilities underwritten by on- and off-chain signals utilizing Huma Protocol

- data sources - Circle Business Account, Stripe, Request

- credit scoring - Spectral, Flock

Users can make payments to the vendors and sellers directly from the Huma Pool via ZKBob to keep vendor details private.

In case of late or default on repayments of the credit, the protocol takes ownership of the revenue-receiving contracts.


## Stack
- Dapp (React) using Web3Modal
- Multisig Account Abstraction for the credit wallet, with second sig for a potential guarantor to co-sign on the credit line
- Deployed on ZKSync
- Signal Adapter (python app) for Huma to get data from:
	- Circle Business Account 
	- Stripe
	- credit score from Spectral and Flock
	- Request.finance invoices as collateral
- Evaluation Agent (python app) to consume signals and underwrite credit
- ZKBob for transfers (direct deposits) from Pool to the end-user (https://docs.zkbob.com/resources/hackathons/zkbob-direct-deposits)
- In case of default, the pool takes ownership of contracts receiving revenue
- Dapp built using React
	- login with Web3Modal
	- connect Stripe and Circle keys to feed Signal Adapter
	- Calculate credit limit by Evaluation Agent

## Designs
https://www.figma.com/file/xcRfMLTCYX1VMqynL2JeyK/Joey-Finance?node-id=0%3A1&t=mbUVKwGjPf2xoa4L-1

## Flows
![flows](https://user-images.githubusercontent.com/7723863/222959415-2a9fc0a7-a94c-43e9-a15d-92ee2dda398c.jpg)

## Bounties
### ETHDenver DeFi Track 

### Huma: A credit line for every wallet
- We build the entire underwriting of the credit wallet on top of the Huma protocol
- https://github.com/credit-wallet/joey-mono/tree/main/smart-contracts
- https://github.com/credit-wallet/joey-mono/tree/main/evaluation-agent
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters

### Huma: Launch a real-world lending use case on Huma
- Utilize on and off-chain data from Stripe, and Circle with credit scoring done by Spectral and FLock to provide credit facilities to the businesses
- https://github.com/credit-wallet/joey-mono/tree/main/smart-contracts
- https://github.com/credit-wallet/joey-mono/tree/main/evaluation-agent
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters

### Huma: new signal adapters
- Integrated Circle, Stripe, Spectral and Flock as new adapters
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/stripe
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/flock
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle

### WalletConnect Web3Modal DeFi Challenge: Making Bank
- Utilise wallet connect to create a Dapp and platform for credit card type of underwriting
- https://github.com/credit-wallet/joey-mono/blob/main/frontend/src/index.js
- https://github.com/credit-wallet/joey-mono/blob/main/frontend/src/components/Header.js

### ZKSync Wallet Logic! (using account abstraction) 
- Built Account Abstraction ZK
- https://github.com/credit-wallet/AA-zkysync-updated/blob/main/contracts/AAFactory.sol
- https://github.com/credit-wallet/SimpleAA

### Circle: 
- receive payment signals from the Circle Business account
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle

### ZkBob
- Businesses can pay directly from the credit pool via ZKBob to protect business-sensitive vendor information
- https://github.com/credit-wallet/joey-mono/blob/main/smart-contracts/contracts/ZkBobDirectDeposit.sol

### Spectral
- utilize spectral credit scoring of wallets for underwriting evaluation done by Evaluation Agents from Huma
- https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/spectral



### Deployment instructions

## Run commands

- Smart contracts (huma protocol contracts modified for our use)
- Signal Adapters
- Evaluation Agent
- Dapp (TBC)

**ETHEREUM**

### **Mono Repo**

**Smart contracts**

```
### clone mono repo
gh repo clone credit-wallet/joey-mono

### smart contracts
cd smart-contracts
yarn install
yarn build
yarn test
yarn chain

### with yarn chain, the console will print out 20 testing accounts
### Account 6 has sufficient test usdc as a lender
### Account 7 and later can be used as borrowers

### start a new terminal
yarn deploy

### all deployed contract addresses can be found in deployment/localhost-deployed-contracts.json
### If some error happens and you need to start over, run: yarn clear, then deploy again
```

### **Signal Adapters**

```
# Signal Adapters API server
cd joey-mono/signal-adapters

# update dotenv file from a copy of example.env
huma_signals/dotenv/development.env

# install poetry
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"
poetry install

# run the server
make run-local
```

### **Evaluation Agent**

```
# Start the EvaluationAgent service: 
cd joey-mono/evaluation-agent
pip install git+https://github.com/zksync-sdk/zksync-python.git
pip3 install -r requirements.txt
pip install zksync2
python3 main.py
```

### **Evaluation Agent endpoints**

```
### POST /approve
**params**
	poolAddress: str
  borrowerWalletAddress: str

**Result**
{
    "creditLimit": 300000000,
    "intervalInDays": 30,
    "remainingPeriods": 12,
    "aprInBps": 0
}

### POST /underwrite
**params**
	poolAddress: str
  borrowerWalletAddress: str
  creditLimit: float

**Result** 
{
    "creditLimit": 300000000,
    "intervalInDays": 30,
    "remainingPeriods": 12,
    "aprInBps": 0
}

```

### **Calls to Signal Adapters**

```
### API call for signal retrieval from Stripe
curl -X 'POST' \
  'http://127.0.0.1:8000/fetch' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "signal_names": [
    "stripe_adapter.total_balance"
  ],
  "adapter_inputs": {"stripe_api_key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc"}
}'

### API call for signal retrieval from Circle
curl -X 'POST' \
  'http://127.0.0.1:8000/fetch' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "signal_names": [
    "circle_adapter.account_balance"
  ],
  "adapter_inputs": {"account": "circle_71283"}
}'

### API call for signal retrieval from Spectral
curl -X 'POST' \
  'http://localhost:8000/fetch' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "signal_names": [
    "spectral_adapter.score"
  ],
  "adapter_inputs": {"wallet": "0x573d19B66Cdc33f7E751f2a478ECeCe95155e798", "token":"SFMyNTY.g2gDbQAAACQ3MGY1ZDgxMC0yMjk1LTQyMjQtODA1Zi01ZGNmNzMxYzY3YTBuBgBspGeWhgFiAAFRgA.ruwaqqurFh6PCDUhY0z0TNmiWiqrmp8ZOmG3--bksSM"}
}'

### API call for signal retrieval from Flock
curl -X 'POST' \
  'http://localhost:8000/fetch' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "signal_names": [
    "flock_adapter.prediction"
  ],
   "adapter_inputs": {
    "input_array": [
        12000.0,
        36,
        10.78,
        98000.0,
        24.04,
        0.0,
        694.0,
        0.0,
        15.0,
        1.0,
        20462.0,
        62.8,
        39.0,
        1349.67,
        0.0,
        0.0,
        7884.96,
        754.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
    ]
}
}'
```

## ZKSync deployment

### **ZKSync chain and smart contracts**

```
# close git repot
gh repo clone credit-wallet/joey-mono
# Start the local nodes

### install Docker first

### To run zkSync locally, run the start.sh script:
cd zkchain-setup
./start.sh

### deploy smart contracts on zksync
gh repo clone credit-wallet/huma-contracts-zk
cd huma-contracts-zk
yarn hardhat run scripts/deploy.ts --network zkTestnet
```

### **Signal Adapters**

```
# Signal Adapters API server
cd joey-mono/signal-adapters

# install poetry
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"
poetry install

# run the server
make run-local
```

### **Evaluation Agent**

```
# Start the EvaluationAgent service: 
cd joey-mono/evaluation-agent
pip install git+https://github.com/zksync-sdk/zksync-python.git
pip3 install -r requirements.txt
pip install zksync2
python3 main.py
```

### **Setup Metamask**

```
### Local L1 network
### Network Name: L1 local
New RPC URL: http://localhost:8545/
Chain ID: 9
Currency Symbol: ETH
Local zkSync network

### Network Name: L2 local zkSync
New RPC URL: http://localhost:3050/
Chain ID: 270
Currency Symbol: ETH
```

Update for ZK
```
### evaluation agent, huma_pool.py
self.w3 = Web3(HTTPProvider("http://0.0.0.0:3050"))

### metamask
### Network Name: L2 local zkSync
New RPC URL: http://localhost:3050/
Chain ID: 270
Currency Symbol: ETH
```


### Deployed contracts on [zkSync Era Goerli](https://goerli.explorer.zksync.io/)

- [USDC](https://goerli.explorer.zksync.io/address/0xeD8b31e469EAEc22239F83B5aFFbc9C91f2D954f)
- [EANFT](https://goerli.explorer.zksync.io/address/0x847DCd9ce023fc0e9502A80199E4d2200B3c833f)
- [humaConfig](https://goerli.explorer.zksync.io/address/0xE3128A8d9C44Bf9b98Ab7679dcE3536c1A1CD47c)
- [BaseCreditPoolFeeManager](https://goerli.explorer.zksync.io/address/0xc6c6e0C323af61A75733c8A3078394DF4B7F7fAe)
- [feeManager](https://goerli.explorer.zksync.io/address/0xc6c6e0C323af61A75733c8A3078394DF4B7F7fAe)
- [BaseCreditHDTImpl](https://goerli.explorer.zksync.io/address/0xa6a018bA78e533baB7afab25b4CE50d0c18f786F)
- [hdtImpl](https://goerli.explorer.zksync.io/address/0xa6a018bA78e533baB7afab25b4CE50d0c18f786F)
- [hdtProxy](https://goerli.explorer.zksync.io/address/0x05AeBC5BEe1B7363eecC3d50D3cDe05e03dac780)
- [BaseCreditPoolConfig](https://goerli.explorer.zksync.io/address/0xed2F62c1f8d82e2F5e35B88fdB973BAE631AE767)
- [poolConfig](https://goerli.explorer.zksync.io/address/0xed2F62c1f8d82e2F5e35B88fdB973BAE631AE767)
- [BaseCreditPoolImpl](https://goerli.explorer.zksync.io/address/0x85451b0c49CE4dA33E6e8E518BBa2bb6900d1554)
- [poolProxy address](https://goerli.explorer.zksync.io/address/0xb240DcB39C07BbdF722CF2A897Ccbd5F2598543F)
- [hdt address attached](https://goerli.explorer.zksync.io/address/0x05AeBC5BEe1B7363eecC3d50D3cDe05e03dac780)
- [hdt.initialize](https://goerli.explorer.zksync.io/address/0x05AeBC5BEe1B7363eecC3d50D3cDe05e03dac780)

