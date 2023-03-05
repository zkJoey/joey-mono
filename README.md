### Welcome to Joey Finance!
![Joey small](https://user-images.githubusercontent.com/7723863/222958840-5ebef8ad-7db7-4670-aa51-48bdfbbcd244.jpg)


# 👀 Problem

- At the moment it’s difficult for web3 companies/entities to receive funding and loans for growth against the on-chain (and off-chain) revenue. For the space the grow, funding is key. Traditional financial institutions do not have the know-how to serve them.
    - Types of customers
        - content creators in Web3
        - Web3 companies selling to Web2/3
        - Gaming firms
        - Consumer
        - Science
        - B2B
- Today, each wallet functions as a debit card. We envision a credit line for every wallet so that people can borrow or spend as needed, similar to a credit card in real life.
    - a business could have revolving credit facility based on the on and offchain revenue underwriting
    - individuals could have on-chain credit card (wallet), with a limit linked and signalled against their off-chain credit score for example

---

## Project Description

Today, each wallet functions as a debit card. We envision a credit line for every wallet so that people can borrow or spend as needed, similar to a credit card in real life.

Credit Wallet built using multisig Account Abstraction on ZKSync

Business or individuals can have credit facility underwritten by on- and off-chain signals utilising Huma Protocol

- data sources - Circle Business Account, Stripe, Request

- credit scoring - Spectral, Flock

Users can make payments to the vendors and sellers directly from the Huma Pool via ZKBob to keep vendor details private

In case of late or default on repayments of the credit, protocol takes ownership of the revenue receiving contracts


## Stack
- Dapp (React) using Web3Modal
- Multisig Account Abstraction for the credit wallet, with second sig for potential guarantor to co-sign on the credit line
- Deployed on ZKSync
- Integrates Circle (customer of our user makes payments to the credit wallet)
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
	- connect Stripe and Cricle keys to feed Signal Adapter
	- Calculate credit limit by Evaluation Agent

## Designs
https://www.figma.com/file/xcRfMLTCYX1VMqynL2JeyK/Joey-Finance?node-id=0%3A1&t=mbUVKwGjPf2xoa4L-1

## Flows
![flows](https://user-images.githubusercontent.com/7723863/222959415-2a9fc0a7-a94c-43e9-a15d-92ee2dda398c.jpg)

## Bounties
### ETHDenver DeFi Track 

### Huma: A credit line for every wallet
- We build entire underwriting of the credit wallet on top of Huma protocol
https://github.com/credit-wallet/joey-mono/tree/main/smart-contracts
https://github.com/credit-wallet/joey-mono/tree/main/evaluation-agent
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters

### Huma: Launch a real-world lending use case on Huma
- Utilize on and off-chain data from Stripe, Circle with credit scoring done by Spectral and FLock to provide credit facility to the businesses
https://github.com/credit-wallet/joey-mono/tree/main/smart-contracts
https://github.com/credit-wallet/joey-mono/tree/main/evaluation-agent
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters

### Huma: new signal adapters
- Integrated Circle, Stripe, Spectral and Flock as new adapters
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/stripe
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/flock
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle

### WalletConnect Web3Modal DeFi Challenge: Making Bank
- Utilise wallet connect to create Dapp and platform for credit card type of underwriting
https://github.com/credit-wallet/joey-mono/blob/main/frontend/src/index.js
https://github.com/credit-wallet/joey-mono/blob/main/frontend/src/components/Header.js

### ZKSync Wallet Logic! (using account abstraction) 
- Built Acccount Abstraction ZK
https://github.com/credit-wallet/AA-zkysync-updated/blob/main/contracts/AAFactory.sol
https://github.com/credit-wallet/SimpleAA

### Circle: 
- receive payment signals from the Stripe Business account
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/circle

### ZkBob
- business can pay directly from the credit pool via ZKBob to protect business sensitive vendor information
https://github.com/credit-wallet/joey-mono/blob/main/smart-contracts/contracts/ZkBobDirectDeposit.sol

### Spectral
- utilize spectral credit scoring of wallets, for underwriting evaluation done by Evaluation Agents from Huma
https://github.com/credit-wallet/joey-mono/tree/main/signal-adapters/huma_signals/adapters/spectral



# Deployment instructions

## Run commands

- Smart contracts (huma protocol contracts modified for our use)
- Signal Adapters
- Evaluation Agent
- Dapp (TBC)

**ETHEREUM**

### **Mono Repo**

**Smart contracts**

```bash
# clone mono repo
gh repo clone credit-wallet/joey-mono

# smart contracts
cd smart-contracts
yarn install
yarn build
yarn test
yarn chain

# with yarn chain, the console will print out 20 testing accounts
# Account 6 has sufficient test usdc as a lender
# Account 7 and later can be used as borrowers

# start a new terminal
yarn deploy

# all deployed contract addresses can be found in deployment/localhost-deployed-contracts.json
# If some error happens and you need to start over, run: yarn clear, then deploy again
```

**Signal Adapters**

```bash
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

**Evaluation Agent**

```bash
# Start the EvaluationAgent service: 
cd joey-mono/evaluation-agent
pip install git+https://github.com/zksync-sdk/zksync-python.git
pip3 install -r requirements.txt
pip install zksync2
python3 main.py
```

**Evaluation Agent endpoints**

```markdown
# POST /approve
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

# POST /underwrite
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

**Calls to Signal Adapters**

```bash
# API call for signal retrieval from Stripe
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

# API call for signal retrieval from Circle
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

# API call for signal retrieval from Spectral
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

# API call for signal retrieval from Flock
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

**ZKSync chain and smart contracts**

```bash
# close git repot
gh repo clone credit-wallet/joey-mono
# Start the local nodes

# install Docker first

# To run zkSync locally, run the start.sh script:
cd zkchain-setup
./start.sh

# deploy smart contracts on zksync
gh repo clone credit-wallet/huma-contracts-zk
cd huma-contracts-zk
yarn hardhat run scripts/deploy.ts --network zkTestnet
```

**Signal Adapters**

```bash
# Signal Adapters API server
cd joey-mono/signal-adapters

# install poetry
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"
poetry install

# run the server
make run-local
```

**Evaluation Agent**

```bash
# Start the EvaluationAgent service: 
cd joey-mono/evaluation-agent
pip install git+https://github.com/zksync-sdk/zksync-python.git
pip3 install -r requirements.txt
pip install zksync2
python3 main.py
```

**Setup Metamask**

```bash
# Local L1 network
# Network Name: L1 local
New RPC URL: http://localhost:8545/
Chain ID: 9
Currency Symbol: ETH
Local zkSync network

# Network Name: L2 local zkSync
New RPC URL: http://localhost:3050/
Chain ID: 270
Currency Symbol: ETH
```

Update for ZK

```bash
# evaluation agent, huma_pool.py
self.w3 = Web3(HTTPProvider("http://0.0.0.0:3050"))

# metamask
# Network Name: L2 local zkSync
New RPC URL: http://localhost:3050/
Chain ID: 270
Currency Symbol: ETH
```
