import * as React from 'react';
import { ethers, BigNumber } from 'ethers';
import Listing from './Listing';
import CaretUp from '../icons/CaretUp';
import CaretDown from '../icons/CaretDown';

/*
Listing[] returned from Chese contract looks like this

Array [
  {
    0: Object { _hex: "0x01", _isBigNumber: true }
    ...
    6: true
    active: boolean
    listingId: {
      _hex: "0x01",
      _isBigNumber: true
    },
    nftContract: "0x..slay"
    owner: "0x00"
    price: {
      _hex: "0x01"
      _isBigNumber: true
    }
    seller: "0xFD..slay"
    tokenId: {
      _hex: "0x01"
      _isBigNumber: true
    }
  }
]

*/

/*
@params
dropState: passed in state from page to control whether the collection is display below the headline
setDropState: state function from page
headline: controls headline e.g "Your Collection" "Select NFTs to List"
clickToList: for UnlistedNFTs component.
selectFunction: for UnlistedNFTs component.
*/
interface ListingCollectionProps {
  dropState: boolean;
  setDropState: Function;
  isMarketpagePage: boolean;
  listings: {}[];
  columns: number;
}

const ListingCollection: React.FC<ListingCollectionProps> = ({
  dropState,
  setDropState,
  isMarketpagePage,
  listings,
  columns,
}) => {
  const checkListings = () => {
    if (listings[0].price) {
      return listings;
    } else {
      return [];
    }
  };

  /*
  @params
  @returns
  returns nfts.totalCount amount of UnlistedNFTS
  */
  const listCollection = () => {
    let count = 0;
    if (listings.length != 0 && listings[0] != {}) {
      return checkListings().map((nft: Object) => {
        count++;

        const priceRaw = BigNumber.from(nft.price?._hex);
        const price = ethers.utils.formatEther(priceRaw);
        const tokenId = BigNumber.from(nft.tokenId?._hex).toString();
        const itemId = BigNumber.from(nft.itemId?._hex).toString();
        return (
          <Listing
            price={price}
            contractAddr={nft.nftContract}
            itemId={itemId}
            tokenId={tokenId}
            seller={nft.seller}
            key={count}
          />
        );
      });
    } else {
      return <div>No Listings Found.</div>;
    }
  };

  // I have to do these variables for some reason. It breaks otherwise lol.
  const col3 = 'grid-cols-3';
  const col5 = 'grid-cols-5';
  const col7 = 'grid-cols-7';

  if (isMarketpagePage) {
    return (
      <div
        className={
          'grid ' +
          (columns == 7 ? col7 : '') +
          (columns == 5 ? col5 : '') +
          (columns == 3 ? col3 : '') +
          ' gap-x-2 gap-y-4 '
        }
      >
        {listCollection()}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="text-5xl flex cursor-pointer"
        onClick={() => setDropState(!dropState)}
      >
        {isMarketpagePage ? (
          <></>
        ) : (
          <>Your Listings {dropState ? <CaretUp /> : <CaretDown />}</>
        )}
      </div>
      <div
        className={
          'grid ' +
          (columns == 7 ? col7 : '') +
          (columns == 5 ? col5 : '') +
          (columns == 3 ? col3 : '') +
          ' gap-x-2 gap-y-4 ' +
          (dropState ? '' : 'hidden')
        }
      >
        {listCollection()}
      </div>
    </div>
  );
};

export default ListingCollection;
