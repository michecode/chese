import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageProps } from 'gatsby';
import { useW3Context } from '../../components/Web3Provider';
import Layout from '../../components/Layout';
// import Listing from '../../components/Listing';
import Gradient from '../../images/iridescent-gradient.png';
import { ethers } from 'ethers';
import ListingCollection from '../../components/ListingCollection';
import { string } from 'hardhat/internal/core/params/argumentTypes';

const Index: React.FC<PageProps> = (props: PageProps) => {
  const W3C = useW3Context();

  const [listings, setListings] = useState<Listing[]>();

  useEffect(() => {
    const fetchListings = async () => {
      checkProvider();
      console.log(W3C.contract);
      const results = await W3C.contract?.fetchListings();
      console.log(results);
      setListings(results);
    };
    fetchListings();
  }, []);

  /*
  If wallet is connected. Contract should be updated.
  If not connected, reupdate contract with just the provider. I don't need a signer for reading.
  */
  const checkProvider = () => {
    if (W3C.connected) {
      return;
    } else {
      W3C.updateContractWithApiProvider();
      return;
    }
  };

  return (
    <Layout path={props.path}>
      <div className="mt-16 w-11/12 mx-auto">
        <ListingCollection
          dropState={false}
          setDropState={() => {}}
          isMarketpagePage={true}
          listings={listings}
          columns={7}
        />
      </div>
      <button onClick={() => console.log(listings)}>log nft</button>
    </Layout>
  );
};

export default Index;
