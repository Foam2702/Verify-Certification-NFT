import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const RINKEBY_URL = process.env.RINKEBY_URL as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const SEPOLIA_URL = process.env.SEPOLIA_URL as string;
console.log("SEPOLIA URL:",SEPOLIA_URL);
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
