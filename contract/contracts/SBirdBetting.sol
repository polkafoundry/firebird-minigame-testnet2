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
import "./interface/INFTEpicWar.sol";
import "./TransferHelper.sol";

contract NFTWEscrow is
  Initializable,
  OwnableUpgradeable,
  ERC165Upgradeable,
  INFTEscrow,
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
  uint256 private maxBetAmount;
  address public fundWallet;

  // user address => match ID => bet type => match beting detail
  // bet type: hdc45 ou45 odds45 hdc90 ou90 odds90
  // bet place: 
  //            hdc:  home away
  //            ou:   over under
  //            odds: home draw away
  mapping(address => mapping(uint16 => mapping(string => UserBetDetail))) public userBettingInMatch;
  struct UserBetDetail {
    uint256 totalAmount;
    uint256[] betAmount;
    string[] betPlace;
  }

  // user match ID => bet type => bet statistics
  mapping(uint16 => mapping(string => string[])) public betStatistics;


  mapping(address => uint256) public TokenClaimTimeStamp;
  mapping(address => uint256) public TokenClaimNonces;

function __SBirdBetting_init(address _token, address _fundWallet,) public initializer {
  require(_token != address(0), "Betting token address not found");
  __Ownable_init();
  _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  _setupRole(OWNER_ROLE, msg.sender);
  BETTING_TOKEN_ADDRESS = _token;
  fundWallet = _fundWallet;

}

function setBetStatistics(uint16 matchID, string betType, string[] statistics) external onlyRole(DEFAULT_ADMIN_ROLE) {
  require(statistics.length === 3, "Bet statistics is incorrect");
  betStatistics[matchID][betType] = statistics;

  emit UpdateBetStatistics(matchID, betType, statistics);
}

function betting(uint16 matchID, uint256 amount, string betType, string betPlace)
        external
        virtual
        nonReentrant
    {
        require(EPIC_ERC20_ADDR != address(0), "Rewards token not set");
        require(userBettingInMatch[matchID][betType] + amount <= maxBetAmount, "Exceed amount in bet");
        
        userBettingInMatch[matchID][betType].totalAmount += amount;
        userBettingInMatch[matchID][betType].betAmount.push(amount);
        userBettingInMatch[matchID][betType].betPlace.push(betPlace);

        IERC20Upgradeable(BETTING_TOKEN_ADDRESS).transferFrom(msg.sender, fundWallet, amount);

        emit UserBetting(msg.sender, matchID, amount, betType, betPlace);
    }

  function tokenClaim(
    string matchID,
    uint256 amount,
    EIP712Signature calldata _signature
  ) external nonReentrant {
    require(amount > 0, "Amount is incorrect");
    require(_signature.deadline == 0 || _signature.deadline >= block.timestamp, "Signature expired");
    require((TokenClaimTimeStamp[msg.sender] + spacerTime) <= block.timestamp, "Claim within spacer time");

    bytes32 domainSeparator = _calculateDomainSeparator();
    bytes32 digest = keccak256(
      abi.encodePacked(
        "\x19\x01",
        domainSeparator,
        keccak256(
          abi.encode(CLAIM_TOKEN_WITH_SIG_TYPEHASH, amount, TokenClaimNonces[msg.sender]++, _signature.deadline)
        )
      )
    );

    address recoveredAddress = ecrecover(digest, _signature.v, _signature.r, _signature.s);

    require(recoveredAddress == signer, "Signature invalid");

    IERC20Upgradeable(BETTING_TOKEN_ADDRESS).transferFrom(fundWallet, msg.sender, _amount);

    TokenClaimTimeStamp[msg.sender] = block.timestamp;

    emit UserClaim(matchID, amount, _signature.deadline);
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
          keccak256("EIP712Domain(string name,string version,address verifyingContract)"),
          keccak256(bytes("EpicGame")),
          keccak256(bytes("1")),
          address(this)
        )
      );
  }

  function _transfer(
    address from,
    address to,
    uint256 amount
  ) internal {
    IERC20Upgradeable(currency).transferFrom(from, to, _amount);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165Upgradeable, AccessControlUpgradeable)
    returns (bool)
  {
    return interfaceId == type(INFTEscrow).interfaceId || super.supportsInterface(interfaceId);
  }

function grantAdminRole(address account)
    external
    onlyRole(OWNER_ROLE)
  {
    grantRole(DEFAULT_ADMIN_ROLE, account);
  }

function revokeAdminRole(address account)
    external
    onlyRole(OWNER_ROLE)
  {
    revokeRole(DEFAULT_ADMIN_ROLE, account);
  }
}
