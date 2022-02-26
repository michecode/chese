import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageProps } from 'gatsby';
import { useW3Context } from '../../components/Web3Provider';
import Layout from '../../components/Layout';
// import Listing from '../../components/Listing';
import Gradient from '../../images/iridescent-gradient.png';
import { ethers } from 'ethers';

const Index: React.FC<PageProps> = (props: PageProps) => {
  const W3C = useW3Context();
  // const [balance, setBalance] = useState('');
  // const [totalMinted, setTotalMinted] = useState(0);

  // useEffect(() => {
  //   getCount();
  // }, []);

  // const getCount = async () => {
  //   if (W3C.contract) {
  //     console.log(W3C.contract);
  //     const count = await W3C.contract.count();
  //     console.log('or am i OwO');
  //     setTotalMinted(parseInt(count));
  //   }
  // };

  // const getBalance = async () => {
  //   const [account] = await (window as any).ethereum.request({
  //     method: 'eth_requestAccounts',
  //   });
  //   // const providers = new ethers.providers.Web3Provider(
  //   //   (window as any).ethereum,
  //   // );
  //   if (W3C.provider) {
  //     const balance = await W3C.provider.getBalance(account);
  //     console.log(W3C);
  //     setBalance(ethers.utils.formatEther(balance));
  //   }
  // };

  return (
    <Layout path={props.path}>
      {/* <h1>Your Balance: {balance}</h1> */}
      {/* <button onClick={() => getBalance()}>Show My Balance</button> */}
      <button onClick={() => console.log(W3C)}>Log W3C</button>
    </Layout>
  );
};

// const Listing: React.FC<ListingProps> = ({ tokenId, getCount }) => {
//   const W3C = useW3Context;
//   // const contentId = 'QmZf83wVQVxpXWNKftm9Uf7eeugANzxQabgoc7FUz3iveq';
//   // const metadataURI = `${contentId}/${tokenId}.json`;
//   // const imageURI = `${contentId}/${tokenId}.png`;
//   // const [isMinted, setIsMinted] = useState(false);
//   // useEffect(() => {
//   //   getMintedStatus();
//   // }, [isMinted]);

//   // const getMintedStatus = async () => {
//   //   // check undefined
//   //   if (W3C.contract) {
//   //     const result = await W3C.contract.isContentOwned(metadataURI);
//   //     console.log(result);
//   //     setIsMinted(result);
//   //   }
//   // };

//   // const mintToken = async () => {
//   //   if (W3C.contract && W3C.signer) {
//   //     const connection = W3C.contract.connect(W3C.signer);
//   //     const addr = connection.address;
//   //     const result = await W3C.contract.payToMint(addr, metadataURI, {
//   //       value: ethers.utils.parseEther('0.05'),
//   //     });

//   //     await result.wait();
//   //     getMintedStatus();
//   //     getCount();
//   //   }
//   // };

//   // async function getURI() {
//   //   if (W3C.contract) {
//   //     const uri = await W3C.contract.tokenURI(tokenId);
//   //     alert(uri);
//   //   }
//   // }
//   return (

//   );
// };

export default Index;
