const chai = require("chai");
const { upgrades, ethers, waffle } = require("hardhat");
const { utils, BigNumber, BigNumberish } = ethers;
const { assert, expect } = chai;

const { fromRpcSig } = require("ethereumjs-util");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const toWei = (value) => utils.parseEther(value.toString());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const { signTokenClaimBackend } = require("./util");

describe("GameContract", function () {
  let deployer;
  let artist;
  let epicNFT;
  let token;
  let betContract;
  let signer;
  let uri;
  let MAX_INT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  beforeEach(async () => {
    [deployer, signer, signer1, fundWallet, gamer1, gamer2, gamer3] = await ethers.getSigners();
    console.log("1");
    const TokenTest = await ethers.getContractFactory("SBirdToken");
    token = await TokenTest.deploy();
    await token.deployed();
    console.log("2");
    const BetContract = await ethers.getContractFactory("SBirdBetting");
    betContract = await (
      await upgrades.deployProxy(
        // @ts-ignore
        BetContract,
        [token.address, fundWallet.address],
        { initializer: "__SBirdBetting_init" }
      )
    ).deployed();
    console.log("Bet contract deployed to:", betContract.address);
    await betContract.connect(deployer).setSigner(signer.address);
    await betContract.connect(deployer).setMaxBetAmount("10000000000000000000");
    //set bet contract white list
    await token.connect(deployer).setWhitelistAddress(fundWallet.address);
    //approve contract

    await token.connect(deployer).transfer(fundWallet.address, "100000000000000000000000");

    await token.connect(fundWallet).approve(betContract.address, MAX_INT);
  });

  describe("Claim Token ", function () {
    it("should  withdraw token with signature", async () => {
      const sig2 = await signTokenClaimBackend(
        betContract,
        gamer1.address,
        deployer.address,
        "1",
        "ou-ht",
        utils.parseEther("50").toString(),
        signer
      );
      console.log(1);

      await betContract.connect(gamer1).tokenClaim(1, "ou-ht", utils.parseEther("50").toString(), sig2);
      expect(parseFloat(utils.formatEther(await token.balanceOf(gamer1.address)))).to.eq(50);
    });
  });
});
