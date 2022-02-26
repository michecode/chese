import * as React from 'react';
import { Web3Context } from './Web3Provider';
import { ethers } from 'ethers';
import Placeholder from '../images/media-not-found.png';

interface ListingProps {
  mediaURL: string;
  title: string;
  contractAddr: string;
  clickToList: boolean | undefined;
  listFunc: Function | undefined;
}

const Listing: React.FC<ListingProps> = ({
  mediaURL,
  title,
  contractAddr,
  clickToList,
  listFunc,
}) => {
  /*
    Only display art nfts.
  */
  if (
    !mediaURL.startsWith('http') &&
    !mediaURL.startsWith('ipfs') &&
    !mediaURL.includes('arianespace.jpg')
  ) {
    return <></>;
  }

  const handleClick = () => {
    if (listFunc && clickToList) {
      listFunc(mediaURL, title, contractAddr);
    }
  };

  return (
    <div
      className={
        'group flex flex-col text-ellipsis border-2 border-black rounded-xl relative ' +
        (clickToList ? 'hover:cursor-pointer hover:bg-black' : '')
      }
      onClick={() => handleClick()}
    >
      <div className="h-[375px] mx-auto flex">
        <img
          src={mediaURL}
          className={
            'rounded-xl max-h-full my-auto px-4 py-4 ' +
            (clickToList ? 'group-hover:hidden' : '')
          }
        />
      </div>
      <div
        className={
          'ml-4 mb-2 text-ellipsis overflow-clip ' +
          (clickToList ? 'group-hover:hidden' : '')
        }
      >
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
      <p
        className={
          'hidden absolute top-8 left-8 text-7xl text-white ' +
          (clickToList ? 'group-hover:block' : '')
        }
      >
        Select
        <br />
        NFT
      </p>
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
