const { ethers } = require("hardhat");

async function main() {
  const ContractFactory = await ethers.getContractFactory("TemperatureStorage")
  const tempStorage = await ContractFactory.deploy()
  await tempStorage.waitForDeployment()
  console.log(await tempStorage.getAddress())
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
