require('dotenv').config();

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// const config: HardhatUserConfig = {
//   solidity: '0.8.4',
//   networks: {
//     goerli: {
//       url: process.env.ALCHEMY_RPC || '',
//       accounts:
//         process.env.PRIVATE_KEY_REAL !== undefined
//           ? [process.env.PRIVATE_KEY_REAL]
//           : [],
//     },
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: 'USD',
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
// };

const privKey = process.env.PRIVATE_KEY_REAL;
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: [`${process.env.PRIVATE_KEY_REAL}`],
    },
  },
};

// export default config;
