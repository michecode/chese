declare module '*.jpg' {
  const value: any;
  export = value;
}
declare module '*.png' {
  const value: any;
  export = value;
}

interface NFTRes extends Object {
  contract: {
    address: string;
  };
  description: string;
  id: {
    tokenId: string;
    tokenMetaData: {
      tokenType: string;
    };
  };
  media: [
    {
      raw: string;
      gateway: string;
    },
  ];
  metadata: {
    description: string;
    image: string;
    name: string;
  };
  timeLastUpdated: string;
  title: string;
  tokenURI: {
    raw: string;
    gateway: string;
  };
}

interface AlchemyAPIResponse {
  ownedNfts: NFTRes[];
  totalCount: number;
  blockHash: string;
}

interface PinataResponse {
  success: boolean | undefined;
  pinataUrl: string | undefined;
  message: any;
}

interface SingleNFTRes extends Object {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetaData: {
      tokenType: string;
    };
  };
  media: [
    {
      raw: string;
      gateway: string;
    },
  ];
  metadata: {
    description: string;
    image: string;
    name: string;
    external_url: string;
    background_color: string;
    attributes: string;
  };
  timeLastUpdated: string;
  title: string;
  tokenURI: {
    raw: string;
    gateway: string;
  };
}

interface Listing {
  0: {
    _hex: string;
    _isBigNumber: boolean;
  };
  1: string;
  2: {
    _hex: string;
    _isBigNumber: boolean;
  };
  3: {
    _hex: string;
    _isBigNumber: boolean;
  };
  4: string;
  5: string;
  6: boolean;
  active: boolean;
  itemId: {
    _hex: string;
    _isBigNumber: boolean;
  };
  length: number;
  nftContract: string;
  owner: string;
  price: {
    _hex: string;
    _isBigNumber: boolean;
  };
  seller: string;
  tokenId: {
    _hex: string;
    _isBigNumber: boolean;
  };
}
