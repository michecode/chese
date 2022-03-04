# Chese

Chese is a NFT marketplace hosted on the Rinkeby testnet. One can mint nfts onto ipfs and a helper contract called "CheseNFTs". As of March 3rd you can only list, sell, and unlist. Also you cannot approve through the website so basically you can't list other NFT collections unless you approve directly with the contract.

To run this repo you'll need 2 files that are not uploaded to github.

.env.development (used by Gatsby during `gatsby develop`)

```
GATSBY_ALCHEMY_KEY=<your alchemy api key>
GATSBY_RINKEBY_ALCAPI=<your alchemy api url>
GATSBY_PINATA_KEY=<pinata key>
GATSBY_PINATA_SECRET=<pinata secret>
GATSBY_INFURA_ID=<infura id>
GATSBY_INFURA_SECRET=<infura secret>
```

if you plan on serving a gatsby build you'll need to copy paste into a file named `.env.production`
