const chai = require("chai");
const {upgrades, ethers, waffle} = require("hardhat");
const {utils, BigNumber, BigNumberish} = ethers;
const {assert, expect} = chai;

const {fromRpcSig} = require("ethereumjs-util");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const toWei = (value) => utils.parseEther(value.toString());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const  {signNftWithdrawalBackend, signTokenWithdrawalBackend, signTokenClaimBackend} = require("./util");

describe("GameContract", function () {
  let deployer;
  let artist;
  let epicNFT;
  let token;
  let gameContract;
  let signer;
  let uri;

  beforeEach(async () => {
      [deployer,signer,signer1 ,artist, gamer1, gamer2, gamer3, ] = await ethers.getSigners();

      
      const EpicWar = await ethers.getContractFactory("EpicWarNFTTest");
      epicNFT = await EpicWar.deploy(artist.address);
      await epicNFT.deployed();
      uri = "https";
     
      const TokenTest = await ethers.getContractFactory("TokenTest");
      token = await TokenTest.deploy();
      await token.deployed();
      const GameContract = await ethers.getContractFactory("NFTWEscrow");
      gameContract = await (
          await upgrades.deployProxy(
              // @ts-ignore
              GameContract,
              [token.address, epicNFT.address],
              {initializer: "__NFTWEscrow_init"}
          )
      ).deployed();
      console.log("Game contract deployed to:", gameContract.address);
      await gameContract.connect(deployer).setSigner(signer.address);
      // Grant mint role for game contract
      await epicNFT.connect(deployer).grantMinterRole(gameContract.address)
      await epicNFT.connect(deployer).grantMinterRole(artist.address)
  });

    describe("Deposit NFT ", function () {
      let nft1;
      let nft2;
      let nft3;
      beforeEach(async () => {
         nft1 = await epicNFT.connect(artist).createToken(uri);
         nft2 = await epicNFT.connect(artist).createToken(uri);
         nft3 = await epicNFT.connect(artist).createToken(uri);
        
         await epicNFT.connect(artist).approve(gameContract.address, 1);
         await epicNFT.connect(artist).approve(gameContract.address, 2);
         await epicNFT.connect(artist).approve(gameContract.address, 3);
      });

      it("should not deposit if empty tokenid array", async () => {
          expect(
            gameContract
                  .connect(deployer)
                  .depositNft([])
          ).eventually.rejectedWith("E1");
      });

      it("should deposit a tokenid array", async () => {
        
          await gameContract.connect(artist).depositNft([1, 2, 3])
          expect(await epicNFT.ownerOf(1)).to.eq(gameContract.address);
          expect(await epicNFT.ownerOf(2)).to.eq(gameContract.address);
          expect(await epicNFT.ownerOf(3)).to.eq(gameContract.address);
      });

      it("should not deposit others people token ", async () => {
        expect(
          gameContract
                .connect(gamer1)
                .depositNft([1])
        ).eventually.rejectedWith("E2");
      });

      it("should receive events of deposit nft", async () => {

          const tx = await gameContract
              .connect(artist)
              .depositNft([1,2,3])
          const receipt = await tx.wait()

          assert(Array.isArray(receipt.events))
          const depositEvent = receipt.events.find((ev) => {return 'NFTDeposited' === ev.event})
          assert.isNotNull(depositEvent, 'depositEvent should not be null')

          const decodedData = depositEvent.decode(depositEvent.data, depositEvent.topics)
          const decodedTokenIds = decodedData[0].map((tokenId) => tokenId.toNumber())
          const decodedUser = decodedData[1]
          assert(decodedTokenIds.length === 3)
          assert(decodedTokenIds.includes(1) && decodedTokenIds.includes(2) && decodedTokenIds.includes(3))
          assert(decodedUser === artist.address)
      })
    });

    describe("Deposit Token ", function () {
     
      beforeEach(async () => {
        await token
                .connect(deployer)
                .transfer(
                    gamer1.address,
                    BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
                );
        
          await token
                .connect(gamer1)
                .approve(
                    gameContract.address,
                    BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
                );
      });

      it("should not deposit if currency is not epic token", async () => {
          expect(
            gameContract
                  .connect(gamer1)
                  .depositToken(utils.parseEther("100").toString(), epicNFT.address)
          ).eventually.rejectedWith("E3");
      });

      it("should not deposit if currency is not epic token", async () => {
        expect(
          gameContract
                .connect(gamer1)
                .depositToken(utils.parseEther("100").toString(), epicNFT.address)
        ).eventually.rejectedWith("E3");
      });

      it("should deposit if currency correct", async () => {
        await gameContract
                .connect(gamer1)
                .depositToken(utils.parseEther("100").toString(), token.address);

        expect(
                  (parseFloat(utils.formatEther((await token.balanceOf(gameContract.address))))
                  )).to.eq(100);
      });

    });


    describe("Withdraw  NFT ", function () {
      
        beforeEach(async () => {
         nft1 = await epicNFT.connect(artist).createToken(uri);
         nft2 = await epicNFT.connect(artist).createToken(uri);
         nft3 = await epicNFT.connect(artist).createToken(uri);
         
         await epicNFT.connect(artist).approve(gameContract.address, 1);
         await epicNFT.connect(artist).approve(gameContract.address, 2);
         await epicNFT.connect(artist).approve(gameContract.address, 3);

         await gameContract.connect(artist).depositNft(["1", "2", "3"])
        });

        it("should  withdraw with signature", async () => {
          const transactionId = 1 // fake
          const sig2 = await signNftWithdrawalBackend(gameContract,artist.address,deployer.address,[1,2,3], signer);
          await gameContract
                    .connect(artist)
                    .nftWithdrawal([1,2,3], transactionId, sig2);
          expect(await epicNFT.ownerOf(1)).to.eq(artist.address);
          expect(await epicNFT.ownerOf(2)).to.eq(artist.address);
          expect(await epicNFT.ownerOf(3)).to.eq(artist.address);
             
        });

        it("shoud withdraw in case having to mint new nft", async () => {
            const transactionId = 1 // fake
            const sig2 = await signNftWithdrawalBackend(gameContract,artist.address,deployer.address,[1,2,3,4], signer);
            // nft4 is dropped item, it need to mint
            await gameContract
                .connect(artist)
                .nftWithdrawal([1,2,3,4], transactionId, sig2);
            expect(await epicNFT.ownerOf(1)).to.eq(artist.address);
            expect(await epicNFT.ownerOf(2)).to.eq(artist.address);
            expect(await epicNFT.ownerOf(3)).to.eq(artist.address);
            expect(await epicNFT.ownerOf(4)).to.eq(artist.address);
        })

    });

    describe("Withdraw  Token ", function () {
      
      beforeEach(async () => {
        await token
        .connect(deployer)
        .transfer(
            gamer1.address,
            BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
        );

        await token
              .connect(gamer1)
              .approve(
                  gameContract.address,
                  BigNumber.from(1000).mul(BigNumber.from(10).pow(18))
              );

        await gameContract
              .connect(gamer1)
              .depositToken(utils.parseEther("100").toString(), token.address);

      });

      it("should  withdraw token with signature", async () => {
        const transactionId = 1 // fake
        const sig2 = await signTokenWithdrawalBackend(gameContract,gamer1.address,deployer.address,utils.parseEther("50").toString(), signer);
        await gameContract
                  .connect(gamer1)
                  .tokenWithdrawal(utils.parseEther("50").toString(), transactionId, sig2);

        expect(
          (parseFloat(utils.formatEther((await token.balanceOf(gamer1.address))))
          )).to.eq(950);
           
      });
  });
});