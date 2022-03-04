import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
// import Plants from '../artifacts/contracts/Plants.sol/Plants.json';
import Chese from '../artifacts/contracts/Chese.sol/Chese.json';
import Minter from '../artifacts/contracts/CheseNFTs.sol/CheseNFTs.json';
import { ethers } from 'ethers';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';

declare global {
  interface Window {
    ethereum: any;
  }
}

let ipfs: IPFSHTTPClient | undefined;
const infuraId = process.env.GATSBY_INFURA_ID;
const infuraSecret = process.env.GATSBY_INFURA_SECRET;
const authorization = 'Basic ' + btoa(infuraId + ':' + infuraSecret);
try {
  ipfs = create({
    url: 'https://ipfs.infura.io:5001',
    headers: {
      authorization,
    },
  });
} catch (error) {
  console.error('IPFS error ', error);
  ipfs = undefined;
}

const getAlchemyKey = () => {
  const yeah = process.env.GATSBY_ALCHEMY_KEY;
  if (yeah) {
    return yeah;
  } else {
    return '';
  }
};

let providerTemp:
  | ethers.providers.Web3Provider
  | ethers.providers.AlchemyProvider
  | undefined;
// Checking window for undefined for build time
// Is ok to run further with undefined.
if (typeof window !== 'undefined') {
  if (window.ethereum) {
    providerTemp = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    providerTemp = new ethers.providers.AlchemyProvider(
      'rinkeby',
      getAlchemyKey(),
    );
  }
}

// Chese V0.2.1
const CONTRACT_ADDRESS = '0xA2C80855Cf67268E8415ba9311095A79886ddAA8';

const MINTER_ADDRESS = '0x2f4EC6452B30a1a67dDe768e1Aa52c4d99093f0E';

interface IWeb3Context {
  ipfs: IPFSHTTPClient | undefined;
  contractAddress: string;
  minterAddress: string;
  provider:
    | ethers.providers.Web3Provider
    | ethers.providers.AlchemyProvider
    | undefined;
  setProvider: Function;
  signer: ethers.providers.JsonRpcSigner | undefined;
  setSigner: Function;
  contract: ethers.Contract | undefined;
  updateContract: Function;
  updateContractWithApiProvider: Function;
  minterContract: ethers.Contract | undefined;
  updateMinterContract: Function;
  account: string;
  updateAccount: Function;
  connected: boolean;
  setConnected: Function;
}

export const Web3Context = React.createContext<IWeb3Context>({
  ipfs: ipfs,
  contractAddress: CONTRACT_ADDRESS,
  minterAddress: MINTER_ADDRESS,
  provider: providerTemp,
  setProvider: () => {},
  signer: undefined,
  setSigner: () => {},
  contract: undefined,
  updateContract: () => {},
  updateContractWithApiProvider: () => {},
  minterContract: undefined,
  updateMinterContract: () => {},
  account: 'Not Connected',
  updateAccount: () => {},
  connected: false,
  setConnected: () => {},
});

export const useW3Context = () => {
  return useContext(Web3Context);
};

interface Web3ProviderProps {
  children?: JSX.Element | JSX.Element[];
}

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState(providerTemp);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(
    // if(typeof providerTemp == ethers.providers.Web3Provider)
    new ethers.Contract(
      CONTRACT_ADDRESS,
      Chese.abi,
      new ethers.providers.AlchemyProvider('rinkeby', getAlchemyKey()),
    ),
  );
  const [minterContract, setMinterContract] = useState(
    new ethers.Contract(MINTER_ADDRESS, Minter.abi),
  );
  const [account, setAccount] = useState('Not Connected');
  const updateAccount = (accountTemp: string) => {
    setAccount(accountTemp);
  };
  const [connected, setConnected] = useState(false);
  const updateContract = (signer: ethers.providers.JsonRpcSigner) => {
    const yeah = new ethers.Contract(CONTRACT_ADDRESS, Chese.abi, signer);
    setContract(yeah);
  };
  const updateContractWithApiProvider = () => {
    const yeah = new ethers.Contract(
      CONTRACT_ADDRESS,
      Chese.abi,
      new ethers.providers.AlchemyProvider('rinkeby', getAlchemyKey()),
    );
    setContract(yeah);
    console.log(yeah);
  };

  const updateMinterContract = (signer: ethers.providers.JsonRpcSigner) => {
    const booyeah = new ethers.Contract(MINTER_ADDRESS, Minter.abi, signer);
    setMinterContract(booyeah);
  };

  const value = {
    ipfs: ipfs,
    contractAddress: CONTRACT_ADDRESS,
    minterAddress: MINTER_ADDRESS,
    provider,
    setProvider,
    signer,
    setSigner,
    contract,
    updateContract,
    updateContractWithApiProvider,
    minterContract,
    updateMinterContract,
    account,
    updateAccount,
    connected,
    setConnected,
  };

  console.log(value);
  // useEffect(() => {});

  // console.log(value);
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Provider;
