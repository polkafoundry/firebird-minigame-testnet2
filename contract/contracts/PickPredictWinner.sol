//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PickWinner is
    VRFConsumerBase,
    ConfirmedOwner(msg.sender),
    AccessControl
{
    bytes32 private keyHash;
    uint256 private fee;
    uint256 public randoomm;
    uint256 public pickCount;

    mapping(bytes32 => uint16) private reqToMatch;
    mapping(uint16 => address[]) public listWinnerByMatch;
    mapping(uint16 => address) public winnerByMatch;

    event RequestRandomNumber(bytes32 requestId, uint16 matchID);
    event ReceiveRandomNumber(
        bytes32 requestId,
        uint256 matchID,
        uint256 result,
        address winner
    );

    constructor()
        VRFConsumerBase(
            0x3D9d7eFB320A09Bb9948668606CeE5F5DC4C34Fb,
            0x16e8Fe972c4bd58EB4fb56Df456BBa3dFb8dB80F
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        keyHash = 0x862875140400f368476af543e3dc9f5df7c16f8a77e9c04ee429fa7795fa1ae6;
        fee = 10000000000000000;
    }

    function getRandomNumber(uint16 _matchID)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Contract not enough LINK to pay fee"
        );
        require(
            winnerByMatch[_matchID] == address(0),
            "Cannot pick winner in match has winner"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        reqToMatch[requestId] = _matchID;
        emit RequestRandomNumber(requestId, _matchID);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        uint16 matchID = reqToMatch[requestId];
        randoomm = randomness;

        require(listWinnerByMatch[matchID].length > 0, "Not winner in match'");
        uint256 index = randomness % listWinnerByMatch[matchID].length;

        winnerByMatch[matchID] = listWinnerByMatch[matchID][index];

        pickCount++;

        emit ReceiveRandomNumber(
            requestId,
            matchID,
            randomness,
            listWinnerByMatch[matchID][index]
        );
    }

    function getWinnerInMatch(uint16 _matchID)
        public
        view
        returns (address[] memory)
    {
        return listWinnerByMatch[_matchID];
    }

    function setListWinnerInMatch(uint16 _matchID, address[] memory _winners)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        listWinnerByMatch[_matchID] = _winners;
    }

    function withdrawLINK(address to, uint256 value) public onlyOwner {
        require(LINK.transfer(to, value), "Not enough LINK");
    }

    function setKeyHash(bytes32 _keyHash) public onlyOwner {
        keyHash = _keyHash;
    }

    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function setAdminRole(address account) public onlyOwner {
        _setupRole(DEFAULT_ADMIN_ROLE, account);
    }
}
