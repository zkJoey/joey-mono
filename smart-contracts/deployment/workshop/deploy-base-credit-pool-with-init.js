const {BigNumber: BN} = require("ethers");
const {deploy, updateInitilizedContract} = require("../utils.js");
const {utils, Wallet, Provider} = require("zksync-web3");
const {Deployer} = require("@matterlabs/hardhat-zksync-deploy");

const RICH_WALLET_PK = "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";

async function deployContracts() {
    // await hre.network.provider.send("hardhat_reset")
    const [treasury, eaService, pdsService, ea, proxyOwner, lender, borrower] =
        await hre.ethers.getSigners();

    const wallet = new Wallet(RICH_WALLET_PK);
    console.log(wallet);
    // const provider = new Provider("http://0.0.0.0:8545");
    // const walletL2 = wallet.connect(provider);
    // const deployer = new Deployer(hre, wallet);
    const deployer = new Deployer(hre, wallet);
    console.log("deployer d", deployer);

    // console.log("ea address:", eaService.address);

    const usdc = await deploy("TestToken", "USDC", [], deployer);
    const evaluationAgentNFT = await deploy("EvaluationAgentNFT", "EANFT", [], deployer);

    const humaConfig = await deploy("HumaConfig", "HumaConfig", [], deployer);

    const feeManager = await deploy("BaseFeeManager", "BaseCreditPoolFeeManager", [], deployer);
    const hdtImpl = await deploy("HDT", "BaseCreditHDTImpl", [], deployer);
    const hdtProxy = await deploy(
        "TransparentUpgradeableProxy",
        "BaseCreditHDT",
        [hdtImpl.address, proxyOwner.address, []],
        deployer
    );
    const poolConfig = await deploy("BasePoolConfig", "BaseCreditPoolConfig", [], deployer);

    const poolImpl = await deploy("BaseCreditPool", "BaseCreditPoolImpl", [], deployer);
    const poolProxy = await deploy(
        "TransparentUpgradeableProxy",
        "BaseCreditPool",
        [poolImpl.address, proxyOwner.address, []],
        deployer
    );
    const BaseCreditPool = await ethers.getContractFactory("BaseCreditPool");
    pool = BaseCreditPool.attach(poolProxy.address);

    console.log("humaConfig initializing");
    await humaConfig.setHumaTreasury(treasury.address);
    await humaConfig.setTreasuryFee(500);
    await humaConfig.setEANFTContractAddress(evaluationAgentNFT.address);
    await humaConfig.setEAServiceAccount(eaService.address);
    await humaConfig.setPDSServiceAccount(pdsService.address);
    await humaConfig.setProtocolDefaultGracePeriod(30 * 24 * 3600);
    await humaConfig.setLiquidityAsset(usdc.address, true);
    await updateInitilizedContract("HumaConfig");
    console.log("humaConfig initialized");

    console.log("eaNFT initializing");
    await evaluationAgentNFT.connect(ea).mintNFT(ea.address);
    await updateInitilizedContract("EANFT");
    console.log("eaNFT initialized");

    console.log("feeManager initializing");
    await feeManager.setFees(0, 0, 0, 0, 0);
    await updateInitilizedContract("BaseCreditPoolFeeManager");
    console.log("feeManager initialized");

    console.log("HDT initializing");
    const HDT = await hre.ethers.getContractFactory("HDT");
    const hdt = HDT.attach(hdtProxy.address);
    await hdt.initialize("Credit HDT", "CHDT", usdc.address);
    await hdt.setPool(pool.address);
    await updateInitilizedContract("BaseCreditHDT");
    console.log("HDT initialized");

    console.log("Credit pool initializing");
    await poolConfig.initialize(
        "CreditLinePool",
        hdt.address,
        humaConfig.address,
        feeManager.address
    );

    const decimals = 6;
    console.log("pause");
    const cap = BN.from(1_000_000).mul(BN.from(10).pow(BN.from(decimals)));
    console.log("cap: " + cap);
    await poolConfig.setPoolLiquidityCap(cap);
    await poolConfig.setPool(pool.address);

    await poolConfig.setPoolOwnerRewardsAndLiquidity(500, 200);
    await poolConfig.setEARewardsAndLiquidity(1000, 100);

    await poolConfig.setEvaluationAgent(1, ea.address);

    const maxCL = BN.from(10_000).mul(BN.from(10).pow(BN.from(decimals)));
    console.log("maxCL: " + maxCL);
    await poolConfig.setMaxCreditLine(maxCL);
    await poolConfig.setAPR(0);
    await poolConfig.setReceivableRequiredInBps(0);
    await poolConfig.setPoolPayPeriod(15);
    await poolConfig.setPoolToken(hdt.address);
    await poolConfig.setWithdrawalLockoutPeriod(0);
    await poolConfig.setPoolDefaultGracePeriod(60);
    await poolConfig.setPoolOwnerTreasury(treasury.address);
    await poolConfig.setCreditApprovalExpiration(5);
    await poolConfig.addPoolOperator(deployer.address);

    await pool.initialize(poolConfig.address);
    await updateInitilizedContract("BaseCreditPoolConfig");
    await updateInitilizedContract("BaseCreditPool");
    console.log("Credit pool initialized");

    console.log("Enabling pool");
    await pool.addApprovedLender(ea.address);
    await pool.addApprovedLender(treasury.address);

    const amountOwner = BN.from(20_000).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(treasury.address, amountOwner);
    await usdc.connect(treasury).approve(pool.address, amountOwner);
    await pool.connect(treasury).makeInitialDeposit(amountOwner);
    console.log("Enabling pool");
    const amountEA = BN.from(10_000).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(ea.address, amountEA);
    await usdc.connect(ea).approve(pool.address, amountEA);
    await pool.connect(ea).makeInitialDeposit(amountEA);
    await pool.enablePool();
    console.log("Pool is enabled");

    const amountLender = BN.from(500_000).mul(BN.from(10).pow(BN.from(decimals)));
    await pool.addApprovedLender(lender.address);
    await usdc.mint(lender.address, amountLender);
    await usdc.connect(lender).approve(pool.address, amountLender);
    // await pool.connect(lender).deposit(amountLender);
}

deployContracts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
