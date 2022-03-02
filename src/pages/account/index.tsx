import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useW3Context } from '../../components/Web3Provider';
import { PageProps } from 'gatsby';
import { BigNumber, ethers } from 'ethers';
import Layout from '../../components/Layout';
import Listing from '../../components/Listing';
import UnlistedNFT from '../../components/UnlistedNFT';
import ASpace from '../../images/arianespace.jpg';
import Preview from '../../components/Preview';
import NFTPreview from '../../components/NFTPreview';
import Collection from '../../components/Collection';
import Listings from '../../components/ListingCollection';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { pinJSONToIPFS } from '../../components/pinata';
import ListingCollection from '../../components/ListingCollection';

/*
omg!??!?!11! why are you using axios and fetch. because. i need axios for pinata and im not fixing fetch rn.
*/

const rkAlc =
  'https://eth-rinkeby.alchemyapi.io/v2/ChZmc9ztzVWiU3oWRuAjwU_sUEEPaDgW';
const mnAlc = `https://eth-mainnet.alchemyapi.io/v2/pSfImfCndXbVYu10T1hcSyUkfzWm8AiV`;

const Index: React.FC<PageProps> = (props: PageProps) => {
  const W3C = useW3Context();
  // const W3C = useContext(Web3Context);
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
  const [listings, setListings] = useState([{}]);
  const [dropListings, setDropListings] = useState(true);
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
  const [listingTokenId, setListingTokenId] = useState('');
  const [slices, setSlices] = useState(1);
  const [nftMedia, setNftMedia] = useState();
  const [nftMediaUpload, setNftMediaUpload] = useState('');
  const [nftTitle, setNftTitle] = useState('');
  // This isn't a state because it breaks if it is a state..? The set function lags behind one call for no reason.
  let ipfsPath: string = '';

  const ADDRESS = '0xFD424D0E0CD49D6AD8f08893CE0D53F8EAEB4213';
  // const ADDRESS_ME = '0x6c5cae5Eb9d84880BC38B3c70D1Bf41b9f04142c';
  // Gallery.so PapaBearded
  const ADDRESS_PB = '0x1A53b8B97d76CB27E9c1Fb9a8087661E2D4842ba';
  // Gallery.so MDP
  // const ADDRESS = '0xf9CaA0e790a9a89FBd84E0cf1B455eEb1dC50d1D';

  useEffect(() => {
    getNfts(W3C.account);
    getListings();
  }, [W3C.connected]);

  const appropiateTitle = () => {
    if (creatingListing) {
      return 'creating new listing';
    } else if (mintingNft) {
      return 'minting nft';
    } else {
      return W3C.connected ? 'hello' : 'hi stranger';
    }
  };

  const getNfts = async (address: string) => {
    // check falsy values
    if (address != 'Not Connected' && address) {
      console.log('Fetching all nfts for account: ' + address);
      console.log('FETCHING!!!! SLAY!!! PLEASE WAIT!!!');
      fetch(`${rkAlc}/getNFTs/?owner=${address}`, {
        method: 'GET',
        redirect: 'follow',
      })
        .then((response) => response.json())
        // .then((response) => JSON.stringify(response, null, 2))
        .then((result) => setNfts(result))
        .catch((error) => console.log(error));
      console.log(nfts);
    } else {
      console.log('No account found. Not looking for NFTs');
    }
  };

  const getListings = async () => {
    if (W3C.connected) {
      console.log('Fetching listings for account: ' + W3C.account);
      /*
      MAKE SURE YOU KEEP THE AWAIT OTHERWISE YOU GET A PROMISE TYPE!! NOT AN ARRAY TYPE!!
      */
      const fetch = await W3C.contract?.fetchSellerListings(W3C.account);
      setListings(fetch);
    }
  };

  const logNfts = () => {
    console.log(nfts);
  };

  const selectNFT = (
    newMediaURL: string,
    newListingTitle: string,
    newListingContract: string,
    newListingTokenId: string,
  ) => {
    setMediaPreviewURL(newMediaURL);
    setListingTitle(newListingTitle);
    setListingContract(newListingContract);
    setListingTokenId(newListingTokenId);
    // setDropCollection(!dropCollection);
  };

  const onPriceChange = (newValue: string) => {
    setListingPrice(newValue);
  };

  const onNameChange = (newValue: string) => {
    setNftTitle(newValue);
  };

  const onFileChange = (newValue: any) => {
    console.log(newValue);
    setNftMedia(newValue);
    setNftMediaUpload(URL.createObjectURL(newValue[0]));
    console.log('File Uploaded. Preview src @' + nftMediaUpload);
  };

  const getApproval = async () => {
    W3C.minterContract?.setApprovalForAll(W3C.contractAddress, true);
  };

  const createListing = async () => {
    // await getApproval();
    W3C.contract?.createListing(
      listingContract,
      BigNumber.from(listingTokenId),
      ethers.utils.parseEther(listingPrice),
    );
  };

  const uploadToIPFS = async () => {
    if (!nftMedia || nftMedia.length == 0) {
      return alert('No Files Selected');
    }
    const file = nftMedia[0];
    const result = await (W3C.ipfs as IPFSHTTPClient).add(file);
    console.log(result);
    ipfsPath = result.path;
  };

  // TODO: Description functionality
  const mintNFT = async (url: string, name: string) => {
    // console.log('in mintNFT. ipfsPath: ' + ipfsPath);
    const description = 'A great description.';
    //error handling
    if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
      return {
        success: false,
        status: '❗Please make sure all fields are completed before minting.',
      };
    }

    const metadata = {
      name: name,
      image: url,
      description: description,
    };

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse) {
      return {
        success: false,
        status: 'Response from pinata is undefined..?',
      };
    }
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      };
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log(tokenURI);

    try {
      console.log(W3C.minterContract);
      console.log('Minting NFT with metadata @' + tokenURI);
      await W3C.minterContract?.safeMint(W3C.account, tokenURI);
      setMintingNft(!mintingNft);
      return {
        success: true,
        status:
          '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/',
      };
    } catch (error) {
      return {
        success: false,
        status: '😥 Something went wrong: ' + error.message,
      };
    }
  };

  const uploadAndMint = async () => {
    await uploadToIPFS();
    mintNFT('https://gateway.ipfs.io/ipfs/' + ipfsPath, nftTitle);
  };

  return (
    <Layout path={props.path}>
      <div></div>
      <div className="w-11/12 mx-auto mt-16">
        <div className="flex items-center">
          <h1 className="text-9xl mr-auto">{appropiateTitle()}</h1>

          <button
            className={
              'ml-auto rounded-2xl p-4 text-3xl bg-gradient bg-cover hover:bg-black hover:bg-none hover:text-white hover:uppercase ' +
              (mintingNft ? 'hidden' : '')
            }
            onClick={() => setCreatingListing(!creatingListing)}
          >
            {creatingListing ? 'Cancel Listing' : 'Create Listing'}
          </button>
          <button
            className={
              'ml-4 rotate-180 rounded-2xl p-4 text-3xl bg-gradient bg-cover hover:bg-black hover:bg-none hover:text-white hover:uppercase ' +
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
          {creatingListing || mintingNft
            ? ''
            : W3C.connected
            ? W3C.account
            : 'connect wallet to view account details'}
        </p>
        <div
          className={'mt-8 ' + (mintingNft || creatingListing ? 'hidden' : '')}
        >
          <ListingCollection
            dropState={dropListings}
            setDropState={setDropListings}
            isMarketpagePage={false}
            listings={listings}
            columns={5}
          />
          <Collection
            dropState={dropCollection}
            setDropState={setDropCollection}
            headline={'Your Collection'}
            nfts={nfts}
            refresh={getNfts}
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
            <button
              className="bg-black text-white mx-8 my-4 p-4 text-3xl rounded-xl hover:uppercase"
              onClick={() => getApproval()}
            >
              Approve
            </button>
            <button
              className="bg-black text-white mx-8 p-4 text-3xl rounded-xl hover:uppercase"
              onClick={() => createListing()}
            >
              Launch Listing
            </button>
            <p className="mx-auto my-4 text-center">
              Make sure you approve before you list!
              <br />
              Only required to approve once per NFT contract.
            </p>
          </div>
          <div className="w-1/5 shrink-0 mr-4">
            <Preview
              mediaPreviewURL={mediaPreviewURL}
              listingTitle={listingTitle}
              listingPrice={listingPrice}
              contractAddr={listingContract}
            />
          </div>
          <Collection
            dropState={dropCollection}
            setDropState={setDropCollection}
            headline={'Select NFT to List'}
            nfts={nfts}
            refresh={getNfts}
            columns={3}
            clickToList={true}
            selectFunction={selectNFT}
          />
        </div>
      </div>

      <div className="flex">
        <div
          className={
            'w-11/12 mx-auto mt-16 flex items-start ' +
            (mintingNft ? 'block' : 'hidden')
          }
        >
          <div className="flex flex-col w-1/4 shrink-0 mr-4">
            <p className="text-5xl">Settings</p>
            <div className="border-2 border-black rounded-xl px-6 py-4 relative">
              <p className="text-4xl">Name</p>
              <input
                type="text"
                onChange={(e) => onNameChange(e.target.value)}
                className="border-2 border-black rounded-lg pl-4 py-2"
              />
              <p className="text-4xl">Supply</p>
              <input
                disabled
                placeholder="1"
                className="border-2 border-black rounded-lg bg-slate-600 pl-4 py-2"
              />
            </div>
            <button
              className="bg-black text-white mx-8 my-8 p-4 text-3xl rounded-xl hover:uppercase"
              onClick={() => uploadAndMint()}
            >
              Mint NFT
            </button>
            <br />
            IPFS: {W3C.ipfs ? ' Connected' : ' Disconnected'}
          </div>
          <div className="w-1/5 shrink-0 mr-4">
            <NFTPreview
              mediaPreviewURL={nftMediaUpload}
              nftTitle={nftTitle}
              contractAddr={'0x85810707E13EF8aD77E4666E59246CE652696e1D'}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <p className="text-5xl">Select File</p>
            <div className="border-2 border-black rounded-xl px-6 py-4">
              <p>Supported Files: JPG, PNG, GIF (Video Formats Soon)</p>
              <input
                type="file"
                accept=".jpg, .png, .gif"
                onChange={(e) => onFileChange(e.target.files)}
              />
            </div>
            <p className="text-5xl">Info</p>
            <div className="border-2 border-black rounded-xl px-6 py-4">
              <p>Hello. This can mint any picture file you want to IPFS!</p>
              <br />
              <p>
                I have yet to implement the ability to list any NFT. So inorder
                to list you must mint NFTs here.
              </p>
              <br />
              <p>
                It may take some time to show up in collection due to the nature
                of the blockchain. So please be patient.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => logNfts()}>log nfts</button>
      <button onClick={() => getListings()}>get listings</button>
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
