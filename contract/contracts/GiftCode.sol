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
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interface/IBirdBetting.sol";
import "hardhat/console.sol";

contract SBirdGiftCode is
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
        keccak256(
            "TokenClaim(string caller,string code,uint256 amount,uint256 nonce,uint256 deadline)"
        );
    uint256 private spacerTime;
    address public fundWallet;

    mapping(address => mapping(string => bool)) public codeUseByUser;

    mapping(address => uint256) public TokenClaimTimeStamp;
    mapping(address => uint256) public TokenClaimNonces;

    event UserUseCode(
        string code,
        uint256 amount,
        address indexed user,
        uint256 deadline
    );

    function __SBirdGiftCode_init(address _token, address _fundWallet)
        public
        initializer
    {
        require(_token != address(0), "BIRD token address not found");
        __Ownable_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(OWNER_ROLE, msg.sender);
        BETTING_TOKEN_ADDRESS = _token;
        fundWallet = _fundWallet;
    }

    function useCode(
        string memory _code,
        uint256 _amount,
        EIP712Signature calldata _signature
    ) external nonReentrant {
        require(_amount > 0, "Amount is incorrect");
        require(!codeUseByUser[msg.sender][_code], "Code used");
        require(
            _signature.deadline == 0 || _signature.deadline >= block.timestamp,
            "Signature expired"
        );
        require(
            (TokenClaimTimeStamp[msg.sender] + spacerTime) <= block.timestamp,
            "Claim within spacer time"
        );
        console.log(_code);
        console.log(_amount);

        bytes32 domainSeparator = _calculateDomainSeparator();
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        CLAIM_TOKEN_WITH_SIG_TYPEHASH,
                        keccak256(
                            abi.encodePacked(
                                Strings.toHexString(uint160(msg.sender), 20)
                            )
                        ),
                        keccak256(abi.encodePacked(_code)),
                        _amount,
                        TokenClaimNonces[msg.sender]++,
                        _signature.deadline
                    )
                )
            )
        );
        console.log(
            ecrecover(digest, _signature.v, _signature.r, _signature.s)
        );
        console.log(signer);
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
            _amount * 1e18
        );
        codeUseByUser[msg.sender][_code] = true;
        TokenClaimTimeStamp[msg.sender] = block.timestamp;

        emit UserUseCode(_code, _amount, msg.sender, _signature.deadline);
    }

    // signing key does not require high security and can be put on an API server and rotated periodically, as signatures are issued dynamically
    function setSigner(address _signer) external onlyRole(OWNER_ROLE) {
        signer = _signer;
    }

    function getSigner() public view onlyRole(OWNER_ROLE) returns (address) {
        return signer;
    }

    function setSpacer(uint256 spacer) external onlyRole(OWNER_ROLE) {
        spacerTime = spacer;
    }

    function setFundAddress(address _fund) external onlyRole(OWNER_ROLE) {
        fundWallet = _fund;
    }

    function setTokenAddress(address _tokenAddress)
        external
        onlyRole(OWNER_ROLE)
    {
        BETTING_TOKEN_ADDRESS = _tokenAddress;
    }

    function _calculateDomainSeparator() internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,address verifyingContract)"
                    ),
                    keccak256(bytes("FirebirdGame")),
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
