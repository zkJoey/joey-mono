// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import "./BaseCreditPool.sol";
// import "./zkBob/src/interfaces/IZkBobDirectDeposits.sol";

import "hardhat/console.sol";

/**
 * @notice ZKBobTransfer to direct deposit from the BaseCreditPool to a ZKBob private address
 * https://docs.zkbob.com/resources/hackathons/zkbob-direct-deposits#izkbobdirectdeposits.sol
 */
contract ZkBobDirectDeposit {
    using SafeERC20 for IERC20;
    BaseCreditPool public baseCreditPool;

    constructor(address _baseCreditPool) {
        baseCreditPool = BaseCreditPool(_baseCreditPool);
    }

    /**
     * @notice Performs a direct deposit to the specified zk address.
     * In case the deposit cannot be processed, it can be refunded later to the fallbackReceiver address.
     * @param fallbackReceiver receiver of deposit refund.
     * @param amount direct deposit amount.
     * @param zkAddress receiver zk address.
     * @return depositId id of the submitted deposit to query status for.
     */
    function directDeposit(
        address fallbackReceiver,
        uint256 amount,
        bytes memory zkAddress
    ) external returns (uint256 depositId) {
        baseCreditPool.drawdown(amount, address(this));
        // IERC20 bob = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);
        // IZkBobDirectDeposits queue = IZkBobDirectDeposits(
        //     0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289
        // );

        // bytes memory zkAddress = bytes(
        //     "QsnTijXekjRm9hKcq5kLNPsa6P4HtMRrc3RxVx3jsLHeo2AiysYxVJP86mriHfN"
        // );

        // address fallbackReceiver = msg.sender;

        // // Option A, through pool contract
        // // Note that ether is an alias for 10**18 multiplier, as BOB token has 18 decimals
        // bob.approve(address(queue), 100 ether);
        // uint256 depositId = queue.directDeposit(fallbackReceiver, 100 ether, zkAddress);
        // console.log("Deposit ID: %s", depositId);
    }
}
