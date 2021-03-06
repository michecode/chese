import * as React from 'react';
import Listing from './Listing';

interface PreviewProps {
  mediaPreviewURL: string;
  listingTitle: string;
  listingPrice: string;
  contractAddr: string;
}

const Preview: React.FC<PreviewProps> = ({
  mediaPreviewURL,
  listingTitle,
  listingPrice,
  contractAddr,
}) => {
  return (
    <div>
      <h1 className="text-5xl">Preview</h1>
      <Listing
        mediaURLProp={mediaPreviewURL}
        titleProp={listingTitle}
        price={listingPrice}
        contractAddr={contractAddr}
        tokenId={'0'}
        itemId={'0'}
        seller={''}
      />
    </div>
  );
};

export default Preview;
