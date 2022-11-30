const HelperUtils = require('@ioc:App/Common/HelperUtils')
import { ethers, Wallet } from 'ethers'
import { fromRpcSig } from 'ethereumjs-util'
const GIFT_CODE_SMART_CONTRACT = process.env.GIFT_CODE_SMART_CONTRACT
const Const = require('@ioc:App/Common/Const')

export default class GiftCodeService {
  public GiftCodeHistoryModel = require('@ioc:App/Models/GiftCodeHistory')
  public GiftCode = require('@ioc:App/Models/GiftCode')
  public Database = require('@ioc:Adonis/Lucid/Database')

  public async createCode(request): Promise<any> {
    const platform = request.input('platform')
    const total = request.input('total')
    const startTime = request.input('start_time')
    const expriedTime = request.input('expried_time')
    const rewards = request.input('rewards')

    if (!total) return HelperUtils.responseErrorInternal('Total code required')
    if (!expriedTime) return HelperUtils.responseErrorInternal('Expried time required')
    if (!rewards) return HelperUtils.responseErrorInternal('Code reward required')

    try {
      let data = new this.GiftCode()
      data.platform = platform
      data.total = total
      data.remaining = total
      data.start_time = startTime
      data.expried_time = expriedTime
      data.rewards = rewards
      data.create_time = Date.now() / 1000

      data.code = HelperUtils.generateRandomCode()
      await data.save()

      return HelperUtils.responseSuccess(1)
    } catch (error) {
      return HelperUtils.responseErrorInternal('create code error', error)
    }
  }

  public async getCodeAvaiable(request): Promise<any> {
    const page = request.input('page') || 1
    const limit = request.input('limit') || 10
    const platform = request.input('platform') || ''
    let filterQuery = platform === '' ? '' : `WHERE platform = '${Const.PLATFORM[platform]}'`

    try {
      let listCode = await this.Database.from('gift_codes')
        .joinRaw(filterQuery)
        .paginate(page, limit)
      return HelperUtils.responseSuccess(listCode)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async checkCodeInfo(request): Promise<any> {
    const userAddress = request.input('user_address')
    const code = request.input('code')

    try {
      let codeInfo = await this.Database.from('gift_codes').where('code', code).first()
      if (!codeInfo) {
        return HelperUtils.responseErrorInternal('Code not avaiable')
      }
      let checkUsed = await this.Database.from('gift_code_histories')
        .where('code', code)
        .where('user_address', userAddress || '')
        .first()
      let res = {
        isExpried: codeInfo?.expried_time <= Date.now() / 1000,
        remaning: codeInfo?.remaining,
        isUsed: checkUsed?.id ? true : false,
        reward: codeInfo?.rewards,
      }
      return HelperUtils.responseSuccess(res)
    } catch (error) {
      return HelperUtils.responseErrorInternal('Code not avaiable')
    }
  }

  public async getActiveCode(request): Promise<any> {
    try {
      let codeInfo = await this.Database.from('gift_codes')
        .where('start_time', '<', Date.now() / 1000)
        .where('expried_time', '>', Date.now() / 1000)
        .first()
      if (!codeInfo) {
        return HelperUtils.responseErrorInternal('No code active now')
      }
      return HelperUtils.responseSuccess(codeInfo)
    } catch (error) {
      return HelperUtils.responseErrorInternal('Code not avaiable')
    }
  }

  public async useCode(request): Promise<any> {
    try {
      const userAddress = request.input('user_address')
      const code = request.input('code')

      if (!userAddress) return HelperUtils.responseErrorInternal('Wallet address required')
      if (!code) return HelperUtils.responseErrorInternal('Code required')

      const codeAvaiable = await this.GiftCode.query()
        .where('code', code)
        .where('remaining', '>', 0)
        .where('expried_time', '>', Date.now() / 1000)
        .first()
      if (!codeAvaiable) return HelperUtils.responseErrorInternal('Code expried or limit exceeded')

      const codeHistoryByAddress = await this.GiftCodeHistoryModel.query()
        .where('user_address', userAddress)
        .andWhere('code', code)
      if (!codeHistoryByAddress) return HelperUtils.responseErrorInternal('Code used').first()
      const giftCodeContract = await HelperUtils.getGiftCodeContractInstance()
      const nonce = parseInt(await giftCodeContract.methods.TokenClaimNonces(userAddress).call())
      const signature = await this.signWithdrawToken(
        userAddress,
        nonce,
        codeAvaiable?.rewards,
        code
      )
      return HelperUtils.responseSuccess(signature)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
  private async signWithdrawToken(
    address: string,
    nonce: number,
    amount: number,
    code: string
  ): Promise<{
    r: any
    s: any
    v: any
    deadline: string
  }> {
    const wallet: Wallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY || '')
    const provider = await HelperUtils.getWeb3Provider()
    const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
    const blockTime = await provider.eth.getBlock(latestBlockNumber)
    const blockTimeStamp = Math.floor(blockTime ? blockTime.timestamp : Date.now() / 1000)
    const deadline = Math.floor(blockTimeStamp) + 60 * 15 // 15 minutes
    const types = {
      TokenClaim: [
        { name: 'caller', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'amount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    }
    let caller = address.toString().toLowerCase()
    const message = {
      caller,
      code,
      amount,
      nonce,
      deadline,
    }
    const domain = {
      name: 'FirebirdGame',
      version: '1',
      verifyingContract: GIFT_CODE_SMART_CONTRACT,
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
}
