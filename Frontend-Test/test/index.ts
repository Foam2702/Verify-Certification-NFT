import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { constants as ethersConstants, Contract } from "ethers";
import { ethers } from "hardhat";


describe("SoundboundToken", () => {
    let soundboundToken:any;
    let signers;

    before(async () => {
        const SoundboundToken = await ethers.getContractFactory("SoundboundToken");
        console.log("Deploying SoundboundToken contract...");
        soundboundToken = await SoundboundToken.deploy();
        await soundboundToken.deployed();
        console.log("SoundboundToken contract deployed at address:", soundboundToken.address);

        signers = await ethers.getSigners();
        console.log("Signers:", signers.map(signer => signer.address));
    });
    
    describe("Recover Address", async () => {
        it("should recover the signer address from the provided signature", async function () {
            console.log("Test case: should recover the signer address from the provided signature");
            // Message hash and signature obtained from signing a message using a wallet
            const messageHash = "0x8a58b5f10e6e30361ef16513630edfc1b8994af04a61fec834ae5d212c219a27";
            const signature = "0xcb4271ac73d914feee37d810cb0ca908c71208d37bdeb8099c326aa16860794502841440552122b5a66098bac9c929faa0a69634ae7a1e1fbb934a5ed560ac401b"; // Example signature

            // Call the recover function
            console.log("Calling recover function with message hash:", messageHash, "and signature:", signature);
            const recoveredAddress = await soundboundToken.recover(messageHash, signature);
            console.log("Recovered address:", recoveredAddress);

            // Replace the next line with the address that signed the message
            const expectedAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

            // Check if the recovered address matches the expected address
            expect(recoveredAddress).to.equal(expectedAddress);
        });
    });
});
