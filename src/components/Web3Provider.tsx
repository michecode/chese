import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
// import Plants from '../artifacts/contracts/Plants.sol/Plants.json';
import Chese from '../artifacts/contracts/Chese.sol/Chese.json';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Checking window for undefined for build time
// Is ok to run further with undefined.
if (typeof window !== 'undefined') {
  const providerTemp = new ethers.providers.Web3Provider(window.ethereum);
}

// Plants test contract
const CONTRACT_ADDRESS_OLD = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
// Chese V0.1 Goerli Address
const CONTRACT_ADDRESS_OLD_2 = '0x958C8511E7D21aFE59A4FcAe0aC93bBe615Af583';
// Chese V0.1 Rinkeby Address
const CONTRACT_ADDRESS = '0x85810707E13EF8aD77E4666E59246CE652696e1D';

interface IWeb3Context {
  contractAddress: string;
  provider: ethers.providers.Web3Provider | undefined;
  setProvider: Function;
  signer: ethers.providers.JsonRpcSigner | undefined;
  setSigner: Function;
  contract: ethers.Contract | undefined;
  updateContract: Function;
  account: string;
  updateAccount: Function;
  connected: boolean;
  setConnected: Function;
}

export const Web3Context = React.createContext<IWeb3Context>({
  contractAddress: CONTRACT_ADDRESS,
  provider: providerTemp,
  setProvider: () => {},
  signer: undefined,
  setSigner: () => {},
  contract: undefined,
  updateContract: () => {},
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
    new ethers.Contract(CONTRACT_ADDRESS, Chese.abi, providerTemp),
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
  const value = {
    contractAddress: CONTRACT_ADDRESS,
    provider,
    setProvider,
    signer,
    setSigner,
    contract,
    updateContract,
    account,
    updateAccount,
    connected,
    setConnected,
  };

  // console.log(value);
  // useEffect(() => {});

  // console.log(value);
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Provider;
