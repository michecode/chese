import * as React from 'react';
import { Web3Context } from './Web3Provider';
import { ethers } from 'ethers';
import Placeholder from '../images/media-not-found.png';
import ExternalLink from '../icons/ExternalLink';

interface ListingProps {
  mediaURL: string;
  title: string;
  contractAddr: string;
  tokenId: string;
  clickToList: boolean | undefined;
  listFunc: Function | undefined;
  overlapHackFix: boolean; //fixing overlap problem with preview
}

const Listing: React.FC<ListingProps> = ({
  mediaURL,
  title,
  contractAddr,
  tokenId,
  clickToList,
  listFunc,
  overlapHackFix,
}) => {
  /*
    Only display art nfts.

    http  & ipfs for external live nfts
    /static/ for placeholder gradient image
    blob: for previewing user uploaded
  */
  if (!mediaURL) return <></>;
  if (
    !mediaURL.startsWith('http') &&
    !mediaURL.startsWith('ipfs') &&
    !mediaURL.startsWith('/static/') &&
    !mediaURL.startsWith('blob:')
  ) {
    return <></>;
  }

  const handleClick = () => {
    if (listFunc && clickToList) {
      listFunc(mediaURL, title, contractAddr, tokenId);
    }
  };

  return (
    <div
      className={
        'group relative flex flex-col text-ellipsis border-2 border-black rounded-xl ' +
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
        <h2>{title == '' ? 'Untitled' : title}</h2>
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

export default Listing;
