Welcome to Joey Finance!

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

# 💭 Proposal

We can build on top of Huma - [https://docs.huma.finance/](https://docs.huma.finance/)

Huma for lending, contracts, Signal and Evaluation Agents

- use EIP4337 for the account abstraction for the credit wallet
    - ZK for privacy
- use on-chain (and off-chain) revenue data to add credit line to the users wallet. User can spent up to that amount on the credit wallet via Evaluation Agent assessment.
- Repayment happens directly to the Huma pool from the borrowers wallet (streaming payments?)
- create signal adapters from Stripe, Plaid, credit scoring (FICO) others - [https://docs.huma.finance/developer-guidlines/decentralized_signal_portfolio](https://docs.huma.finance/developer-guidlines/decentralized_signal_portfolio)
    - can utilize prediction algorithms and credit risk scoring model to assess potential borrowing risk
- angle the app to help lend to e-commerce companies, digital creators in emerging economies

Benefits of account abstraction

- can add social recovery - since it’s a smart contract, can add there second keys
- fraud monitoring with 2FA

## Brief Description

Today, each wallet functions as a debit card. We envision a credit line for every wallet so that people can borrow or spend as needed, similar to a credit card in real life. 

- Credit Wallet built using ZKSync Account Abstraction
- business or individuals could have credit card (credit wallet) facility underwritten by on- and off-chain signals utilizing Huma Protocol
    - offchain data sources - Circle Business Account, Stripe
    - onchain credit scoring - Spectral, Flock
- Users could make payments to the vendors and sellers directly from the Huma Pool via ZKBob to keep purchase details private

## Designs
https://www.figma.com/file/xcRfMLTCYX1VMqynL2JeyK/Joey-Finance?node-id=0%3A1&t=mbUVKwGjPf2xoa4L-1

## Flows
![image](https://user-images.githubusercontent.com/7723863/222954685-e3235f16-af26-427f-854c-1b8b927bedd0.png)


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
