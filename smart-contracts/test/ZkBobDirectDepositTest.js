/* eslint-disable no-underscore-dangle */
const {ethers} = require("hardhat");
const {expect} = require("chai");
const {
    deployContracts,
    deployAndSetupPool,
    advanceClock,
    checkRecord,
    checkResult,
    getCreditInfo,
    toToken,
    setNextBlockTimestamp,
    mineNextBlockWithTimestamp,
    evmSnapshot,
    evmRevert,
} = require("./BaseTest");

const getLoanContractFromAddress = async function (address, signer) {
    return ethers.getContractAt("HumaLoan", address, signer);
};

// Let us limit the depth of describe to be 2.
//
//
// Numbers in Google Sheet: more detail: (shorturl.at/dfqrT)
describe("Base Credit Pool", function () {
    let poolContract;
    let poolConfigContract;
    let hdtContract;
    let humaConfigContract;
    let feeManagerContract;
    let testTokenContract;
    let proxyOwner;
    let poolOwner;
    let lender;
    let borrower;
    let treasury;
    let evaluationAgent;
    let protocolOwner;
    let eaNFTContract;
    let eaServiceAccount;
    let pdsServiceAccount;
    let record;
    let recordStatic;
    let poolOperator;
    let poolOwnerTreasury;
    let sId;
    let zkBob;

    before(async function () {
        [
            defaultDeployer,
            proxyOwner,
            lender,
            borrower,
            treasury,
            evaluationAgent,
            poolOwner,
            protocolOwner,
            eaServiceAccount,
            pdsServiceAccount,
            poolOperator,
            poolOwnerTreasury,
        ] = await ethers.getSigners();

        [humaConfigContract, feeManagerContract, testTokenContract, eaNFTContract] =
            await deployContracts(
                poolOwner,
                treasury,
                lender,
                protocolOwner,
                eaServiceAccount,
                pdsServiceAccount
            );

        [hdtContract, poolConfigContract, poolContract] = await deployAndSetupPool(
            poolOwner,
            proxyOwner,
            evaluationAgent,
            lender,
            humaConfigContract,
            feeManagerContract,
            testTokenContract,
            0,
            eaNFTContract,
            false, // BaseCreditPool
            poolOperator,
            poolOwnerTreasury
        );

        await poolConfigContract.connect(poolOwner).setWithdrawalLockoutPeriod(90);
        await poolConfigContract.connect(poolOwner).setPoolDefaultGracePeriod(60);

        // add ZkBobDirectDeposit
        const zkBobDirectDeposit = await ethers.getContractFactory("ZkBobDirectDeposit");
        zkBob = await zkBobDirectDeposit.deploy(poolContract.address);
        await zkBob.deployed();
    });

    beforeEach(async function () {
        sId = await evmSnapshot();
    });

    afterEach(async function () {
        if (sId) {
            const res = await evmRevert(sId);
        }
    });

    describe("DirectDeposit", function () {
        beforeEach(async function () {
            await poolContract.connect(borrower).requestCredit(toToken(1_000_000), 30, 12);
        });

        it("Direct Deposit to ZKBob address", async function () {
            await poolContract
                .connect(eaServiceAccount)
                .approveCredit(zkBob.address, toToken(1_000_000), 30, 12, 1217);
            expect(await poolContract.isApproved(zkBob.address)).to.equal(true);

            // let zkAddress = arrayify();

            const zkAddress = Buffer.from(
                "QsnTijXekjRm9hKcq5kLNPsa6P4HtMRrc3RxVx3jsLHeo2AiysYxVJP86mriHfN",
                "utf8"
            );

            await zkBob
                .connect(borrower)
                .directDeposit(borrower.address, toToken(1_000_000), zkAddress);
        });
    });
});
