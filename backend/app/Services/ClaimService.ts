import InvalidParamException from 'App/Exceptions/InvalidParamException'
import BaseException from 'App/Exceptions/BaseException'

import { ethers, Wallet } from 'ethers'
import { fromRpcSig } from 'ethereumjs-util'
const BETTING_SMART_CONTRACT = process.env.BETTING_SMART_CONTRACT

export default class BettingService {
  public async claimToken(request, response): Promise<any> {
    const matchID = request.input('match_id')
    const betType = request.input('bet_type')
    const amount = request.input('amount')
    const walletAddress = request.input('wallet')
    if (isNaN(amount) || parseInt(amount) <= 0)
      throw new InvalidParamException('Invalid withdraw amount')
    if (!walletAddress) throw new InvalidParamException('Wallet address required')

    const HelperUtils = require('@ioc:App/Common/HelperUtils')

    // verify withdraw to game backend
    try {
      const bettingContract = await HelperUtils.getBettingContractInstance()
      const nonce = parseInt(await bettingContract.methods.TokenClaimNonces(walletAddress).call())
      const signature = await this.signWithdrawToken(nonce, amount, matchID, betType)

      // create transaction logs to keep track withdraw process

      return { signature }
    } catch (error) {
      throw new BaseException(error.response?.data?.message || 'Can not get data')
    }
  }
  private async signWithdrawToken(
    nonce: number,
    amount: number,
    matchID: number,
    betType: string
  ): Promise<{
    r: any
    s: any
    v: any
    deadline: string
  }> {
    const wallet: Wallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY || '')
    const HelperUtils = require('@ioc:App/Common/HelperUtils')
    const provider = await HelperUtils.getWeb3Provider()
    const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
    const blockTime = await provider.eth.getBlock(latestBlockNumber)
    const blockTimeStamp = Math.floor(blockTime ? blockTime.timestamp : Date.now() / 1000)
    const deadline = Math.floor(blockTimeStamp) + 60 * 15 // 15 minutes
    const types = {
      TokenClaim: [
        { name: 'matchID', type: 'uint16' },
        { name: 'betType', type: 'string' },
        { name: 'amount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    }
    const message = {
      matchID,
      betType,
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
}
