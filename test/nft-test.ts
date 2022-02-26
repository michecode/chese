import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('PlantNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const Plants = await ethers.getContractFactory('Plants');
    const plants = await Plants.deploy();
    await plants.deployed();

    const recipient = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';

    let balance = await plants.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await plants.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await newlyMintedToken.wait();
    balance = await plants.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await plants.isContentOwned(metadataURI)).to.equal(true);
  });
});
