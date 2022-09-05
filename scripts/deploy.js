import Certificate from '../contracts/Certificate';
import { eethers }
const hre = require("hardhat");

async function main() {


  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();

  await certificate.deployed();

  console.log(
    `Certificate smart contract deployed to ${certificate.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
