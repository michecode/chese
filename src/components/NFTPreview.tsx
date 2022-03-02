import * as React from 'react';
import UnlistedNFT from './UnlistedNFT';
import Gradient from '../images/iridescent-gradient.png';

interface PreviewProps {
  mediaPreviewURL: string;
  nftTitle: string;
  contractAddr: string;
}

const Preview: React.FC<PreviewProps> = ({
  mediaPreviewURL,
  nftTitle,
  contractAddr,
}) => {
  if (mediaPreviewURL == '') {
    mediaPreviewURL = Gradient;
  }

  return (
    <div>
      <h1 className="text-5xl">Preview</h1>
      <UnlistedNFT
        mediaURL={mediaPreviewURL}
        title={nftTitle}
        contractAddr={contractAddr}
        clickToList={false}
        listFunc={() => {}}
      />
    </div>
  );
};

export default Preview;
