import crypto from 'crypto'
import axios from 'axios'
import { ethers, Wallet } from 'ethers'
import { fromRpcSig } from 'ethereumjs-util'

const isDevelopment = process.env.NODE_ENV === 'development'
const Const = require('@ioc:App/Common/Const')

const BETTING_SMART_CONTRACT = process.env.BETTING_SMART_CONTRACT
const BETTING_ABI = require('../../blockchain_configs/contracts/SBirdBetting.json')

const PREDICT_WINNER_SMART_CONTRACT = process.env.PREDICT_WINNER_SMART_CONTRACT
const PREDICT_WINNER_ABI = require('../../blockchain_configs/contracts/PredictWinner.json')

const GIFT_CODE_SMART_CONTRACT = process.env.GIFT_CODE_SMART_CONTRACT
const GIFT_CODE_ABI = require('../../blockchain_configs/contracts/SBirdGiftCode.json')

const DISPERSE_SMART_CONTRACT = process.env.DISPERSE_SMART_CONTRACT
const DISPERSE_CONTRACT_ABI = require('../../blockchain_configs/contracts/Disperse.json')

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

const getGiftCodeContractInstance = async () => {
  const pool = GIFT_CODE_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(GIFT_CODE_ABI.abi, pool)
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

const getDisperseContractInstance = async () => {
  const contract = DISPERSE_SMART_CONTRACT
  if (!contract) {
    return null
  }
  const web3 = await getWeb3Provider()
  const instance = new web3.eth.Contract(DISPERSE_CONTRACT_ABI.abi, contract)
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

const getMFToken = (input: crypto.BinaryLike, algorithm = 'sha256'): string => {
  if (!input) return ''
  return crypto.createHash(algorithm).update(input).digest('hex')
}

const generateRandomCode = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 10; i++) {
    code += characters[Math.floor(Math.random() * characters.length)]
  }
  return code
}

const getLeaderboard = async (wallet_address) => {
  const currentTime = new Date()
  const token = getMFToken(
    `${currentTime.getTime()}${Const.MF_KEY.TENANT_ID}${Const.MF_KEY.SECRET_KEY}`
  )
  const res = await axios.get(
    `${Const.MF_ENDPOINT}/firebird/query/${
      Const.MF_KEY.TENANT_ID
    }/dashboard/${currentTime.getTime()}?startTime=${'2022-11-20T00:00:00.000Z'}&endTime=${'2022-12-20T00:00:00.000Z'}&event=${
      Const.MF_KEY.EVENT_NAME
    }&tenantId=${Const.MF_KEY.TENANT_ID}&sumBy=earned&limit=${5000}&offset=${0}&search=${''}` +
      (wallet_address ? `&currentUserId=${wallet_address}` : ''),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  let position = res?.data?.position || 0
  if (position === 0) {
    return 10000
  } else if (position <= 10) {
    return 3000
  } else if (position <= 20) {
    return 4000
  } else if (position <= 30) {
    return 5000
  } else if (position <= 50) {
    return 7000
  } else {
    return 10000
  }
}

const signUserBetting = async (
  address: string,
  nonce: number,
  amount: number,
  matchID: number,
  betType: string,
  betPlace: string
): Promise<{
  r: any
  s: any
  v: any
  deadline: string
}> => {
  const wallet: Wallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY || '')
  const provider = await getWeb3Provider()
  const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
  const blockTime = await provider.eth.getBlock(latestBlockNumber)
  const blockTimeStamp = Math.floor(blockTime ? blockTime.timestamp : Date.now() / 1000)
  const deadline = Math.floor(blockTimeStamp) + 60 * 15 // 15 minutes
  const types = {
    UserBetting: [
      { name: 'caller', type: 'string' },
      { name: 'matchID', type: 'uint16' },
      { name: 'betType', type: 'string' },
      { name: 'betPlace', type: 'string' },
      { name: 'amount', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  }
  let caller = address.toString().toLowerCase()
  const message = {
    caller,
    matchID,
    betType,
    betPlace,
    amount,
    nonce,
    deadline,
  }
  const domain = {
    name: 'FirebirdGame',
    version: '1',
    verifyingContract: BETTING_SMART_CONTRACT,
  }
  const sig = await wallet._signTypedData(domain, types, message)
  const response = fromRpcSig(sig)
  return {
    r: response.r,
    s: response.s,
    v: response.v,
    deadline: deadline.toString(),
  }
}

module.exports = {
  getWeb3Provider,
  getBettingContractInstance,
  getPredictWinnerContractInstance,
  getDisperseContractInstance,
  responseErrorInternal,
  responseNotFound,
  responseBadRequest,
  responseSuccess,
  getMFToken,
  generateRandomCode,
  getGiftCodeContractInstance,
  getLeaderboard,
  signUserBetting,
}
