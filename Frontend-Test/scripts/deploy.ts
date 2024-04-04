import { ethers } from "hardhat"

async function main() {
    console.log("IN MAIn")
    const SoulboundToken = await ethers.getContractFactory('SoulboundToken')
    const soulboundToken = await SoulboundToken.deploy()
    await soulboundToken.deployed();
    console.log("Deployed to", soulboundToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});