// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  if (false) {
    const Chese = await ethers.getContractFactory('Chese');
    const chese = await Chese.deploy();

    await chese.deployed();

    console.log('Chese deployed to: ', chese.address);
  } else {
    const CheseNFTs = await ethers.getContractFactory('CheseNFTs');
    const cheseNfts = await CheseNFTs.deploy();

    await cheseNfts.deployed();

    console.log('Chese NFT Minter deployed to: ', cheseNfts.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
