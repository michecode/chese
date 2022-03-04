import * as React from 'react';
import { useEffect, useState } from 'react';
import { useW3Context } from '../../components/Web3Provider';
import { PageProps } from 'gatsby';
import { BigNumber, ethers } from 'ethers';
import Layout from '../../components/Layout';
import Listing from '../../components/Listing';
import UnlistedNFT from '../../components/UnlistedNFT';
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

const rkAlc = process.env.GATSBY_RINKEBY_ALCAPI;

const emptyAlcRes = {
  ownedNfts: [],
  totalCount: 0,
  blockHash: '',
};

const Index: React.FC<PageProps> = (props: PageProps) => {
  const W3C = useW3Context();

  const [nfts, setNfts] = useState<AlchemyAPIResponse>(emptyAlcRes);
  const [listings, setListings] = useState<Listing[]>();
  const [dropListings, setDropListings] = useState(true);
  const [dropCollection, setDropCollection] = useState(true);
  const [creatingListing, setCreatingListing] = useState(false);
  const [mintingNft, setMintingNft] = useState(false);

  /*
  States below are for listing + minting states in controlled components
  */
  const [listingPrice, setListingPrice] = useState('1');
  const [listingTitle, setListingTitle] = useState('');
  const [mediaPreviewURL, setMediaPreviewURL] = useState('');
  const [listingContract, setListingContract] = useState('');
  const [listingTokenId, setListingTokenId] = useState('');
  const [slices, setSlices] = useState(1);
  const [nftMedia, setNftMedia] = useState<FileList | null>();
  const [nftMediaUpload, setNftMediaUpload] = useState('');
  const [nftTitle, setNftTitle] = useState('');
  // This isn't a state because it breaks if it is a state..? The set function lags behind one call for no reason.
  let ipfsPath: string = '';

  // update first render + on W3C.connected change
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

  const onFileChange = (newValue: FileList | null) => {
    if (!newValue) {
      console.log('DO NOT PASS IN NULL FILES!!!!!! STOP!!');
      return;
    }
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
    const description = 'Switchin it up pur.';
    //error handling
    if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
      alert('Please make sure all fields are completed before minting.');
      return;
    }

    const metadata = {
      name: name,
      image: url,
      description: description,
    };

    //pinata pin request
    const pinataResponse: PinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse) {
      alert('Response from pinata is undefined..?');
      return;
    }
    if (!pinataResponse.success) {
      alert('Something went wrong while uploading your tokenURI');
      return;
    }
    const tokenURI = pinataResponse.pinataUrl;

    try {
      console.log(W3C.minterContract);
      console.log('Minting NFT with metadata @' + tokenURI);
      await W3C.minterContract?.safeMint(W3C.account, tokenURI);
      setMintingNft(!mintingNft);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const uploadAndMint = async () => {
    await uploadToIPFS();
    mintNFT('https://gateway.ipfs.io/ipfs/' + ipfsPath, nftTitle);
  };

  return (
    <Layout path={props.path}>
      <div></div>
      {/* account standard */}
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
      {/* create listing */}
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
      {/* minting */}
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

export default Index;
