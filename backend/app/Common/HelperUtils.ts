const isDevelopment = process.env.NODE_ENV === 'development'
const Const = require('@ioc:App/Common/Const')

const BETTING_SMART_CONTRACT = process.env.BETTING_SMART_CONTRACT
const BETTING_ABI = require('../../blockchain_configs/contracts/SBirdBetting.json')

const PREDICT_WINNER_SMART_CONTRACT = process.env.PREDICT_WINNER_SMART_CONTRACT
const PREDICT_WINNER_ABI = require('../../blockchain_configs/contracts/PredictWinner.json')

const getWeb3ProviderLink = () => {
  if (isDevelopment) {
    const WEB3_API_URLS = ['https://rpc.testnet-firebird.polkafoundry.com/']
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

const getBettingContractInstance = async () => {
  const pool = BETTING_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(BETTING_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getPredictWinnerContractInstance = async () => {
  const pool = PREDICT_WINNER_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(PREDICT_WINNER_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const responseErrorInternal = (message) => {
  return {
    status: 500,
    message: message || 'Sorry there seems to be a server error!',
    data: null,
  }
}

const responseNotFound = (message) => {
  return {
    status: 404,
    message: message || 'Not Found !',
    data: null,
  }
}

const responseBadRequest = (message) => {
  return {
    status: 400,
    message: message || 'Looks like this is unkown request, please try again or contact us.',
    data: null,
  }
}

const responseSuccess = (data = null, message) => {
  return {
    status: 200,
    message: message || 'Success !',
    data,
  }
}

module.exports = {
  getWeb3Provider,
  getBettingContractInstance,
  getPredictWinnerContractInstance,
  responseErrorInternal,
  responseNotFound,
  responseBadRequest,
  responseSuccess,
}
