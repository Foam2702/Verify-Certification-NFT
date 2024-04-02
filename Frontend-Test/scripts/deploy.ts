import { ethers } from "hardhat"

async function main() {
    console.log("IN MAIn")
    const SoundboundToken = await ethers.getContractFactory('SoundboundToken')
    const soundboundToken = await SoundboundToken.deploy()
    await soundboundToken.deployed();
    console.log("Deployed to", soundboundToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});