const HelperUtils = require('@ioc:App/Common/HelperUtils')

import { ethers, Wallet } from 'ethers'
import { fromRpcSig } from 'ethereumjs-util'
const BETTING_SMART_CONTRACT = process.env.BETTING_SMART_CONTRACT

export default class BettingService {
  public BettingModel = require('@ioc:App/Models/Betting')
  public async claimToken(request): Promise<any> {
    const matchID = request.input('match_id')
    const betType = request.input('bet_type')
    const walletAddress = request.input('wallet')
    const amount = request.input('amount')

    if (!walletAddress) return HelperUtils.responseErrorInternal('Wallet address required')

    // verify withdraw to game backend
    try {
      const betInfo = await this.BettingModel.query()
        .where('match_id', matchID)
        .andWhere('user_address', walletAddress)
        .andWhere('bet_type', betType)
        .first()
      if (
        amount.toLocaleString('fullwide', { useGrouping: false }) ===
        betInfo.total_claim.toLocaleString('fullwide', { useGrouping: false })
      ) {
        const bettingContract = await HelperUtils.getBettingContractInstance()
        const nonce = parseInt(await bettingContract.methods.TokenClaimNonces(walletAddress).call())
        const signature = await this.signWithdrawToken(
          walletAddress,
          nonce,
          amount,
          matchID,
          betType
        )
        return HelperUtils.responseSuccess(signature)
      } else {
        return HelperUtils.responseErrorInternal('Bet is not calculate or amount not avaiable')
      }
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
  private async signWithdrawToken(
    address: string,
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
    const provider = await HelperUtils.getWeb3Provider()
    const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
    const blockTime = await provider.eth.getBlock(latestBlockNumber)
    const blockTimeStamp = Math.floor(blockTime ? blockTime.timestamp : Date.now() / 1000)
    const deadline = Math.floor(blockTimeStamp) + 60 * 15 // 15 minutes
    const types = {
      TokenClaim: [
        { name: 'caller', type: 'string' },
        { name: 'matchID', type: 'uint16' },
        { name: 'betType', type: 'string' },
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
