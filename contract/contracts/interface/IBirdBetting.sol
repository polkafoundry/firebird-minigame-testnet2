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

    struct UserBetDetail {
        uint256 amount;
        string place;
        bool isClaimed;
    }

    struct MatchStatistics {
        uint16 ouHtOver;
        uint16 ouHtRatio;
        uint16 ouHtUnder;
        uint16 ouFtOver;
        uint16 ouFtRatio;
        uint16 ouFtUnder;
        uint16 oddsHtHome;
        uint16 oddsHtDraw;
        uint16 oddsHtAway;
        uint16 oddsFtHome;
        uint16 oddsFtDraw;
        uint16 oddsFtAway;
    }

    struct MatchInfo {
        uint8 ht_homeScore;
        uint8 ht_awayScore;
        uint8 ft_homeScore;
        uint8 ft_awayScore;
        uint256 startTime;
        string homeName;
        string awayName;
        string location;
        string round;
        bool isHalfTime;
        bool isFinished;
    }

    struct MatchData {
        MatchStatistics mSta;
        MatchInfo mInf;
    }

    struct PredictResult {
        uint8 homeScore;
        uint8 awayScore;
        uint256 time;
    }

    event CreateMatch(
        uint16 matchID,
        MatchStatistics mSta,
        MatchInfo mInf,
        uint256 sofaMatchID
    );

    event UpdateMatchStatistics(uint16 matchID, MatchStatistics mSta);

    event UpdateMatchInfo(uint16 matchID, MatchInfo mInf);

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
        string betPlace,
        bool claimed
    );
    event UserClaim(
        uint16 matchID,
        string betType,
        uint256 amount,
        address indexed user,
        uint256 deadline
    );
}

// [1740, 500, 2190, 1980, 2250, 1940, 4470, 2110, 2940, 3860, 3500, 2250]
// [0, 0, 1669219200, "QATAR", "ECUADOR", "Al Bayt Stadium", "WORLD CUP - ROUND 1"]
