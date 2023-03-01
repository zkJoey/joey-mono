// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import "./interfaces/IZkBobDirectDeposits.sol";
import "./BaseCreditPool.sol";

import "hardhat/console.sol";

/**
 * @notice ZKBobTransfer to direct deposit from the BaseCreditPool to a ZKBob private address
 * https://docs.zkbob.com/resources/hackathons/zkbob-direct-deposits#izkbobdirectdeposits.sol
 */
contract ZkBobDirectDeposit is IZkBobDirectDeposits {
    using SafeERC20 for IERC20;
    BaseCreditPool baseCreditPool;

    constructor(address baseCreditPool) {
        baseCreditPool = BaseCreditPool(baseCreditPool);
    }

    /**
     * @notice Retrieves the direct deposits from the queue by its id.
     * @param depositId id of the submitted deposit.
     * @return deposit recorded deposit struct
     */
    function getDirectDeposit(uint256 depositId)
        external
        view
        override
        returns (DirectDeposit memory deposit)
    {}

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
    ) external override returns (uint256 depositId) {
        baseCreditPool.drawdown(amount, address(this));
        IERC20 bob = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);
        IZkBobDirectDeposits queue = IZkBobDirectDeposits(
            0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289
        );

        // Option A, through pool contract
        // Note that ether is an alias for 10**18 multiplier, as BOB token has 18 decimals
        bob.approve(address(queue), amount);
        uint256 depositId = queue.directDeposit(fallbackReceiver, amount, zkAddress);
        console.log("depositId", depositId);

        // Option B, through ERC677 token interface
        // bob.transferAndCall(address(queue), 100 ether, abi.encode(fallbackReceiver, zkAddress));
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
        string memory zkAddress
    ) external override returns (uint256 depositId) {}

    /**
     * @notice ERC677 callback for performing a direct deposit.
     * Do not call this function directly, it's only intended to be called by the token contract.
     * @param from original tokens sender.
     * @param amount direct deposit amount.
     * @param data encoded address pair - abi.encode(address(fallbackReceiver), bytes(zkAddress))
     * @return ok true, if deposit of submitted successfully.
     */
    function onTokenTransfer(
        address from,
        uint256 amount,
        bytes memory data
    ) external override returns (bool ok) {}

    /**
     * @notice Tells the direct deposit fee, in zkBOB units (9 decimals).
     * @return fee direct deposit submission fee.
     */
    function directDepositFee() external view override returns (uint64 fee) {}

    /**
     * @notice Tells the timeout after which unprocessed direct deposits can be refunded.
     * @return timeout duration in seconds.
     */
    function directDepositTimeout() external view override returns (uint40 timeout) {}

    /**
     * @notice Tells the nonce of next direct deposit.
     * @return nonce direct deposit nonce.
     */
    function directDepositNonce() external view override returns (uint32 nonce) {}

    /**
     * @notice Refunds specified direct deposit.
     * Can be called by anyone, but only after the configured timeout has passed.
     * Function will revert for deposit that is not pending.
     * @param index deposit id to issue a refund for.
     */
    function refundDirectDeposit(uint256 index) external override {}

    /**
     * @notice Refunds multiple direct deposits.
     * Can be called by anyone, but only after the configured timeout has passed.
     * Function will do nothing for non-pending deposits and will not revert.
     * @param indices deposit ids to issue a refund for.
     */
    function refundDirectDeposit(uint256[] memory indices) external override {}
}
