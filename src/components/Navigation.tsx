import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useW3Context } from './Web3Provider';
import { Link } from 'gatsby';
import { ethers } from 'ethers';
import Ethers from '@typechain/ethers-v5';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface NavigationProps {
  path: string;
}

const Navigation: React.FC<NavigationProps> = ({ path }) => {
  const W3C = useW3Context();

  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const getAccount = async () => {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return account;
  };

  // too funky for right now

  // useEffect(() => {
  //   const connectWalletOnPageLoad = async () => {
  //     if (localStorage?.getItem('isWalletConnected') === 'true') {
  //       try {
  //         await connectWallet();
  //       } catch (er) {
  //         console.log(er);
  //       }
  //     }
  //   };
  //   connectWalletOnPageLoad();
  // }, []);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    // check if undefined
    if (W3C.provider) {
      const balance = await W3C.provider.getBalance(account);
    }
    setBalance(ethers.utils.formatEther(balance));
  };

  const connectWallet = () => {
    console.log('running connect wallet()');
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: any) => {
          console.log(result);
          accountChangedHandler(result[0]);
          // localStorage.setItem('isWalletConnected', 'true');
        })
        .catch((error: any) => {
          setError(error.message);
        });
    } else {
      console.assert('Need to install MetaMask');
      setError('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount: string) => {
    console.log('updating account');
    W3C.updateAccount(newAccount);
    updateEthers(newAccount);
    console.log(W3C);
  };

  const updateEthers = (account: string) => {
    // console.log('attempting to update account state to: ' + account);
    // W3C.updateAccount(account);
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    W3C.setProvider(tempProvider);
    const tempSigner = tempProvider.getSigner(account);
    W3C.setSigner(tempSigner);
    W3C.updateContract(tempSigner);
    W3C.setConnected(true);
  };

  console.log(path);
  if (path != '/' && path != '/404') {
    return (
      <header>
        <div className="flex justify-end text-black mx-12 mt-12">
          <Link
            to="/"
            className="text-6xl bg-gradient bg-clip-text bg-fill text-transparent hover:text-black"
          >
            chese
          </Link>
          <span className="flex items-center text-2xl ml-auto">
            <Link to="/marketplace" className="mx-4 text-black hover:underline">
              Marketplace
            </Link>
            <Link to="/artists" className="mx-8 text-black hover:underline">
              Artists
            </Link>
            {W3C.connected ? (
              <Link
                to="/account"
                className="text-white bg-gradient bg-fill hover:text-white hover:bg-black hover:bg-none rounded-2xl px-4 py-3 my-0"
              >
                My Account
              </Link>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="text-white bg-gradient bg-fill hover:text-white hover:bg-black hover:bg-none rounded-2xl px-4 py-3 my-0"
              >
                Connect Wallet
              </button>
            )}
          </span>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="flex justify-end text-white mx-12 mt-12">
        <Link to="/" className="text-6xl hover:text-black">
          chese
        </Link>
        <span className="flex items-center text-2xl ml-auto">
          <Link to="/marketplace" className="mx-4 hover:text-black">
            Marketplace
          </Link>
          <Link to="/artists" className="mx-8 hover:text-black">
            Artists
          </Link>
          <Link
            className="text-black hover:text-white bg-white hover:bg-black rounded-2xl px-4 py-3 my-0"
            to="/marketplace"
          >
            Launch App
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Navigation;
