import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ACTIONS, useW3Context } from './Web3Provider';
import { Link } from 'gatsby';
import { ethers } from 'ethers';
import Ethers from '@typechain/ethers-v5';
import Modal from '../components/Modal';

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

  const [showModal, setShowModal] = useState(false);

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

  const connectWallet = () => {
    console.log('connecting ethereum wallet');
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log(window.ethereum);
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: any) => {
          console.log(result);
          accountChangedHandler(result[0]);
          // localStorage.setItem('isWalletConnected', 'true');
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      alert('Need to install MetaMask');
    }
    console.log('e');
  };

  const accountChangedHandler = (newAccount: string) => {
    console.log('updating account');
    W3C.dispatch({
      type: ACTIONS.SET_ACCOUNT,
      payload: { account: newAccount },
    });
    updateEthers(newAccount);
    console.log(W3C);
  };

  const updateEthers = (account: string) => {
    // console.log('attempting to update account state to: ' + account);
    // W3C.updateAccount(account);
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    W3C.dispatch({
      type: ACTIONS.SET_PROVIDER,
      payload: { provider: tempProvider },
    });
    const tempSigner = tempProvider.getSigner(account);
    W3C.dispatch({ type: ACTIONS.SET_SIGNER, payload: { signer: tempSigner } });
    W3C.dispatch({
      type: ACTIONS.UPDATE_CONTRACT_SIGNER,
      payload: { signer: tempSigner },
    });
    W3C.dispatch({
      type: ACTIONS.UPDATE_MINTER_CONTRACT,
      payload: { signer: tempSigner },
    });
    W3C.dispatch({ type: ACTIONS.SET_CONNECTED });
  };

  console.log(path);

  if (path == '/' || path == '/404' || path == undefined) {
    console.log('Returning Home/404 Nav. My path is ' + path);
    return (
      <header>
        <div className="flex justify-end text-white mx-12 mt-12">
          <Link to="/" className="text-6xl hover:text-black">
            chese
          </Link>
          <span className="flex items-center text-2xl ml-auto">
            <Link to="/marketplace" className="mx-4 hover:underline">
              Marketplace
            </Link>
            <Link to="/artists" className="mx-8 hover:underline">
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
  }

  console.log('Returning Alt Nav. My path is ' + path);
  return (
    <header>
      <div className="flex justify-end text-black mx-12 mt-12 relative">
        <Link
          to="/"
          className="text-6xl bg-gradient bg-clip-text bg-cover text-transparent hover:text-black"
        >
          chese
        </Link>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="flex">
            <div className="flex flex-col m-8 w-3/5">
              <h1 className="text-3xl mt-2">
                Details & Limitations of Chese V0.2.1
              </h1>

              <p>
                Hi. This is Chese. Pronounced "Cheese" or maybe "Chess". A NFT
                marketplace live on the Goerli testnet. Currently, the contract
                has the ability to list, unlist, and sell ERC-721 tokens. You
                can also mint your own NFTs (ERC721 only). This website includes
                minting functionality, hosted using IPFS!
              </p>
              <h1 className="text-xl mt-2">Planned Features:</h1>
              <li>ERC-1155 Support.</li>
              <li>NFT Slices. Requires ERC-1155 support.</li>
              <li>
                Listing arbitrary NFT contracts. (Figure out how to call their
                setApprovalForAll with ethers..?)
              </li>
              <li>
                NFT Collection per account. Need to learn contract factory.
              </li>
              <li>
                Create some sort of feedback after minting/listing. Currently
                everything is in console logs and actual users will not know
                what's going on.
              </li>
              <li>
                Convert to Next.js so I can utilise server side rendering.
                Cannot afford servers right now lol.
              </li>
              <li>
                Searching... I think I'm going to use elasticsearch in addition
                to building a backend database that can hold nft data instead of
                spamming Alchemy with API requests.
              </li>
              <li>Port to zkSync's 2.0 testnet.</li>
              <h1 className="text-xl mt-2">Known Limits:</h1>
              <li>
                I made it so the website will just turn off if your screen isn't
                wide enough. I do not want to make it responsive because...!!
                Not going to test on other screen sizes until I rewrite the code
                base so prob like soon.
              </li>
              <li>
                Metamask is the only wallet tested. Maybe works with other
                injector wallets but idc
              </li>
              <li>Does not listen for chain changes or user disconnects.</li>
              <li className="">
                You are only able to list NFTs minted by the helper contract on
                this website. It's possible to list others technically but not
                through the WebUI, this is a problem with calling
                setApprovalForAll() on the NFT's contract.
              </li>
              <li className="line-through">
                Listing prices can only use integers.
              </li>
              <li>ERC-1155 tokens are completely(?) unsupported.</li>
              <li>I have a memory leak somewhere??</li>
              <div className="flex">
                <p className="text-7xl ">
                  Have Fun. Please don't break anything
                </p>
                <p className="text-8xl rotate-90 relative -top-64 -right-48">
                  :)
                </p>
              </div>
            </div>
          </div>
        </Modal>
        <div
          className="flex ml-40 rounded-xl hover:shadow-2xl"
          onClick={() => setShowModal(!showModal)}
        >
          <p className="my-auto mx-3">V0.2.1 Details & Limitations</p>
        </div>
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
              className="text-white bg-gradient bg-cover hover:text-white hover:bg-black hover:bg-none rounded-2xl px-4 py-3 my-0"
            >
              My Account
            </Link>
          ) : (
            <button
              onClick={() => connectWallet()}
              className="text-white bg-gradient bg-cover hover:text-white hover:bg-black hover:bg-none rounded-2xl px-4 py-3 my-0"
            >
              Connect Wallet
            </button>
          )}
        </span>
      </div>
    </header>
  );
};

export default Navigation;
