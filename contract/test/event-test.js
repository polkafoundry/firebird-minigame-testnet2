const chai = require("chai");
const {upgrades, ethers, waffle} = require("hardhat");
const {utils, BigNumber, BigNumberish} = ethers;
const {assert, expect} = chai;

const {fromRpcSig} = require("ethereumjs-util");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const toWei = (value) => utils.parseEther(value.toString());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const  {signKepClaimBackend} = require("./util");

describe("ClaimEvent3Contract", function () {
  let deployer;
  let artist;
  let epicNFT;
  let token;
  let gameContract;
  let signer;
  let uri;

  beforeEach(async () => {
      [deployer,signer ,artist, gamer1, gamer2, gamer3, ] = await ethers.getSigners();
     
      const TokenTest = await ethers.getContractFactory("TokenTest");
      token = await TokenTest.deploy();
      await token.deployed();

      const EventContract = await ethers.getContractFactory("EventEpicWar");
      eventContract = await (
          await upgrades.deployProxy(
              // @ts-ignore
              EventContract,
              [token.address],
              {initializer: "__EventEpicWar_init"}
          )
      ).deployed();
      await eventContract.connect(deployer).setSigner(signer.address);

  });

  describe("Claim  Token ", function () {
    beforeEach(async () => {
      await token
      .connect(deployer)
      .transfer(
        eventContract.address,
          ethers.utils.parseEther('10000')
      );

      await token
      .connect(deployer)
      .transfer(
          gamer1.address,
          ethers.utils.parseEther('1000')
      );
    });

    it("should claim token with signature", async () => {
      const transactionId = "199" // fake
        // Sign a 50 ETH claim
      const sig2 = await signKepClaimBackend(eventContract,gamer1.address,deployer.address,utils.parseEther("50").toString(), signer, transactionId);
      await eventContract
                .connect(gamer1)
                .claimToken(utils.parseEther("50").toString(), transactionId, sig2);

      expect(
        (parseFloat(utils.formatEther((await token.balanceOf(gamer1.address))))
        )).to.eq(1050);
         
    });

    it("should not claim token when amount exceeds balance", async () => {
      const transactionId = "1" // fake
      const sig2 = await signKepClaimBackend(eventContract,gamer1.address,deployer.address,utils.parseEther("1000").toString(), signer, transactionId);

      expect(
        eventContract
              .connect(gamer1)
              .claimToken(utils.parseEther("1500").toString(),transactionId, sig2)
      ).eventually.rejectedWith("E7");
         
    });
  });

});