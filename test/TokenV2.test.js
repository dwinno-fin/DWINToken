const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DWINToken Contract", function () {
    let DWINToken, dwinToken, owner, addr1, addr2;

    beforeEach(async function () {
        // Deploy the contract
        DWINToken = await ethers.getContractFactory("DWINTokenV2");
        [owner, addr1, addr2] = await ethers.getSigners();
        dwinToken = await DWINToken.deploy("USD DWIN", "USDDW");
    });

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            expect(await dwinToken.owner()).to.equal(owner.address);
        });

        it("Should initialize with the correct name and symbol", async function () {
            expect(await dwinToken.name()).to.equal("USD DWIN");
            expect(await dwinToken.symbol()).to.equal("USDDW");
        });
    });

    describe("Minting", function () {
        it("Should allow the owner to mint tokens", async function () {
            await dwinToken.mint(addr1.address, 1000);
            expect(await dwinToken.balanceOf(addr1.address)).to.equal(1000);
        });

        it("Should fail if a non-owner tries to mint tokens", async function () {
            await expect(dwinToken.connect(addr1).mint(addr1.address, 1000)).to.be.revertedWithCustomError();
        });

        it("Should not allow minting to a blacklisted address", async function () {
            await dwinToken.blacklist(addr1.address);
            await expect(dwinToken.mint(addr1.address, 1000)).to.be.revertedWith("DWINToken: address is blacklisted");
        });
    });

    describe("Burning", function () {
        it("Should allow the owner to burn tokens", async function () {
            await dwinToken.mint(owner.address, 1000);
            await dwinToken.burn(500);
            expect(await dwinToken.balanceOf(owner.address)).to.equal(500);
        });

        it("Should fail if a non-owner tries to burn tokens", async function () {
            await expect(dwinToken.connect(addr1).burn(1000)).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Blacklist", function () {
        it("Should allow the owner to blacklist an address", async function () {
            await dwinToken.blacklist(addr1.address);
            expect(await dwinToken.isBlacklisted(addr1.address)).to.be.true;
        });

        it("Should prevent blacklisted addresses from receiving tokens", async function () {
            await dwinToken.blacklist(addr1.address);
            await dwinToken.mint(owner.address, 1000);
            await expect(dwinToken.transfer(addr1.address, 500)).to.be.revertedWith("DWINToken: address is blacklisted");
        });

        it("Should prevent blacklisted addresses from sending tokens", async function () {
            await dwinToken.mint(addr1.address, 1000);
            await dwinToken.blacklist(addr1.address);
            await expect(dwinToken.connect(addr1).transfer(addr2.address, 500)).to.be.revertedWith("DWINToken: address is blacklisted");
        });
    });

    describe("Pausing", function () {
        it("Should allow the owner to pause the contract", async function () {
            await dwinToken.pause();
            expect(await dwinToken.paused()).to.be.true;
        });

        it("Should prevent transfers while paused", async function () {
            await dwinToken.mint(owner.address, 1000);
            await dwinToken.pause();
            await expect(dwinToken.transfer(addr1.address, 500)).to.be.revertedWith("Pausable: paused");
        });

        it("Should allow the owner to unpause the contract", async function () {
            await dwinToken.pause();
            await dwinToken.unpause();
            expect(await dwinToken.paused()).to.be.false;
        });
    });

    describe("Transfers", function () {
        it("Should allow transfers between non-blacklisted addresses", async function () {
            await dwinToken.mint(owner.address, 1000);
            await dwinToken.transfer(addr1.address, 500);
            expect(await dwinToken.balanceOf(addr1.address)).to.equal(500);
        });

        it("Should fail if sender or receiver is blacklisted", async function () {
            await dwinToken.mint(owner.address, 1000);
            await dwinToken.blacklist(addr1.address);
            await expect(dwinToken.transfer(addr1.address, 500)).to.be.revertedWith("DWINToken: address is blacklisted");
        });
    });
});
