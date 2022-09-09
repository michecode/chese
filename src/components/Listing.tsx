import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import { useW3Context } from './Web3Provider';
import { ethers, BigNumber } from 'ethers';
import Placeholder from '../images/media-not-found.png';
import Modal from '../components/Modal';
import ExternalLink from '../icons/ExternalLink';

interface ListingProps {
  mediaURLProp?: string;
  titleProp?: string;
  price: string;
  contractAddr: string;
  tokenId: string; // string of a number
  itemId: string;
  seller: string; // shouldnt need to do this
}

/*
  mediaURL is both a link to a picture and used as a way to tell if this is a preview or a fetch
*/
const Listing: React.FC<ListingProps> = ({
  mediaURLProp,
  titleProp,
  price,
  contractAddr,
  tokenId,
  itemId,
  seller,
}) => {
  const W3C = useW3Context();

  useEffect(() => {
    console.log('useEffect() in Listing.tsx');
    if (!mediaURLProp || mediaURLProp == '') {
      console.log('no media url passed into listing. fetching single nft.');
      fetchOneNft();
    } else {
      setMedia(mediaURLProp);
    }
  }, [mediaURLProp]);
  // without mediaURLProp dependency, it will not update pictures while previewing the listing creation.

  const emptySingleNFTRes: SingleNFTRes = {
    contract: {
      address: '',
    },
    id: {
      tokenId: '',
      tokenMetaData: {
        tokenType: '',
      },
    },
    media: [
      {
        raw: '',
        gateway: '',
      },
    ],
    metadata: {
      description: '',
      image: '',
      name: '',
      external_url: '',
      background_color: '',
      attributes: '',
    },
    timeLastUpdated: '',
    title: '',
    tokenURI: {
      raw: '',
      gateway: '',
    },
  };

  const [nft, setNft] = useState<SingleNFTRes>(emptySingleNFTRes);
  const [media, setMedia] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchOneNft = async () => {
    fetch(
      `${
        process.env.GATSBY_ALCHEMY_URL
      }/getNFTMetadata/?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${'ERC721'}`,
      {
        method: 'GET',
        redirect: 'follow',
      },
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('found nft ' + result.title);
        updateNft(result);
      })
      .catch((error) => console.log(error));
  };

  const updateNft = (result: any) => {
    console.log(result);
    setNft(result);
    setMedia(getMediaURL(result));
  };

  const getMediaURL = (nft: NFTRes) => {
    let mediaURL = '';
    console.log('getting URL media from metadata');
    if (nft.media[0].gateway == '') {
      if (nft.metadata.image == '') {
        fetch(nft.tokenURI.raw, {
          method: 'GET',
          redirect: 'follow',
        })
          .then((response) => response.json())
          // .then((response) => JSON.stringify(response, null, 2))
          .then((result) => {
            mediaURL = result.image;
          })
          .catch((error) => console.log(error));
      } else {
        mediaURL = nft.metadata.image;
      }
    } else {
      mediaURL = nft.media[0].gateway;
    }
    console.log(mediaURL);
    return mediaURL;
  };

  const validURL = (url: string) => {
    console.log('in valid url', url);
    if (url?.startsWith('http') || url?.startsWith('ipfs')) {
      const hash = url.slice(21);
      return `https://chese.infura-ipfs.io/ipfs/${hash}`;
    } else {
      return '';
    }
  };

  const unlist = () => {
    // isn't a way to see button without having an account connected
    if (W3C.connected && W3C.signer) {
      W3C.contract?.unlist(BigNumber.from(itemId));
    }
  };

  const buy = () => {
    if (W3C.connected && W3C.signer) {
      W3C.contract?.createListingSale(contractAddr, BigNumber.from(itemId), {
        value: ethers.utils.parseEther(price),
      });
    } else {
      alert('Please connect an ethereum wallet in order to buy this NFT.');
    }
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="m-8 flex">
          <div className="w-1/2 h-[725px] my-auto flex border-2 border-black rounded-xl shrink-0">
            <img
              src={validURL(media)}
              className="max-h-full m-auto px-4 py-4"
            />
          </div>
          <div className="flex flex-col ml-4 my-auto h-[700px]">
            <h1 className="text-6xl">{!titleProp ? nft?.title : titleProp}</h1>
            <h1 className="text-3xl">{price + ' ETH'}</h1>
            <h2 className="flex mt-4">
              <p className="mr-2">Owned by: </p>
              <a href={'https://etherscan.org/' + seller} className="underline">
                {seller}
              </a>
              <ExternalLink />
            </h2>
            <div>
              <h1 className="text-2xl mt-4">Description</h1>
              <p>Temporary description.</p>
            </div>
            <div className={'mt-auto flex ' + (W3C.connected ? '' : 'hidden')}>
              <button
                className="bg-black text-white w-1/2 mx-2 p-4 text-3xl rounded-xl hover:uppercase"
                onClick={() => buy()}
              >
                Buy
              </button>
              {W3C.account == seller?.toLowerCase() ? (
                <button
                  className="bg-black text-white w-1/2 mx-2 p-4 text-3xl rounded-xl hover:uppercase"
                  onClick={() => unlist()}
                >
                  Remove Listing
                </button>
              ) : (
                <></>
              )}
            </div>
            <button
              className={
                'mt-auto text-3xl p-4 bg-gradient bg-cover text-white rounded-xl hover:uppercase ' +
                (W3C.connected ? 'hidden' : '')
              }
              onClick={() => {
                alert(
                  'Please connect wallet using the button in the navigation.',
                );
              }}
            >
              Connect Wallet To Buy
            </button>
          </div>
        </div>
      </Modal>
      <div onClick={() => setShowModal(!showModal)}>
        <div className="flex flex-col text-ellipsis border-2 border-black rounded-xl hover:shadow-xl hover:cursor-pointer">
          {/* <p className="">CREATE LISTING</p> */}
          <div className="h-[375px] mx-auto flex">
            <img
              src={validURL(media)}
              className="rounded-xl max-h-full my-auto px-4 py-4"
            />
          </div>
          <div className="ml-4 mb-2 truncate">
            <h2>{titleProp ? titleProp : nft?.title}</h2>
            <div className="flex">
              <a
                href={`https://etherscan.io/address/${contractAddr}`}
                target="_blank"
                className="text-sky-600 underline mr-1"
              >
                Contract
              </a>
              <ExternalLink />
            </div>
          </div>
        </div>
        <div className="mt-2 mx-8 rounded-md bg-black text-white flex">
          <p className="mx-auto">{price} ETHER</p>
        </div>
      </div>
    </>
  );
};

export default Listing;
