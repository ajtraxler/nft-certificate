require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
      // gas: 60000000
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },

};
