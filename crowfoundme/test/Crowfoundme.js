const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowfoundme", function () {
    let contract, owner;
    before(async () =>{
        [owner] = await ethers.getSigners();
        const TestContract = await ethers.getContractFactory("Crowfoundme");
        contract = await TestContract.deploy(owner, address, );
    })

    it("Addition should work", async function () {
        // Create the smart contract object to test from
        // Get output from functions
        
    });
});