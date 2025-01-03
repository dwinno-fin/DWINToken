require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

const { vars } = require("hardhat/config");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const OP_ETHERSCAN_API_KEY = vars.get("OP_ETHERSCAN_API_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    opt_sepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
      ignition: {
        gasPrice: 50_000_000_000n,
        gas: 2_000_000n
      },
    },
  },
  etherscan: {
    apiKey: {
      optimisticEthereum: OP_ETHERSCAN_API_KEY,
      'optimism': 'abc',
      'opt_sepolia': OP_ETHERSCAN_API_KEY,
    },
    customChains: [
      // {
      //   network: 'optimism',
      //   chainId: 10,
      //   urls: {
      //     apiURL: 'https://optimism.blockscout.com/api',
      //     browserURL: 'https://optimism.blockscout.com/',
      //   },
      // },
      {
        network: "opt_sepolia",
        chainId: 11155420, // Sepolia-Optimism chain ID
        urls: {
          apiURL: "https://api-sepolia-optimism.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};
