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
    _isBigNumber: string;
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
