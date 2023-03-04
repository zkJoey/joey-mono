import json

from web3 import HTTPProvider, Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account
from eth_account.signers.local import LocalAccount
from zksync2.module.module_builder import ZkSyncBuilder
from zksync2.core.types import EthBlockParams
from eth_typing import HexStr
from web3._utils.abi import get_constructor_abi, merge_args_and_kwargs
from web3._utils.contracts import encode_abi
from web3.types import TxReceipt    
from eth_typing import HexStr

import config
private_key = "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110"
ZKSYNC_NETWORK_URL: str = 'http://localhost:3050'
account: LocalAccount = Account.from_key(private_key)
zksync_web3 = ZkSyncBuilder.build(ZKSYNC_NETWORK_URL)
zk_balance = zksync_web3.zksync.get_balance(account.address, EthBlockParams.LATEST.value)
print(f"ZkSync balance: {zk_balance}")
print("contracts", zksync_web3.zksync.zks_main_contract())

class HumaPool:
    def __init__(self, pool_address):
        self.signer = Web3.toChecksumAddress(config.ea)
        # self.pool_address = Web3.toChecksumAddress(pool_address)
        with open("abi/BaseCreditPool.json") as f:
            self.abi = json.load(f)
        # self.w3 = Web3(HTTPProvider("http://localhost:8545"))
        # self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        contract_address = HexStr(pool_address)
        self.huma_pool_contract = zksync_web3.zksync.contract(address=contract_address, abi=self.abi)
        print("self.huma_pool_contract", self.huma_pool_contract.address)
        # self.pool_config_address = HexStr(self.get_pool_config_address())
        self.pool_config_address = HexStr("0x783DeaD1bA2f988F9c8977DeD606A126334E757e")
        print("self.pool_config_address", self.pool_config_address)
        with open("abi/BasePoolConfig.json") as f:
            self.config_abi = json.load(f)
        self.huma_pool_config_contract = zksync_web3.zksync.contract(address=self.pool_config_address, abi=self.config_abi)
        print("self.huma_pool_config_contract", self.huma_pool_config_contract)
        # print("mappping: ", self.get_pool_creditRecordStaticMapping(self, self.borrower_address))
        import pdb;pdb.set_trace()
        self.summary = self.get_pool_summary()
        
        print("self.summary", self.summary)
        
    def post_approved_request(self, **approve_result):
        nonce = self.w3.eth.get_transaction_count(self.signer, "pending")
        post_txn = self.huma_pool_contract.functions.approveCredit(**approve_result).buildTransaction(
            {"from": self.signer, "nonce": nonce}
        )

        signed_txn = self.w3.eth.account.sign_transaction(post_txn, private_key=config.ea_key)
        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        txn_receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)
        if txn_receipt["status"]:
            return
        else:
            raise RuntimeError("Blockchain transaction failed")

    def get_approval_status(self, borrower_address):
        return self.huma_pool_contract.functions.isApproved(Web3.toChecksumAddress(borrower_address)).call()
    
    def get_pool_summary(self):
        # tokenAddress, apr, payPeriod, maxCreditAmount, liquidityCap, token name
        # token Symbol, decimal, EAID, EANFTAddress
        print("self.huma_pool_config_contract.functions.getPoolSummary()", self.huma_pool_config_contract.functions.getPoolSummary())
        return self.huma_pool_config_contract.functions.getPoolSummary().call()
    
    def get_pool_config_address(self):
        import pdb;pdb.set_trace()
        return self.huma_pool_contract.functions.poolConfigAddr().call()
    
    def get_pool_creditRecordStaticMapping(self, borrower_address):
        return self.huma_pool_contract.functions.creditRecordStaticMapping(Web3.toChecksumAddress(borrower_address)).call()