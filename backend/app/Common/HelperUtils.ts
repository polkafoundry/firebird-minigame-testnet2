const isDevelopment = process.env.NODE_ENV === 'development'
const Const = require('@ioc:App/Common/Const')
const MARKETPLACE_SMART_CONTRACT = process.env.MARKETPLACE_SMART_CONTRACT
const MARKETPLACE_ABI = require('../../blockchain_configs/contracts/Marketplace.json')
const NFT_SMART_CONTRACT = process.env.NFT_SMART_CONTRACT
const NFT_ABI = require('../../blockchain_configs/contracts/EpicWarNFT.json')
const BOX_SMART_CONTRACT = process.env.BOX_SMART_CONTRACT
const BOX_ABI = require('../../blockchain_configs/contracts/EpicWarBox.json')
const GAME_SMART_CONTRACT = process.env.GAME_SMART_CONTRACT
const GAME_ABI = require('../../blockchain_configs/contracts/NFTWEscrow.json')

const getWeb3ProviderLink = () => {
  if (isDevelopment) {
    const WEB3_API_URLS = [
      'https://eth-ropsten.alchemyapi.io/v2/clWfEqNDy9m2iBROe_HWlXeiDSYpW_vX',
      'https://eth-ropsten.alchemyapi.io/v2/clWfEqNDy9m2iBROe_HWlXeiDSYpW_vX',
    ]
    const randomElement = WEB3_API_URLS[Math.floor(Math.random() * WEB3_API_URLS.length)]
    return randomElement
  } else {
    return Const.WEB3_API_URL
  }
}
const getWeb3BscProviderLink = () => {
  if (isDevelopment) {
    const WEB3_API_URLS = ['https://data-seed-prebsc-1-s1.binance.org:8545']
    const randomElement = WEB3_API_URLS[Math.floor(Math.random() * WEB3_API_URLS.length)]
    return randomElement
  } else {
    return Const.WEB3_BSC_API_URL
  }
}
const getWeb3PolygonProviderLink = () => {
  return Const.WEB3_POLYGON_API_URL
}

const Web3 = require('web3')
const web3 = new Web3(getWeb3ProviderLink())
const web3Bsc = new Web3(getWeb3BscProviderLink())
const web3Polygon = new Web3(getWeb3PolygonProviderLink())

const networkToWeb3 = {
  [Const.NETWORK_AVAILABLE.ETH]: web3,
  [Const.NETWORK_AVAILABLE.BSC]: web3Bsc,
  [Const.NETWORK_AVAILABLE.POLYGON]: web3Polygon,
}

const getWeb3Provider = async () => {
  return networkToWeb3[Const.NETWORK_AVAILABLE.POLYGON]
}

const getMarketplaceInstance = async () => {
  const pool = MARKETPLACE_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(MARKETPLACE_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getNFTInstance = async () => {
  const pool = NFT_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(NFT_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getBoxInstance = async () => {
  const pool = BOX_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(BOX_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getGameSwapInstance = async () => {
  const pool = GAME_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(GAME_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

module.exports = {
  getMarketplaceInstance,
  getWeb3Provider,
  getNFTInstance,
  getBoxInstance,
  getGameSwapInstance,
}
