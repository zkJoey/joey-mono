const {BigNumber: BN} = require("ethers");
const {deploy, updateInitilizedContract} = require("../utils.js");
const {utils, Wallet, Provider} = require("zksync-web3");
const {Deployer} = require("@matterlabs/hardhat-zksync-deploy");

const RICH_WALLET_PK = "0xf12e28c0eb1ef4ff90478f6805b68d63737b7f33abfa091601140805da450d93";

async function deployContracts() {
    // await hre.network.provider.send("hardhat_reset")
    const [borrower] = await hre.ethers.getSigners();

    const wallet = new Wallet(RICH_WALLET_PK);
    const provider = new Provider("http://0.0.0.0:8545");
    console.log("wallet address:", wallet.address);
    console.log("provider:", provider);
    // const walletL2 = wallet.connect(provider);
    // const deployer = new Deployer(hre, wallet);
    const deployer = new Deployer(hre, wallet);

    const treasury_wallet = new Wallet(RICH_WALLET_PK);
    const treasury = treasury_wallet.connect(provider);
    const lender_wallet = new Wallet(RICH_WALLET_PK);
    const lender = lender_wallet.connect(provider);
    const ea_wallet = new Wallet(RICH_WALLET_PK);
    const ea = ea_wallet.connect(provider);
    const eaService_wallet = new Wallet(RICH_WALLET_PK);
    const eaService = eaService_wallet.connect(provider);
    const proxyOwner_wallet = new Wallet(RICH_WALLET_PK);
    const proxyOwner = proxyOwner_wallet.connect(provider);
    const pdsService_wallet = new Wallet(RICH_WALLET_PK);
    const pdsService = pdsService_wallet.connect(provider);

    // console.log("ea address:", eaService.address);x`

    console.log("deploying contracts...");
    const usdc = await deploy("TestToken", "USDC", [], deployer);
    console.log("usdc deployed:", usdc.address);
    const evaluationAgentNFT = await deploy("EvaluationAgentNFT", "EANFT", [], deployer);
    console.log("evaluationAgentNFT deployed:", evaluationAgentNFT.address);
    const humaConfig = await deploy("HumaConfig", "HumaConfig", [], deployer);
    console.log("humaConfig deployed:", humaConfig.address);

    const feeManager = await deploy("BaseFeeManager", "BaseCreditPoolFeeManager", [], deployer);
    console.log("feeManager deployed:", feeManager.address);
    const hdtImpl = await deploy("HDT", "BaseCreditHDTImpl", [], deployer);
    console.log("hdtImpl deployed:", hdtImpl.address);
    // const hdtProxy = await deploy(
    //     "TransparentUpgradeableProxy",
    //     "BaseCreditHDT",
    //     [hdtImpl.address, proxyOwner.address, []],
    //     deployer
    // );

    const hdtProxyArtifact = await deployer.loadArtifact("TransparentUpgradeableProxy");
    const hdtProxy = await deployer.deploy(hdtProxyArtifact, [
        hdtImpl.address,
        proxyOwner.address,
        [],
    ]);
    console.log(`hdtProxy address: ${hdtProxy.address}`);

    const poolConfig = await deploy("BasePoolConfig", "BaseCreditPoolConfig", [], deployer);
    console.log("poolConfig deployed:", poolConfig.address);
    const poolImpl = await deploy("BaseCreditPool", "BaseCreditPoolImpl", [], deployer);
    console.log("poolImpl deployed:", poolImpl.address);
    // const poolProxy = await deploy(
    //     "TransparentUpgradeableProxy",
    //     "BaseCreditPool",
    //     [poolImpl.address, proxyOwner.address, []],
    //     deployer
    // );

    const poolProxyT = await deployer.loadArtifact("TransparentUpgradeableProxy");
    const poolProxy = await deployer.deploy(poolProxyT, [
        poolImpl.address,
        proxyOwner.address,
        [],
    ]);

    console.log("poolProxy address:", poolProxy.address);
    // const BaseCreditPool = await ethers.getContractFactory("BaseCreditPool");
    pool = poolImpl.attach(poolProxy.address);

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
    // const HDT = await ethers.getContractFactory("HDT");
    const hdt = hdtImpl.attach(hdtProxy.address);
    console.log("hdt address attached:", hdt.address);
    await hdt.initialize("Credit HDT", "CHDT", usdc.address, {gasLimit: 1000000});
    console.log("hdt.initialize:", hdt.address);
    await hdt.setPool(pool.address, {gasLimit: 1000000});
    console.log("hdt.setPool:", hdt.address);
    await updateInitilizedContract("BaseCreditHDT");
    console.log("HDT initialized");

    console.log("Credit pool initializing");
    await poolConfig.initialize(
        "CreditLinePool",
        hdt.address,
        humaConfig.address,
        feeManager.address,
        {gasLimit: 1000000}
    );

    const decimals = 6;
    console.log("pause");
    const cap = BN.from(1_000_000).mul(BN.from(10).pow(BN.from(decimals)));
    console.log("cap: " + cap);
    await poolConfig.setPoolLiquidityCap(cap, {gasLimit: 1000000});
    await poolConfig.setPool(pool.address, {gasLimit: 1000000});

    await poolConfig.setPoolOwnerRewardsAndLiquidity(500, 200, {gasLimit: 1000000});
    await poolConfig.setEARewardsAndLiquidity(1000, 100, {gasLimit: 1000000});

    await poolConfig.setEvaluationAgent(1, ea.address, {gasLimit: 1000000});

    const maxCL = BN.from(10_000).mul(BN.from(10).pow(BN.from(decimals)));
    console.log("maxCL: " + maxCL);
    await poolConfig.setMaxCreditLine(maxCL);
    console.log("maxCL set");
    await poolConfig.setAPR(0);
    console.log("apr set");
    await poolConfig.setReceivableRequiredInBps(0);
    console.log("receivableRequiredInBps set");
    await poolConfig.setPoolPayPeriod(15);
    console.log("poolPayPeriod set");
    await poolConfig.setPoolToken(hdt.address);
    console.log("poolToken set");
    await poolConfig.setWithdrawalLockoutPeriod(0);
    console.log("withdrawalLockoutPeriod set");
    await poolConfig.setPoolDefaultGracePeriod(60);
    console.log("poolDefaultGracePeriod set");
    await poolConfig.setPoolOwnerTreasury(treasury.address);
    console.log("poolOwnerTreasury set");
    await poolConfig.setCreditApprovalExpiration(5);
    console.log("creditApprovalExpiration set");
    await poolConfig.addPoolOperator(deployer.zkWallet.address);
    console.log("poolOperator set");

    await pool.initialize(poolConfig.address, {gasLimit: 1000000});
    await updateInitilizedContract("BaseCreditPoolConfig");
    await updateInitilizedContract("BaseCreditPool");
    console.log("Credit pool initialized");

    console.log("Enabling pool");
    await pool.addApprovedLender(ea.address, {gasLimit: 1000000});
    console.log("Added approved ea lender");
    await pool.addApprovedLender(treasury.address, {gasLimit: 1000000});
    console.log("Added approved treasury lender");

    const amountOwner = BN.from(20_000).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(treasury.address, amountOwner);
    await usdc.connect(treasury).approve(pool.address, amountOwner);
    await pool.connect(treasury).makeInitialDeposit(amountOwner);
    console.log("Enabling pool");
    const amountEA = BN.from(10_000).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(ea.address, amountEA, {gasLimit: 1000000});
    console.log("Enabling pool");
    await usdc.connect(ea).approve(pool.address, amountEA);
    console.log("usdc approval");
    await pool.connect(ea).makeInitialDeposit(amountEA);
    console.log("makeInitialDeposit done");
    await pool.enablePool({gasLimit: 1000000});
    console.log("Pool is enabled");

    const amountLender = BN.from(500_000).mul(BN.from(10).pow(BN.from(decimals)));
    await pool.addApprovedLender(lender.address, {gasLimit: 1000000});
    await usdc.mint(lender.address, amountLender, {gasLimit: 1000000});
    console.log("USDC minted to lender");
    await usdc.connect(lender).approve(pool.address, amountLender);
    // await pool.connect(lender).deposit(amountLender);
}

deployContracts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
