// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBirdToken is ERC20, AccessControl, Ownable {
    
    mapping(address => bool) private whitelistAddress;

    constructor() ERC20("SBird Token", "SBird") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, 1000000000 * 10**uint256(18));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if (from != address(0) && to != address(0)) {
            require(whitelistAddress[from] || whitelistAddress[to], "Can not transfer token");
        }

        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setAdminRole(address addr) public onlyOwner {
        _setupRole(DEFAULT_ADMIN_ROLE, addr);
    }

    function setWhitelistAddress(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelistAddress[addr] = true;
    }

    function checkWhitelistAddress(address addr) public view onlyOwner returns (bool) {
        return whitelistAddress[addr];
    }
}