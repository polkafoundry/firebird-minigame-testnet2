// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IBirdBetting {
    struct EIP712Signature {
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    event CreateMatch(
        uint16 matchID,
        uint16[3] ouStatistics,
        uint16[3] oddsStatistics,
        uint256 startTime,
        string homeName,
        uint8 homeScore,
        string awayName,
        uint8 awayScore
    );
    event UpdateBetStatistics(
        uint16 matchID,
        uint16[3] ouStatistics,
        uint16[3] oddsStatistics
    );

    event UserPredicting(
        address indexed user,
        uint16 matchID,
        uint8 homeScore,
        uint8 awayScore,
        uint256 time
    );
    event UserBetting(
        address indexed user,
        uint16 matchID,
        uint256 amount,
        string betType,
        string betPlace
    );
    event UserClaim(
        uint16 matchID,
        uint256 amount,
        address indexed user,
        uint256 deadline
    );
}
