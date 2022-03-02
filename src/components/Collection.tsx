import * as React from 'react';
import UnlistedNFT from './UnlistedNFT';
import CaretUp from '../icons/CaretUp';
import CaretDown from '../icons/CaretDown';
import RefreshIcon from '../icons/RefreshIcon';

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
  refresh: Function;
  columns: number;
  clickToList: boolean;
  selectFunction: Function | undefined;
}

const Collection: React.FC<CollectionProps> = ({
  dropState,
  setDropState,
  headline,
  nfts,
  refresh,
  columns,
  clickToList,
  selectFunction,
}) => {
  // @returns array of ownedNfts if the nfts.ownedNfts is not empty e.g data has been fetched from alchemy
  const prepNfts = () => {
    if (nfts.ownedNfts != []) {
      // console.log(nfts.ownedNfts);
      return nfts.ownedNfts;
    } else {
      return [];
    }
  };

  const getMediaURL = (nft: Object) => {
    let mediaURL = '';
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
    return mediaURL;
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

        // check for image links. fetch if needed.
        let mediaURL = getMediaURL(nft);
        return (
          <UnlistedNFT
            mediaURL={mediaURL}
            title={nft.title}
            contractAddr={nft.contract.address}
            tokenId={nft.id.tokenId}
            clickToList={clickToList}
            listFunc={listFunc}
            overlapHackFix={true}
            key={count}
          />
        );
      });
    } else {
      return <div>No NFTs found.</div>;
    }
  };

  // I have to do these variables for some reason. It breaks otherwise lol.
  const col3 = 'grid-cols-3';
  const col5 = 'grid-cols-5';

  return (
    <div className="flex flex-col">
      <div className="text-5xl flex cursor-pointer">
        <span onClick={() => setDropState(!dropState)} className="flex">
          {headline} {dropState ? <CaretUp /> : <CaretDown />}
        </span>
        <button
          className={
            'bg-black hover:cursor-pointer text-white text-xl mx-2 px-2 rounded-xl ' +
            (dropState ? '' : 'hidden')
          }
          onClick={() => refresh()}
        >
          <RefreshIcon />
        </button>
      </div>

      <div
        className={
          'grid ' +
          (columns == 5 ? col5 : '') +
          (columns == 3 ? col3 : '') +
          ' gap-x-2 gap-y-4 ' +
          (dropState ? '' : 'hidden')
        }
      >
        {listCollection(clickToList, selectFunction)}
      </div>
    </div>
  );
};

export default Collection;
