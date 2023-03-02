// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import "./BaseCreditPool.sol";
// import "./zkBob/src/interfaces/IZkBobDirectDeposits.sol";

import "hardhat/console.sol";

/**
 * @notice Custodian contract to manage custody of the borrower's account
 */
contract Custodian {
    using SafeERC20 for IERC20;
    BaseCreditPool public baseCreditPool;

    constructor(address _baseCreditPool) {
        baseCreditPool = BaseCreditPool(_baseCreditPool);
    }

    /**
     * @notice Performs a takeover action on the borrower's account
     * @param borrower address of the borrower to takeover
     */
    function takeOver(address borrower) external {
        // check if credit defaulted
        require(baseCreditPool.isDefaultReady(borrower));
        // takeover the account based on certain conditions
        // takeOver(borrower);
    }
}
