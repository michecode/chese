import * as React from 'react';
import { Link, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Gradient from '../images/iridescent-gradient.png';
import SkatePic from '../images/skatepic.jpg';
import CharOne from '../images/char1.jpg';
import CharTwo from '../images/char2.jpg';
import CharThree from '../images/char3.jpg';
import WackGroup from '../images/wackgroup.png';
import EthDollars from '../images/ethdollars.png';
import CMCLogo from '../images/cmc-logo.png';
import CoinbaseLogo from '../images/coinbase-logo.png';
import KrakenLogo from '../images/kraken-logo.png';
import ZKSyncLogo from '../images/zksync-logo.png';
import StakeFishLogo from '../images/stakefish-logo.png';

const Index: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Layout path={props.path}>
      <img
        src={Gradient}
        className="absolute top-0 left-0 -z-10 w-screen h-screen"
      />
      <div className="flex items-center h-[calc(100vh-154px)]">
        <h1 className="text-white text-6xl ml-[8%] mr-64">
          Trade digital art
          <br /> created by curated artists
        </h1>
        <div className="w-1/4 mr-[8%] ml-8">
          <Link to="/marketplace/sample">
            <img
              src={SkatePic}
              className="bg-white hover:bg-black p-4 rounded-3xl"
            />
          </Link>
          <div className="bg-white p-4 rounded-2xl mt-4 flex">
            <span className="text-xl w-2/3">
              Skateboarding: Culture in Motion #57
            </span>
            <span className="text-3xl my-auto">0.75 ETH</span>
          </div>
        </div>
      </div>
      <div className="my-36 mx-auto w-10/12 flex flex-col">
        <h1 className="text-7xl mx-auto">
          No algorithmically generated collections
        </h1>
        <p className="text-xl mx-auto mt-8">
          No repeating monkeys, at Chese we want to empower artists; not
          algorithms
        </p>
        <div className="flex justify-around mt-20">
          <div className="flex flex-col">
            <img src={CharOne} />
            <p className="mx-auto">Character #9432</p>
          </div>
          <div className="flex flex-col">
            <img src={CharTwo} />
            <p className="mx-auto">Character #3267</p>
          </div>
          <div className="flex flex-col">
            <img src={CharThree} />
            <p className="mx-auto">Character #1372</p>
          </div>
        </div>
      </div>
      <div className="flex w-10/12 mx-auto relative">
        <div className="w-1/3">
          <h1 className="text-6xl">Buy NFT Slices</h1>
          <p className="text-2xl mt-32 w-10/12">
            Art is for everyone. We are determined to make sure that even the
            smallest of accounts can be apart of the largest NFT events.
          </p>
          <p className="text-2xl mt-16 w-10/12">
            On Chese, artists can &apos;slice&apos; their artwork and split
            ownership up to 1000 times.
          </p>
          <Link to="/">
            <p className="underline text-xl after:content-['_↗'] text-right mt-8 mr-20">
              Learn More
            </p>
          </Link>
        </div>
        <img src={WackGroup} className="absolute -right-32" />
      </div>
      <div className="flex flex-col mt-80">
        <h1 className="text-6xl text-right mr-16">
          All possible with fees below $1
        </h1>
        <div className="flex justify-end">
          <img src={EthDollars} className="mr-48 mt-8" />
          <div className="w-1/3 mr-16 mt-16">
            <p className="text-2xl mt-16">
              We&apos;re partnering with zkSync to launch onto their rollup
              early. Thanks to their hard work, you can trade quickly with gas
              fees below a dollar.
            </p>
            <p className="text-2xl mt-16">
              We have reduced barriers to entry significantly with slices and
              layer 2 technology.{' '}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="ml-24 my-16 text-6xl">Backed by your favorites</h1>
        <div className="flex justify-around items-center w-11/12 mx-auto">
          <img src={CoinbaseLogo} className="w-1/5" />
          <img src={KrakenLogo} className="w-1/5" />
          <img src={CMCLogo} className="w-1/5" />
        </div>
        <div className="flex justify-around items-center mt-8">
          <img src={ZKSyncLogo} className="w-1/5" />
          <img src={StakeFishLogo} className="w-1/5" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
