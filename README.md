# joey-mono
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
pip3 install -r requirements.txt
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
```
