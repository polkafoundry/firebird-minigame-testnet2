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
import "./interface/INFTEscrow.sol";
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
  // user address => match ID => bet type => match beting detail
  // bet type: hdc45 ou45 odds45 hdc90 ou90 odds90
  // bet place: 
  //            hdc:  home away
  //            ou:   over under
  //            odds: home draw away
  mapping(address => mapping(uint16 => mapping(string => UserBetDetail))) public boxesByEvent;
  struct UserBetDetail {
    uint256 totalAmount;
    uint256[] betAmount;
    string[] betPlace;
  }

  // user match ID => bet type => bet statistics
  mapping(uint16 => mapping(string => string[])) public betStatistics;


  mapping(address => uint256) public TokenClaimTimeStamp;
  mapping(address => uint256) public TokenClaimNonces;

function __SBirdBetting_init(address _token) public initializer {
  require(_token != address(0), "Betting token address not found");
  __Ownable_init();
  _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  _setupRole(OWNER_ROLE, _msgSender());
  BETTING_TOKEN_ADDRESS = _token;
}

function setBetStatistics(uint16 matchID, string betType, string statistics) external onlyRole(DEFAULT_ADMIN_ROLE) {
  require(statistics.length === 3, "Bet statistics incorrect");
  betStatistics[matchID][betType] = statistics;
}

function betting(uint16 matchID, uint256 amount, string betType, string betPlace)
        external
        virtual
        nonReentrant
    {
        require(EPIC_ERC20_ADDR != address(0), "E3"); // E3: Rewards token not set
        require(EPIC_ERC20_ADDR == currency, "E3");
        _handleIncomingFund(amount, currency);

        emit TokenDeposited(amount, _msgSender());
    }

  function tokenWithdrawal(
    uint256 amount,
    string calldata transactionId,
    EIP712Signature calldata _signature
  ) external nonReentrant {
    require(amount > 0, "E10"); // E10: 0 amount
    require(_signature.deadline == 0 || _signature.deadline >= block.timestamp, "E5"); // E5: Signature expired
    require((TokenClaimTimeStamp[msg.sender] + spacerTime) <= block.timestamp, "withdraw within spacer time");
    require(amount > 0, "E10");

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

    require(recoveredAddress == signer, "E7"); // E7: signature invalid

    _handleOutgoingFund(_msgSender(), amount, BETTING_TOKEN_ADDRESS);

    TokenClaimTimeStamp[msg.sender] = block.timestamp;

    emit TokenWithdrawed(transactionId, amount, _msgSender(), _signature.deadline);
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

  function _handleOutgoingFund(
    address to,
    uint256 amount,
    address currency
  ) internal {
    if (currency == address(0)) {
      (bool isSuccess, ) = to.call{ value: amount }("");
      require(isSuccess, "Transfer failed: gas error");
    } else {
      IERC20Upgradeable(currency).safeTransfer(to, amount);
    }
  }

  function _msgSender() internal view virtual override returns (address) {
    return msg.sender;
  }

  function _msgData() internal view virtual override returns (bytes calldata) {
    return msg.data;
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
