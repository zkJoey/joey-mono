const {BigNumber: BN} = require("ethers");
const {deploy, updateInitilizedContract} = require("../utils.js");
const {utils, Wallet, Provider} = require("zksync-web3");
const {Deployer} = require("@matterlabs/hardhat-zksync-deploy");

// const RICH_WALLET_PK = "0xf12e28c0eb1ef4ff90478f6805b68d63737b7f33abfa091601140805da450d93";
// private keys 
const RICH0 = "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
const RICH1 = "0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3";
const RICH2 = "0xd293c684d884d56f8d6abd64fc76757d3664904e309a0645baf8522ab6366d9e"
const RICH3 = "0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8";
const RICH4 = "0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8";
const RICH5 = "0xf12e28c0eb1ef4ff90478f6805b68d63737b7f33abfa091601140805da450d93";
const RICH6 = "0xe667e57a9b8aaa6709e51ff7d093f1c5b73b63f9987e4ab4aa9a5c699e024ee8";
const RICH7 = "0x28a574ab2de8a00364d5dd4b07c4f2f574ef7fcc2a86a197f65abaec836d1959";
const RICH8 = "0x74d8b3a188f7260f67698eb44da07397a298df5427df681ef68c45b34b61f998";
const RICH9 = "0xbe79721778b48bcc679b78edac0ce48306a8578186ffcb9f2ee455ae6efeace1";
const RICH10 = "0x3eb15da85647edd9a1159a4a13b9e7c56877c4eb33f614546d4db06a51868b1c";


async function deployContracts() {
    // await hre.network.provider.send("hardhat_reset")
    // const [borrower] = await hre.ethers.getSigners();

    const privateKey = process.env.PRIVATE_KEY ?? 'null';
    const wallet = new Wallet(privateKey);

    const privateKey2 = process.env.PRIVATE_KEY2 ?? 'null';
    const wallet2 = new Wallet(privateKey2);


    const provider = new Provider("https://zksync2-testnet.zksync.dev");
    console.log("wallet address:", wallet.address);
    console.log("provider:", provider);
    const deployer = new Deployer(hre, wallet);

    const treasury_wallet = new Wallet(privateKey2); // to change 
    const treasury = treasury_wallet.connect(provider); 
    const lender_wallet = new Wallet(privateKey);
    const lender = lender_wallet.connect(provider);
    const ea_wallet = new Wallet(privateKey);
    const ea = ea_wallet.connect(provider);
    const eaService_wallet = new Wallet(privateKey);
    const eaService = eaService_wallet.connect(provider);
    const proxyOwner_wallet = new Wallet(privateKey);
    const proxyOwner = proxyOwner_wallet.connect(provider);
    const pdsService_wallet = new Wallet(privateKey);
    const pdsService = pdsService_wallet.connect(provider);
    const receiver_wallet = new Wallet(privateKey);
    const receiver = receiver_wallet.connect(provider);
    


    const USDC_L2_ADDRESS = "0x0faF6df7054946141266420b43783387A78d82A9";

    console.log(await provider.getBalance(RICH1, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH2, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH3, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH4, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH5, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH6, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH7, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH8, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH9, "latest", USDC_L2_ADDRESS));
    console.log(await provider.getBalance(RICH10, "latest", USDC_L2_ADDRESS));





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

    const amountOwner = BN.from(1).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(treasury.address, amountOwner);
    const txHandle = await usdc.connect(treasury).approve(pool.address, amountOwner, {gasLimit:10000000});
    // await txHandle.wait();
    console.log("waiting");
    console.log(txHandle);
    // await txHandle.waitFinalize();
    console.log("finalized");
    console.log("usdc approval");
    await pool.connect(treasury).makeInitialDeposit(amountOwner, {gasLimit:10000000});
    console.log("Enabling pool");
    const amountEA = BN.from(10_000).mul(BN.from(10).pow(BN.from(decimals)));
    await usdc.mint(ea.address, amountEA, {gasLimit: 10000000});
    console.log("Enabling pool");
    await usdc.connect(ea).approve(pool.address, amountEA, {gasLimit:10000000});
    console.log("usdc approval");
    await pool.connect(ea).makeInitialDeposit(amountEA, {gasLimit:10000000});
    console.log("makeInitialDeposit done");
    await pool.enablePool({gasLimit: 1000000});
    console.log("Pool is enabled");


    const amountLender = BN.from(500_000).mul(BN.from(10).pow(BN.from(decimals)));
    await pool.addApprovedLender(lender.address, {gasLimit: 1000000});
    await usdc.mint(lender.address, amountLender, {gasLimit: 1000000});
    console.log("USDC minted to lender");
    await usdc.connect(lender).approve(pool.address, amountLender);
    // const tx = await poolImpl.drawdown(amountLender, receiver.address, {gasLimit: 1000000});
        

    const borrowAmount = BN.from(1).mul(BN.from(10).pow(BN.from(decimals)));
    const x = await pool.drawdown(borrowAmount, receiver.address, {gasLimit: 1000000});
    console.log(receiver.address);
    console.log(x);
    console.log("drawdown done");

}

deployContracts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
