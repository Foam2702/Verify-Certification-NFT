import { expect } from 'chai';
import { ethers } from 'hardhat'

describe("VerifyCertificate", () => {
    it("Should do something", async () => {
        const VerifyCertificate = await ethers.getContractFactory('VerifyCertificate')
        const verifyCertificate = await VerifyCertificate.deploy()
        await verifyCertificate.deployed();
        const tokenURI = 'https://some-token.uri/'
    })
})