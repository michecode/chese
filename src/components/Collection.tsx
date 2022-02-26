import * as React from 'react';
import UnlistedNFT from './UnlistedNFT';

/*
@params
dropState: passed in state from page to control whether the collection is display below the headline
setDropState: state function from page
headline: controls headline e.g "Your Collection" "Select NFTs to List"
clickToList: for UnlistedNFTs component.
selectFunction: for UnlistedNFTs component.
*/
interface CollectionProps {
  dropState: boolean;
  setDropState: Function;
  headline: string;
  nfts: {};
  columns: number;
  clickToList: boolean;
  selectFunction: Function | undefined;
}

const Collection: React.FC<CollectionProps> = ({
  dropState,
  setDropState,
  headline,
  nfts,
  columns,
  clickToList,
  selectFunction,
}) => {
  // @returns array of ownedNfts if the nfts.ownedNfts is not empty e.g data has been fetched from alchemy
  const prepNfts = () => {
    if (nfts.ownedNfts != []) {
      console.log(nfts.ownedNfts);
      return nfts.ownedNfts;
    } else {
      return [];
    }
  };

  /*
  @params
  clickToList: if true. UnlistedNFT will have functionality for selection for new listings
  listFunc: updates preview states for new listing
  @returns
  returns nfts.totalCount amount of UnlistedNFTS
  */
  const listCollection = (clickToList: boolean, listFunc?: Function) => {
    let count = 0;
    if (nfts.totalCount != 0) {
      return prepNfts().map((nft: Object) => {
        // console.log('collection: ' + nft.title);
        // console.log(
        //   'Fetching media for ' + nft.title + ' at ' + nft.media[0].gateway,
        // );
        count++;
        return (
          <UnlistedNFT
            mediaURL={nft.media[0].gateway}
            title={nft.title}
            contractAddr={nft.contract.address}
            clickToList={clickToList}
            listFunc={listFunc}
            key={count}
          />
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="text-5xl flex cursor-pointer"
        onClick={() => setDropState(!dropState)}
      >
        {headline} {dropState ? <CaretUp /> : <CaretDown />}
      </div>
      <div
        className={
          `grid grid-cols-${columns} gap-x-2 gap-y-4 ` +
          (dropState ? '' : 'hidden')
        }
      >
        {listCollection(clickToList, selectFunction)}
      </div>
    </div>
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

export default Collection;
