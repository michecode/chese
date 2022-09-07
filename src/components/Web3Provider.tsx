import * as React from 'react';
import { useContext, useReducer } from 'react';
import Chese from '../artifacts/contracts/Chese.sol/Chese.json';
import Minter from '../artifacts/contracts/CheseNFTs.sol/CheseNFTs.json';
import { ethers } from 'ethers';
import { IPFSHTTPClient } from 'ipfs-http-client';
const ipfsClient = require('ipfs-http-client');
// var Buffer = require('buffer/').Buffer;
import { Buffer } from 'Buffer';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Web3ProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface Web3State {
  ipfs: IPFSHTTPClient | undefined;
  contractAddress: string;
  minterAddress: string;
  provider:
    | ethers.providers.Web3Provider
    | ethers.providers.AlchemyProvider
    | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  contract: ethers.Contract | undefined;
  minterContract: ethers.Contract | undefined;
  account: string;
  connected: boolean;
}

interface IWeb3Context extends Web3State {
  dispatch: Function;
}

let ipfs: IPFSHTTPClient | undefined;
const infuraId = process.env.GATSBY_INFURA_ID;
// const infuraId = '25jkAET2S7fGEYdehmba8U0pTL6';
const infuraSecret = process.env.GATSBY_INFURA_SECRET;
// const infuraSecret = '88c27996e7df5c9a3ece102e207bf35e';
const authorization =
  'Basic ' + Buffer.from(infuraId + ':' + infuraSecret).toString('base64');

try {
  ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization,
    },
  });
} catch (error) {
  console.error('IPFS error ', error);
  ipfs = undefined;
}

const getAlchemyKey = () => {
  const key = process.env.GATSBY_ALCHEMY_KEY;
  if (key) {
    return key;
  }
  return '';
};

let providerTemp:
  | ethers.providers.Web3Provider
  | ethers.providers.AlchemyProvider
  | undefined;
// Window does not exist in build server. Check if exists so that build does not crash.
// Is ok to run further with undefined.
if (typeof window !== 'undefined') {
  if (window.ethereum) {
    providerTemp = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    providerTemp = new ethers.providers.AlchemyProvider(
      'goerli',
      getAlchemyKey(),
    );
  }
}

// Chese V0.2.1
const CONTRACT_ADDRESS = '0xe3098e4DaA93c7dD938910D7B9c10831eBE641B3';

const MINTER_ADDRESS = '0x59aC7dae22a5bB007a3F56164abAf04a13e7cACD';

const defaultContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  Chese.abi,
  new ethers.providers.AlchemyProvider('goerli', getAlchemyKey()),
);

const defaultMinterContract = new ethers.Contract(MINTER_ADDRESS, Minter.abi);

const defaultState: Web3State = {
  ipfs: ipfs,
  contractAddress: CONTRACT_ADDRESS,
  minterAddress: MINTER_ADDRESS,
  provider: providerTemp,
  signer: undefined,
  contract: defaultContract,
  minterContract: defaultMinterContract,
  account: 'Not Connected',
  connected: false,
};

export const Web3Context = React.createContext<IWeb3Context>({
  ...defaultState,
  dispatch: () => {},
});

export const ACTIONS = {
  SET_PROVIDER: 'set-provider',
  SET_SIGNER: 'set-signer',
  UPDATE_CONTRACT_SIGNER: 'update-contract-signer',
  UPDATE_CONTRACT_ALCHEMY: 'update-contract-alchemy',
  UPDATE_MINTER_CONTRACT: 'update-minter-contract',
  SET_ACCOUNT: 'update-account',
  SET_CONNECTED: 'set-connected',
};

function reducer(state: Web3State, action: any) {
  switch (action.type) {
    case ACTIONS.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
      };
    case ACTIONS.SET_SIGNER:
      return {
        ...state,
        signer: action.payload.signer,
      };
    case ACTIONS.UPDATE_CONTRACT_SIGNER:
      const newContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Chese.abi,
        action.payload.signer,
      );
      return {
        ...state,
        contract: newContract,
      };
    case ACTIONS.UPDATE_CONTRACT_ALCHEMY:
      const alchemyContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Chese.abi,
        new ethers.providers.AlchemyProvider('goerli', getAlchemyKey()),
      );
      return {
        ...state,
        contract: alchemyContract,
      };
    case ACTIONS.UPDATE_MINTER_CONTRACT:
      const newMinterContract = new ethers.Contract(
        MINTER_ADDRESS,
        Minter.abi,
        action.payload.signer,
      );
      return {
        ...state,
        minterContract: newMinterContract,
      };
    case ACTIONS.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    case ACTIONS.SET_CONNECTED:
      return {
        ...state,
        connected: true,
      };
    default:
      return state;
  }
}

export const useW3Context = () => {
  return useContext(Web3Context);
};

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Web3Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
