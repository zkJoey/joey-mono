// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import "./BaseCreditPool.sol";

import "hardhat/console.sol";

/**
 * @notice Custodian contract to manage custody of the borrower's account
 */
contract Custodian {
    BaseCreditPool public baseCreditPool;
    address borrowerContract;

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
        borrowerContract = borrower;
        // takeover the account based on certain conditions
        // borrowerContract.receiveOwnership() of the borrowers account
        // once full credit amount has been recovered, the ownership is transferred back to the borrower
    }

    /**
     * @notice Transfers ownership of the credit wallet back to the borrower after credit amount has been fully recoverd
     * @param borrower address of the borrower to takeover
     */
    function recover(address borrower) external {
        // check if credit is fully repaid
        require(baseCreditPool.isFullyPaid(borrower));
        // borrowerContract.transferOwnership(borrower)
    }
}
