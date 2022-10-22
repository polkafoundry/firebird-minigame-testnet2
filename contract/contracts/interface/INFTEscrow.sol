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

  event UpdateBetStatistics(uint16 matchID, string betType, string[] statistics);


  event UserBetting(address indexed user, uint16 matchID, uint256 amount, string betType, string betPlace);
  event UserClaim(uint16 matchID, uint256 amount, address indexed user, uint256 deadline);

}
