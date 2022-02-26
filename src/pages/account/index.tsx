import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Web3Context } from '../../components/Web3Provider';
import { PageProps } from 'gatsby';
import Layout from '../../components/Layout';
import Listing from '../../components/Listing';
import UnlistedNFT from '../../components/UnlistedNFT';
import ASpace from '../../images/arianespace.jpg';
import Preview from '../../components/Preview';
import Collection from '../../components/Collection';
import Listings from '../../components/Listings';
// import Gradient from '../../images/iridescent-gradient.png';

// const alchemyWeb3 = createAlchemyWeb3(
//   `https://eth-goerli.alchemyapi.io/v2/${process.env.GATSBY_ALCHEMY_KEY}`,
// );

// const alchemyUrl = `https://eth-goerli.alchemyapi.io/v2/${process.env.GATSBY_ALCHEMY_KEY}`;
const mnAlc = `https://eth-mainnet.alchemyapi.io/v2/pSfImfCndXbVYu10T1hcSyUkfzWm8AiV`;

const Index: React.FC<PageProps> = (props: PageProps) => {
  // const W3C = useW3Context();
  const W3C = useContext(Web3Context);
  // const [nfts, setNfts] = useState({
  //   ownedNfts: [{
  //     contract: {
  //       address: ''
  //     },
  //     id: {
  //       tokenId: ''
  //     },
  //     balance: 0
  //   }],
  //   totalCount: 0,
  //   blockHash: '',
  // });

  const placeholderNFTResponse = {
    ownedNfts: [
      {
        contract: {},
        description: '',
        id: {},
        media: [],
        metadata: {},
        timeLastUpdated: '',
        title: '',
        tokenUri: {},
      },
    ],
    blockHash: '',
    totalCount: 0,
  };

  const [nfts, setNfts] = useState(placeholderNFTResponse);
  const [dropListings, setDropListings] = useState(false);
  const [dropCollection, setDropCollection] = useState(true);
  const [creatingListing, setCreatingListing] = useState(false);
  const [mintingNft, setMintingNft] = useState(false);

  /*
  States below are for listing + minting states in controlled components
  */
  // const [listingName, set] = useState('');
  const [listingPrice, setListingPrice] = useState('1');
  const [listingTitle, setListingTitle] = useState('');
  const [mediaPreviewURL, setMediaPreviewURL] = useState('');
  const [listingContract, setListingContract] = useState('');
  const [slices, setSlices] = useState(1);
  const [, set] = useState('');

  // const ADDRESS = '0xFD424D0E0CD49D6AD8f08893CE0D53F8EAEB4213';
  const ADDRESS_ME = '0x6c5cae5Eb9d84880BC38B3c70D1Bf41b9f04142c';
  // Gallery.so PapaBearded
  const ADDRESS_PB = '0x1A53b8B97d76CB27E9c1Fb9a8087661E2D4842ba';
  // Gallery.so MDP
  const ADDRESS = '0xf9CaA0e790a9a89FBd84E0cf1B455eEb1dC50d1D';

  useEffect(() => {
    getNfts(ADDRESS);
  }, []);

  const appropiateTitle = () => {
    if (creatingListing) {
      return 'creating new listing';
    } else if (mintingNft) {
      return 'minting nft';
    } else {
      return 'hello';
    }
  };

  const getNfts = async (address: string) => {
    if (address != 'Not Connected') {
      console.log('Fetching all nfts for account: ' + address);
      console.log('FETCHING!!!! SLAY!!! PLEASE WAIT!!!');
      fetch(`${mnAlc}/getNFTs/?owner=${ADDRESS}`, {
        method: 'GET',
        redirect: 'follow',
      })
        .then((response) => response.json())
        // .then((response) => JSON.stringify(response, null, 2))
        .then((result) => setNfts(result))
        .catch((error) => console.log(error));
    } else {
      console.log('No account found. Not looking for NFTs');
    }
  };

  const logNfts = () => {
    console.log(nfts);
  };

  const selectNFT = (
    newMediaURL: string,
    newListingTitle: string,
    newListingContract: string,
  ) => {
    setMediaPreviewURL(newMediaURL);
    setListingTitle(newListingTitle);
    setListingContract(newListingContract);
    // setDropCollection(!dropCollection);
  };

  const onPriceChange = (newValue: string) => {
    setListingPrice(newValue);
  };

  return (
    <Layout path={props.path}>
      <div className="w-11/12 mx-auto mt-16">
        <div className="flex items-center">
          <h1 className="text-9xl mr-auto">{appropiateTitle()}</h1>

          <button
            className={
              'ml-auto rounded-2xl p-4 text-3xl bg-gradient bg-fill hover:bg-black hover:bg-none hover:text-white hover:uppercase ' +
              (mintingNft ? 'hidden' : '')
            }
            onClick={() => setCreatingListing(!creatingListing)}
          >
            {creatingListing ? 'Cancel Listing' : 'Create Listing'}
          </button>
          <button
            className={
              'ml-4 rotate-180 rounded-2xl p-4 text-3xl bg-gradient bg-fill hover:bg-black hover:bg-none hover:text-white hover:uppercase ' +
              (creatingListing ? 'hidden' : '')
            }
            onClick={() => setMintingNft(!mintingNft)}
          >
            <p className="rotate-180">
              {mintingNft ? 'Cancel Mint' : 'Mint NFT'}
            </p>
          </button>
        </div>
        <p className="text-2xl">
          {creatingListing || mintingNft ? '' : ADDRESS}
        </p>
        <div
          className={'mt-8 ' + (mintingNft || creatingListing ? 'hidden' : '')}
        >
          <Listings dropState={dropListings} setDropState={setDropListings} />
          <Collection
            dropState={dropCollection}
            setDropState={setDropCollection}
            headline={'Your Collection'}
            nfts={nfts}
            columns={5}
            clickToList={false}
            selectFunction={undefined}
          />
        </div>
      </div>
      <div className="flex">
        <div
          className={
            'w-11/12 mx-auto mt-16 flex items-start ' +
            (creatingListing ? 'block' : 'hidden')
          }
        >
          <div className="flex flex-col w-1/4 shrink-0 mr-4">
            <p className="text-5xl">Settings</p>
            <div className="border-2 border-black rounded-xl px-6 py-4 relative">
              <p className="text-4xl">Price</p>
              <input
                type="number"
                onChange={(e) => onPriceChange(e.target.value)}
                className="border-2 border-black rounded-lg pl-4 py-2"
              />
              <p className="text-4xl">Slices</p>
              <input
                disabled
                placeholder="1"
                className="border-2 border-black rounded-lg bg-slate-600 pl-4 py-2"
              />
              <p className="absolute bottom-4 right-28">
                COMING
                <br />
                SOON
              </p>
            </div>
            <button className="bg-black text-white mx-8 my-8 p-4 text-3xl rounded-xl hover:uppercase">
              Launch Listing
            </button>
          </div>
          <div className="w-1/5 shrink-0 mr-4">
            <Preview
              mediaPreviewURL={mediaPreviewURL}
              listingTitle={listingTitle}
              listingPrice={listingPrice}
            />
          </div>
          <Collection
            dropState={dropCollection}
            setDropState={setDropCollection}
            headline={'Select NFT to List'}
            nfts={nfts}
            columns={3}
            clickToList={true}
            selectFunction={selectNFT}
          />
        </div>
      </div>

      {/* <button onClick={() => getNfts(ADDRESS)}>get nft</button>
      <button onClick={() => logNfts()}>log nfts</button> */}
    </Layout>
  );
};

function CaretDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="36"
      width="36"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M17 10L12 16L7 10H17Z"
        fill="#0D0D0D"
      ></path>
    </svg>
  );
}

function CaretUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="36"
      width="36"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 14L12 8L17 14L7 14Z"
        fill="#0D0D0D"
      ></path>
    </svg>
  );
}

export default Index;
