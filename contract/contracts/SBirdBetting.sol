// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "./interface/IBirdBetting.sol";

contract SBirdBetting is
    Initializable,
    OwnableUpgradeable,
    ERC165Upgradeable,
    IBirdBetting,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    ERC721HolderUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;
    address private BETTING_TOKEN_ADDRESS;
    address private signer;
    bytes32 private constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant CLAIM_TOKEN_WITH_SIG_TYPEHASH =
        keccak256("TokenClaim(uint256 amount,uint256 nonce,uint256 deadline)");
    uint256 private spacerTime;
    uint256 public maxBetAmount;
    address public fundWallet;

    // user address => match ID => bet type => match beting detail
    // bet type: hdc45 ou45 odds45 hdc90 ou90 odds90
    // bet place:
    //            hdc:  home away
    //            ou:   over under
    //            odds: home draw away
    mapping(address => mapping(uint16 => mapping(string => UserBetDetail)))
        public userBettingInMatch;
    struct UserBetDetail {
        uint256 totalAmount;
        uint256[] betAmount;
        string[] betPlace;
    }

    // match ID => bet type => bet statistics
    mapping(uint16 => mapping(string => uint16[])) public betStatistics;

    // user address => match ID => is claimed
    mapping(address => mapping(uint16 => bool)) public claimInMatch;

    // match ID => match info
    mapping(uint16 => MatchInfo) public matchByID;
    struct MatchInfo {
        uint16[3] ouStatistics;
        uint16[3] oddsStatistics;
        uint256 startTime;
        string homeName;
        uint8 homeScore;
        string awayName;
        uint8 awayScore;
    }

    // user address => match ID => is claimed
    mapping(address => mapping(uint16 => PredictResult))
        public userPredictByMatch;
    struct PredictResult {
        uint8 homeScore;
        uint8 awayScore;
        uint256 time;
    }

    mapping(address => uint256) public TokenClaimTimeStamp;
    mapping(address => uint256) public TokenClaimNonces;

    function __SBirdBetting_init(address _token, address _fundWallet)
        public
        initializer
    {
        require(_token != address(0), "Betting token address not found");
        __Ownable_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(OWNER_ROLE, msg.sender);
        BETTING_TOKEN_ADDRESS = _token;
        fundWallet = _fundWallet;
    }

    function setMatchInfo(
        uint16 _matchID,
        uint16[3] calldata _ouStatistics,
        uint16[3] calldata _oddsStatistics,
        uint256 _startTime,
        string calldata _homeName,
        uint8 _homeScore,
        string calldata _awayName,
        uint8 _awayScore
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_ouStatistics.length == 3, "OU statistics is incorrect");
        require(_oddsStatistics.length == 3, "ODDS statistics is incorrect");

        matchByID[_matchID] = MatchInfo(
            _ouStatistics,
            _oddsStatistics,
            _startTime,
            _homeName,
            _homeScore,
            _awayName,
            _awayScore
        );

        emit CreateMatch(
            _matchID,
            _ouStatistics,
            _oddsStatistics,
            _startTime,
            _homeName,
            _homeScore,
            _awayName,
            _awayScore
        );
    }

    function updateBetStatistics(
        uint16 _matchID,
        uint16[3] calldata _ouStatistics,
        uint16[3] calldata _oddsStatistics
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        MatchInfo storage mInfo = matchByID[_matchID];
        mInfo.ouStatistics = _ouStatistics;
        mInfo.oddsStatistics = _oddsStatistics;
        emit UpdateBetStatistics(_matchID, _ouStatistics, _oddsStatistics);
    }

    function predict(
        uint16 _matchID,
        uint8 _homeScore,
        uint8 _awayScore
    ) external virtual nonReentrant {
        MatchInfo storage mInfo = matchByID[_matchID];
        require(
            block.timestamp < mInfo.startTime,
            "Can predict before match start"
        );
        userPredictByMatch[msg.sender][_matchID] = PredictResult(
            _homeScore,
            _awayScore,
            block.timestamp
        );

        emit UserPredicting(
            msg.sender,
            _matchID,
            _homeScore,
            _awayScore,
            block.timestamp
        );
    }

    function betting(
        uint16 _matchID,
        uint256 _amount,
        string calldata _betType,
        string calldata _betPlace
    ) external virtual nonReentrant {
        require(BETTING_TOKEN_ADDRESS != address(0), "Rewards token not set");
        require(
            userBettingInMatch[msg.sender][_matchID][_betType].totalAmount +
                _amount <=
                maxBetAmount,
            "Exceed amount in bet"
        );

        MatchInfo storage mInfo = matchByID[_matchID];
        require(
            block.timestamp < mInfo.startTime,
            "Can predict before match start"
        );

        uint256[] storage newBetAmount = userBettingInMatch[msg.sender][
            _matchID
        ][_betType].betAmount;
        newBetAmount.push(_amount);
        string[] storage newBetPlace = userBettingInMatch[msg.sender][_matchID][
            _betType
        ].betPlace;
        newBetPlace.push(_betPlace);
        userBettingInMatch[msg.sender][_matchID][_betType] = UserBetDetail(
            userBettingInMatch[msg.sender][_matchID][_betType]
                .totalAmount += _amount,
            newBetAmount,
            newBetPlace
        );

        IERC20Upgradeable(BETTING_TOKEN_ADDRESS).transferFrom(
            msg.sender,
            fundWallet,
            _amount
        );
        claimInMatch[msg.sender][_matchID] = false;
        emit UserBetting(msg.sender, _matchID, _amount, _betType, _betPlace);
    }

    function tokenClaim(
        uint16 _matchID,
        uint256 _amount,
        EIP712Signature calldata _signature
    ) external nonReentrant {
        require(_amount > 0, "Amount is incorrect");
        require(claimInMatch[msg.sender][_matchID] == false, "Token claimed");
        require(
            _signature.deadline == 0 || _signature.deadline >= block.timestamp,
            "Signature expired"
        );
        require(
            (TokenClaimTimeStamp[msg.sender] + spacerTime) <= block.timestamp,
            "Claim within spacer time"
        );

        bytes32 domainSeparator = _calculateDomainSeparator();
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        CLAIM_TOKEN_WITH_SIG_TYPEHASH,
                        _amount,
                        TokenClaimNonces[msg.sender]++,
                        _signature.deadline
                    )
                )
            )
        );

        address recoveredAddress = ecrecover(
            digest,
            _signature.v,
            _signature.r,
            _signature.s
        );

        require(recoveredAddress == signer, "Signature invalid");

        IERC20Upgradeable(BETTING_TOKEN_ADDRESS).transferFrom(
            fundWallet,
            msg.sender,
            _amount
        );

        claimInMatch[msg.sender][_matchID] = true;
        TokenClaimTimeStamp[msg.sender] = block.timestamp;

        emit UserClaim(_matchID, _amount, msg.sender, _signature.deadline);
    }

    // signing key does not require high security and can be put on an API server and rotated periodically, as signatures are issued dynamically
    function setSigner(address _signer) external onlyRole(OWNER_ROLE) {
        signer = _signer;
    }

    function setSpacer(uint256 spacer) external onlyRole(OWNER_ROLE) {
        spacerTime = spacer;
    }

    function setMaxBetAmount(uint256 spacer) external onlyRole(OWNER_ROLE) {
        spacerTime = spacer;
    }

    function _calculateDomainSeparator() internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,address verifyingContract)"
                    ),
                    keccak256(bytes("EpicGame")),
                    keccak256(bytes("1")),
                    address(this)
                )
            );
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return
            interfaceId == type(IBirdBetting).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function grantAdminRole(address account) external onlyRole(OWNER_ROLE) {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function revokeAdminRole(address account) external onlyRole(OWNER_ROLE) {
        revokeRole(DEFAULT_ADMIN_ROLE, account);
    }
}
