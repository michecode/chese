import * as React from 'react';
import { ethers, BigNumber } from 'ethers';
import Listing from './Listing';
import CaretUp from '../icons/CaretUp';
import CaretDown from '../icons/CaretDown';

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
  listings: Listing[] | undefined;
  columns: number;
}

const ListingCollection: React.FC<ListingCollectionProps> = ({
  dropState,
  setDropState,
  isMarketpagePage,
  listings,
  columns,
}) => {
  /*
  @params
  @returns
  returns nfts.totalCount amount of UnlistedNFTS
  */
  const listCollection = () => {
    let count = 0;
    if (listings) {
      console.log(listings);
      return listings.map((nft: Listing) => {
        count++;

        const priceRaw = BigNumber.from(nft?.price._hex);
        const price = ethers.utils.formatEther(priceRaw);
        const tokenId = BigNumber.from(nft?.tokenId._hex).toString();
        const itemId = BigNumber.from(nft?.itemId._hex).toString();
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
