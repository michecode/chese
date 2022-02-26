import * as React from 'react';
import Listing from './Listing';

interface PreviewProps {
  mediaPreviewURL: string;
  listingTitle: string;
  listingPrice: string;
}

const Preview: React.FC<PreviewProps> = ({
  mediaPreviewURL,
  listingTitle,
  listingPrice,
}) => {
  return (
    <div>
      <h1 className="text-5xl">Preview</h1>
      <Listing
        mediaURL={mediaPreviewURL}
        title={listingTitle}
        price={listingPrice}
        contractAddr={'0xfAk3Adclr3szx09129'}
      />
    </div>
  );
};

export default Preview;
