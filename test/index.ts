import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Chese', function () {
  let Chese: any, chese: any;
  it('Should return number (0) of active listings to test init', async function () {
    Chese = await ethers.getContractFactory('Chese');
    chese = await Chese.deploy();
    await chese.deployed();

    expect(await chese.getNumActiveListings()).to.equal(0);
  });
  it('Should create one new listing', async function () {
    chese.createListing(
      'awesomenft',
      3,
      103337611933110337448161440806560268112476320183319594419260887126346274177025,
      0x495f947276749ce646f68ac8c248420045cb7b5e,
    );

    expect(await chese.getNumActiveListings()).to.equal(1);

    const listings = await chese.listings;
    expect(listings[0].name).to.equal('awesomenft');
  });
});
