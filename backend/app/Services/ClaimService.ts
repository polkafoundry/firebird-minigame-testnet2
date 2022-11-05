import InvalidParamException from 'App/Exceptions/InvalidParamException'
import BusinessException from 'App/Exceptions/BusinessException'

import { ethers, Wallet } from 'ethers'
import { fromRpcSig } from 'ethereumjs-util'
const BETTING_SMART_CONTRACT = process.env.BETTING_SMART_CONTRACT

export default class BettingService {
  public async claimToken(request): Promise<any> {
    const matchID = request.input('match_id')
    const betType = request.input('bet_type')
    const walletAddress = request.input('wallet')
    const amount = request.input('amount')

    if (!walletAddress) throw new InvalidParamException('Wallet address required')

    const HelperUtils = require('@ioc:App/Common/HelperUtils')

    // verify withdraw to game backend
    try {
      const BettingModel = require('@ioc:App/Models/Betting')
      const betInfo = await BettingModel.query()
        .where('match_id', matchID)
        .andWhere('user_address', walletAddress)
        .andWhere('bet_type', betType)
        .first()
      let am = Number(betInfo.result_num)
      console.log(am)
      // return { betInfo }

      if (
        amount.toLocaleString('fullwide', { useGrouping: false }) ===
        betInfo.result_num.toLocaleString('fullwide', { useGrouping: false })
      ) {
        const bettingContract = await HelperUtils.getBettingContractInstance()
        const nonce = parseInt(await bettingContract.methods.TokenClaimNonces(walletAddress).call())
        const signature = await this.signWithdrawToken(nonce, amount, matchID, betType)

        return { signature }
      } else {
        return new BusinessException('Bet is not calculate or amount not avaiable')
      }
    } catch (error) {
      throw new BusinessException(error)
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
