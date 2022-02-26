import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import { Web3Context } from './Web3Provider';
import { ethers } from 'ethers';
import Placeholder from '../images/media-not-found.png';

interface ListingProps {
  mediaURL: string;
  title: string;
  price: string;
  contractAddr: string;
}

const Listing: React.FC<ListingProps> = ({
  mediaURL,
  title,
  price,
  contractAddr,
}) => {
  // const W3C = useContext(Web3Context);
  // const contentId = 'QmZf83wVQVxpXWNKftm9Uf7eeugANzxQabgoc7FUz3iveq';
  // const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `${contentId}/${tokenId}.png`;
  // const [isMinted, setIsMinted] = useState(false);
  // useEffect(() => {
  //   getMintedStatus();
  // }, [isMinted]);

  // const getMintedStatus = async () => {
  //   // check undefined
  //   if (W3C.contract) {
  //     const result = await W3C.contract.isContentOwned(metadataURI);
  //     console.log(result);
  //     setIsMinted(result);
  //   }
  // };

  // const mintToken = async () => {
  //   if (W3C.contract && W3C.signer) {
  //     const connection = W3C.contract.connect(W3C.signer);
  //     const addr = connection.address;
  //     const result = await W3C.contract.payToMint(addr, metadataURI, {
  //       value: ethers.utils.parseEther('0.05'),
  //     });

  //     await result.wait();
  //     getMintedStatus();
  //     getCount();
  //   }
  // };

  // async function getURI() {
  //   if (W3C.contract) {
  //     const uri = await W3C.contract.tokenURI(tokenId);
  //     alert(uri);
  //   }
  // }

  // const rebaseString = (num: string) => {
  //   console.log(num);
  //   let bigNum = ethers.BigNumber.from(num);
  //   console.log(bigNum);
  //   console.log(bigNum.toNumber());
  //   return bigNum.toNumber();
  // };

  /*
    Only display art nfts.
  */
  if (
    !mediaURL.startsWith('http') &&
    !mediaURL.startsWith('ipfs') &&
    mediaURL.includes('arianespace.jpg')
  ) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-col text-ellipsis border-2 border-black rounded-xl relative">
        {/* <p className="">CREATE LISTING</p> */}
        <div className="h-[375px] mx-auto flex">
          <img
            src={mediaURL}
            className="rounded-xl max-h-full my-auto px-4 py-4"
          />
        </div>
        <div className="ml-4 mb-2">
          <h2>{title}</h2>
          <div className="flex">
            <a
              href={`https://etherscan.io/address/${contractAddr}`}
              target="_blank"
              className="text-sky-600 underline mr-1"
            >
              Contract
            </a>
            <ExLinkIcon />
          </div>
        </div>
      </div>
      <div className="mt-2 mx-8 rounded-md bg-black text-white flex">
        <p className="mx-auto">{price} ETHER</p>
      </div>
    </div>
  );
};

function ExLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="20"
      width="20"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z"
        fill="#0D0D0D"
      ></path>
    </svg>
  );
}

export default Listing;
